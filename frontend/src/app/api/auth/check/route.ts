import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const checkSchema = z.object({
    field: z.enum(['email', 'username']),
    value: z.string().min(1),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validation = checkSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        const { field, value } = validation.data;

        const count = await prisma.user.count({
            where: {
                [field]: value,
            },
        });

        return NextResponse.json({ available: count === 0 });
    } catch (error) {
        console.error('Check availability error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
