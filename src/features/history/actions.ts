'use server';

import { prisma } from '@/lib/prisma';
import { getUserId } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { verifyAdvancedSignature, type AdvancedSignaturePayload } from '@/lib/security/verifier';

export interface TypingResultData {
    id: string;
    wpm: number; // Derived/Legacy
    cpm: number; // Source of truth
    accuracy: number;
    mode: string;
    subMode: string | null;
    difficulty: string;
    duration: number;
    createdAt: Date;
}

export interface HistoryStats {
    totalTests: number;
    avgCpm: number;
    bestCpm: number;
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

        // Map database result to TypingResultData
        const historyWithDerivedMetrics = history.map(item => ({
            id: item.id,
            cpm: item.cpm,
            wpm: Math.round(item.cpm / 5), // Derive WPM
            accuracy: item.accuracy,
            mode: item.mode,
            subMode: item.subMode,
            difficulty: item.difficulty,
            duration: item.duration,
            createdAt: item.createdAt
        }));

        return { success: true, data: historyWithDerivedMetrics };
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
            _avg: { cpm: true },
            _max: { cpm: true },
            _sum: { duration: true },
            _count: { id: true },
        });

        const totalSeconds = aggregations._sum?.duration || 0;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        let totalTime = '';
        if (hours > 0) {
            totalTime = `${hours}h ${minutes}m`;
        } else {
            totalTime = `${minutes}m`;
        }

        const stats: HistoryStats = {
            totalTests: aggregations._count?.id ?? 0,
            avgCpm: Math.round(aggregations._avg?.cpm || 0),
            bestCpm: aggregations._max?.cpm || 0,
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
    cpm: number; // Primary metric
    accuracy: number;
    mode: string;
    subMode: string | null;
    difficulty: string;
    duration: number;
}

/**
 * 保存打字结果
 * @param input 打字结果数据
 * @param signature 可选的请求签名（用于防止自动化攻击）
 */
export async function saveTypingResult(
    input: SaveResultInput,
    signature?: AdvancedSignaturePayload
): Promise<{ success: boolean; data?: TypingResultData; error?: string }> {
    try {
        // 强制签名验证
        const REQUIRE_SIGNATURE = true;

        if (REQUIRE_SIGNATURE || signature) {
            const verification = await verifyAdvancedSignature(signature || null, input);
            if (!verification.valid) {
                console.warn('Invalid signature attempt:', verification.error);
                // 如果强制要求签名，返回错误；否则只记录警告
                if (REQUIRE_SIGNATURE) {
                    return { success: false, error: 'Invalid request signature' };
                }
            }
        }

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

        const resultWithDerivedMetrics: TypingResultData = {
            id: result.id,
            cpm: result.cpm,
            wpm: Math.round(result.cpm / 5),
            accuracy: result.accuracy,
            mode: result.mode,
            subMode: result.subMode,
            difficulty: result.difficulty,
            duration: result.duration,
            createdAt: result.createdAt
        };

        revalidatePath('/history');
        revalidatePath('/profile');

        return { success: true, data: resultWithDerivedMetrics };
    } catch (error) {
        console.error('Error saving result:', error);
        return { success: false, error: 'Failed to save result' };
    }
}
