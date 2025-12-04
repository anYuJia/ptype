import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { loginSchema } from '@/features/auth/schemas/authSchema';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key');

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input using Zod
        const validationResult = loginSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.issues[0].message },
                { status: 400 }
            );
        }

        const { identifier, password } = validationResult.data;

        // Find user by email or username
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: identifier },
                    { username: identifier }
                ]
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

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
                createdAt: user.createdAt,
                avatarUrl: user.avatarUrl
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
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
