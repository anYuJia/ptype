import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || 'english';
    const difficulty = searchParams.get('difficulty') || 'medium';
    const subMode = searchParams.get('subMode');

    try {
        const whereClause: any = {
            mode,
            difficulty,
        };

        if (subMode) {
            whereClause.subMode = subMode;
        }

        const leaderboard = await prisma.typingResult.findMany({
            where: whereClause,
            orderBy: [
                { wpm: 'desc' },
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
        const uniqueLeaderboard = [];
        const seenUsers = new Set();

        for (const entry of leaderboard) {
            if (!seenUsers.has(entry.userId)) {
                seenUsers.add(entry.userId);
                uniqueLeaderboard.push(entry);
                if (uniqueLeaderboard.length >= 50) break;
            }
        }

        // Transform data to match frontend expectation
        const formattedLeaderboard = uniqueLeaderboard.map((entry, index) => ({
            id: entry.id,
            rank: index + 1,
            username: entry.user.username,
            wpm: entry.wpm,
            accuracy: entry.accuracy,
            date: entry.createdAt.toISOString(), // Or format as needed
            avatar: entry.user.avatarUrl,
        }));

        return NextResponse.json(formattedLeaderboard);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
    }
}
