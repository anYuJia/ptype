'use server';

import { prisma } from '@/lib/prisma';
import { getUserId } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { verifyAdvancedSignature, type AdvancedSignaturePayload } from '@/lib/security/verifier';

export interface ProfileStats {
    joinDate: string;
    totalTests: number;
    avgCpm: number;
    bestCpm: number;
    timeSpent: string;
}

export interface ActivityData {
    date: string;
    count: number;
}

export interface ProfileData {
    user: {
        id: string;
        username: string;
        email: string;
        createdAt: Date;
    };
    stats: ProfileStats;
    activityHistory: ActivityData[];
}

function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
}

export async function getProfile(): Promise<{ success: boolean; data?: ProfileData; error?: string }> {
    try {
        const userId = await getUserId();
        if (!userId) {
            return { success: false, error: 'Unauthorized' };
        }

        const user = await prisma.user.findFirst({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
            },
        });

        if (!user) {
            return { success: false, error: 'User not found' };
        }

        // Aggregate stats
        const aggregations = await prisma.typingResult.aggregate({
            where: { userId },
            _avg: { cpm: true },
            _max: { cpm: true },
            _sum: { duration: true },
            _count: { id: true },
        });

        // Get activity history (last 365 days)
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        const recentResults = await prisma.typingResult.findMany({
            where: {
                userId,
                createdAt: { gte: oneYearAgo }
            },
            select: { createdAt: true }
        });

        const activityMap = new Map<string, number>();
        recentResults.forEach(r => {
            const date = r.createdAt.toISOString().split('T')[0];
            activityMap.set(date, (activityMap.get(date) || 0) + 1);
        });

        const activityHistory: ActivityData[] = Array.from(activityMap.entries()).map(([date, count]) => ({
            date,
            count
        }));

        const stats: ProfileStats = {
            joinDate: user.createdAt.toISOString().split('T')[0],
            totalTests: aggregations._count?.id ?? 0,
            avgCpm: Math.round(aggregations._avg?.cpm || 0),
            bestCpm: aggregations._max?.cpm || 0,
            timeSpent: formatDuration(aggregations._sum?.duration || 0),
        };

        return { success: true, data: { user, stats, activityHistory } };
    } catch (error) {
        console.error('Error fetching profile:', error);
        return { success: false, error: 'Failed to fetch profile' };
    }
}

interface UpdateProfileInput {
    username: string;
}

export async function updateProfile(
    input: UpdateProfileInput,
    signature?: AdvancedSignaturePayload
): Promise<{ success: boolean; data?: unknown; error?: string }> {
    try {
        // 签名验证
        const verification = await verifyAdvancedSignature(signature || null, input);
        if (!verification.valid) {
            return { success: false, error: 'Invalid request signature' };
        }

        const userId = await getUserId();
        if (!userId) {
            return { success: false, error: 'Unauthorized' };
        }

        if (!input.username || input.username.trim().length === 0) {
            return { success: false, error: 'Username is required' };
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { username: input.username },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
            }
        });

        revalidatePath('/profile');
        return { success: true, data: updatedUser };
    } catch (error) {
        console.error('Error updating profile:', error);
        return { success: false, error: 'Failed to update profile' };
    }
}

