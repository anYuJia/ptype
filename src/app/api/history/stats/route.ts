import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key');

async function getUserId() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token.value, JWT_SECRET);
        return payload.sub as string;
    } catch {
        return null;
    }
}

export async function GET(request: Request) {
    const userId = await getUserId();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
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

        // Calculate time spent strings
        const totalSeconds = aggregations._sum.duration || 0;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        let timeLabel = '';
        if (hours > 0) {
            timeLabel = `${hours}h ${minutes}m`;
        } else {
            timeLabel = `${minutes}m`;
        }

        const stats = {
            totalTests: aggregations._count.id,
            avgWpm: Math.round(aggregations._avg.wpm || 0),
            bestWpm: aggregations._max.wpm || 0,
            totalTime: timeLabel,
            totalSeconds: totalSeconds // sending raw seconds just in case frontend needs it someday
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error('Error fetching history stats:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
