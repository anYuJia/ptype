'use server';

import { prisma } from '@/lib/prisma';
import { TypingMode } from '@/lib/constants';

export interface LeaderboardEntry {
    id: string;
    rank: number;
    username: string;
    cpm: number;
    accuracy: number;
    date: string;
    avatar?: string | null;
}

export interface GetLeaderboardParams {
    mode?: TypingMode;
    difficulty?: string;
    subMode?: string | null;
}

export async function getLeaderboard(params: GetLeaderboardParams): Promise<{ success: boolean; data?: LeaderboardEntry[]; error?: string }> {
    const { mode = 'english', difficulty = 'medium', subMode } = params;

    try {
        const whereClause: {
            mode: string;
            difficulty: string;
            subMode?: string;
        } = {
            mode,
            difficulty,
        };

        if (subMode) {
            whereClause.subMode = subMode;
        }

        const leaderboard = await prisma.typingResult.findMany({
            where: whereClause,
            orderBy: [
                { cpm: 'desc' },
                { accuracy: 'desc' },
            ],
            // Fetch more than 50 to allow for filtering duplicates
            take: 200,
            include: {
                user: {
                    select: {
                        username: true,
                        avatarUrl: true,
                    },
                },
            },
        });

        // Filter to keep only the best result per user
        const uniqueLeaderboard: typeof leaderboard = [];
        const seenUsers = new Set<string>();

        for (const entry of leaderboard) {
            if (!seenUsers.has(entry.userId)) {
                seenUsers.add(entry.userId);
                uniqueLeaderboard.push(entry);
                if (uniqueLeaderboard.length >= 50) break;
            }
        }

        // Transform data to match frontend expectation
        const formattedLeaderboard: LeaderboardEntry[] = uniqueLeaderboard.map((entry, index) => {
            return {
                id: entry.id,
                rank: index + 1,
                username: entry.user?.username || 'Unknown',
                cpm: entry.cpm,
                accuracy: entry.accuracy,
                date: entry.createdAt.toISOString(),
                avatar: entry.user?.avatarUrl,
            };
        });

        return { success: true, data: formattedLeaderboard };
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return { success: false, error: 'Failed to fetch leaderboard' };
    }
}
