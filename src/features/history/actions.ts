'use server';

import { prisma } from '@/lib/prisma';
import { getUserId } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { verifyAdvancedSignature, type AdvancedSignaturePayload } from '@/lib/security/verifier';

export interface TypingResultData {
    id: string;
    wpm: number;
    cpm: number; // Added unified CPM field
    accuracy: number;
    mode: string;
    subMode: string | null;
    difficulty: string;
    duration: number;
    createdAt: Date;
}

export interface HistoryStats {
    totalTests: number;
    avgWpm: number; // This remains "avg score" (mixed units) or we unify it? Let's leave stats for now or just user history list.
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

        // Since we are now storing CPM for all modes (including English),
        // we map the stored 'wpm' value directly to 'cpm'.
        // Note: Historical English data stored as WPM will appear as low CPM values.
        const historyWithCpm = history.map(item => ({
            ...item,
            cpm: item.wpm
        }));

        return { success: true, data: historyWithCpm };
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

        const resultWithCpm: TypingResultData = {
            ...result,
            cpm: result.wpm
        };

        revalidatePath('/history');
        revalidatePath('/profile');

        return { success: true, data: resultWithCpm };
    } catch (error) {
        console.error('Error saving result:', error);
        return { success: false, error: 'Failed to save result' };
    }
}
