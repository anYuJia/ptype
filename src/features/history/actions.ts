'use server';

import { prisma } from '@/lib/prisma';
import { getUserId } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export interface TypingResultData {
    id: string;
    wpm: number;
    accuracy: number;
    mode: string;
    subMode: string | null;
    difficulty: string;
    duration: number;
    createdAt: Date;
}

export interface HistoryStats {
    totalTests: number;
    avgWpm: number;
    bestWpm: number;
    totalTime: string;
    totalSeconds: number;
}

export async function getHistory(): Promise<{ success: boolean; data?: TypingResultData[]; error?: string }> {
    try {
        const userId = await getUserId();
        if (!userId) {
            return { success: false, error: 'Unauthorized' };
        }

        const history = await prisma.typingResult.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 20,
        });

        return { success: true, data: history };
    } catch (error) {
        console.error('Failed to fetch history:', error);
        return { success: false, error: 'Failed to fetch history' };
    }
}

export async function getHistoryStats(): Promise<{ success: boolean; data?: HistoryStats; error?: string }> {
    try {
        const userId = await getUserId();
        if (!userId) {
            return { success: false, error: 'Unauthorized' };
        }

        const aggregations = await prisma.typingResult.aggregate({
            where: { userId },
            _avg: { wpm: true },
            _max: { wpm: true },
            _sum: { duration: true },
            _count: { id: true },
        });

        const totalSeconds = aggregations._sum.duration || 0;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        let totalTime = '';
        if (hours > 0) {
            totalTime = `${hours}h ${minutes}m`;
        } else {
            totalTime = `${minutes}m`;
        }

        const stats: HistoryStats = {
            totalTests: aggregations._count.id,
            avgWpm: Math.round(aggregations._avg.wpm || 0),
            bestWpm: aggregations._max.wpm || 0,
            totalTime,
            totalSeconds,
        };

        return { success: true, data: stats };
    } catch (error) {
        console.error('Failed to fetch stats:', error);
        return { success: false, error: 'Failed to fetch stats' };
    }
}

export interface SaveResultInput {
    wpm: number;
    accuracy: number;
    mode: string;
    subMode: string | null;
    difficulty: string;
    duration: number;
}

export async function saveTypingResult(input: SaveResultInput): Promise<{ success: boolean; data?: TypingResultData; error?: string }> {
    try {
        const userId = await getUserId();
        if (!userId) {
            return { success: false, error: 'Unauthorized' };
        }

        const result = await prisma.typingResult.create({
            data: {
                userId,
                ...input
            },
        });

        revalidatePath('/history');
        revalidatePath('/profile');

        return { success: true, data: result };
    } catch (error) {
        console.error('Error saving result:', error);
        return { success: false, error: 'Failed to save result' };
    }
}
