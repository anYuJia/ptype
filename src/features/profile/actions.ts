'use server';

import { prisma } from '@/lib/prisma';
import { getUserId } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export interface ProfileStats {
    joinDate: string;
    totalTests: number;
    avgWpm: number;
    bestWpm: number;
    timeSpent: string;
}

export interface ProfileData {
    user: {
        id: string;
        username: string;
        email: string;
        createdAt: Date;
    };
    stats: ProfileStats;
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

        const user = await prisma.user.findUnique({
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
            _avg: {
                wpm: true,
            },
            _max: {
                wpm: true,
            },
            _sum: {
                duration: true,
            },
            _count: {
                id: true,
            },
        });

        const stats: ProfileStats = {
            joinDate: user.createdAt.toISOString().split('T')[0],
            totalTests: aggregations._count.id,
            avgWpm: Math.round(aggregations._avg.wpm || 0),
            bestWpm: aggregations._max.wpm || 0,
            timeSpent: formatDuration(aggregations._sum.duration || 0),
        };

        return { success: true, data: { user, stats } };
    } catch (error) {
        console.error('Error fetching profile:', error);
        return { success: false, error: 'Failed to fetch profile' };
    }
}

export async function updateProfile(username: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
        const userId = await getUserId();
        if (!userId) {
            return { success: false, error: 'Unauthorized' };
        }

        if (!username || username.trim().length === 0) {
            return { success: false, error: 'Username is required' };
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { username },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
            }
        });

        revalidatePath('/profile'); // Revalidate profile page if we had one, or generic paths
        return { success: true, data: updatedUser };
    } catch (error) {
        console.error('Error updating profile:', error);
        return { success: false, error: 'Failed to update profile' };
    }
}
