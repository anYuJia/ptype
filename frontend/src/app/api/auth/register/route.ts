import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { registerSchema } from '@/features/auth/schemas/authSchema';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key');

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input using Zod
        const validationResult = registerSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.issues[0].message },
                { status: 400 }
            );
        }

        const { email, username, password } = validationResult.data;

        // Check if user exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            }
        });

        // Generate JWT
        const token = await new SignJWT({ sub: user.id, email: user.email, username: user.username })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('7d')
            .sign(JWT_SECRET);

        // Create response with cookie
        const response = NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                createdAt: user.createdAt
            }
        });

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
