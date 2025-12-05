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
        const history = await prisma.typingResult.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 50, // Limit to last 50 for now
        });

        return NextResponse.json(history);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const userId = await getUserId();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { wpm, accuracy, mode, subMode, difficulty, duration } = body;

        const result = await prisma.typingResult.create({
            data: {
                userId,
                wpm,
                accuracy,
                mode,
                subMode,
                difficulty,
                duration,
            },
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error saving result:', error);
        return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
    }
}
