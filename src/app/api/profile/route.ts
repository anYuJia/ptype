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
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                username: true,
                email: true,
                createdAt: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
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

        const stats = {
            joinDate: user.createdAt.toISOString().split('T')[0],
            totalTests: aggregations._count.id,
            avgWpm: Math.round(aggregations._avg.wpm || 0),
            bestWpm: aggregations._max.wpm || 0,
            timeSpent: formatDuration(aggregations._sum.duration || 0),
        };

        return NextResponse.json({ user, stats });
    } catch (error) {
        console.error('Error fetching profile:', error);
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const userId = await getUserId();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { username } = body;

        if (!username) {
            return NextResponse.json({ error: 'Username is required' }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { username },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}

function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
}
