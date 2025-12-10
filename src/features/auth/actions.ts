'use server';

import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { loginSchema, registerSchema } from './schemas/authSchema';
import { z } from 'zod';
import { User } from './types';
import { verifyAdvancedSignature, type AdvancedSignaturePayload } from '@/lib/security/verifier';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key');

// Cookie secure 设置：HTTPS 环境设为 true，HTTP 环境设为 false
// 可通过 SECURE_COOKIES=false 环境变量在生产环境禁用
const SECURE_COOKIES = process.env.SECURE_COOKIES !== 'false' && process.env.NODE_ENV === 'production';

type LoginInput = z.infer<typeof loginSchema>;
type RegisterInput = z.infer<typeof registerSchema>;

interface AuthResult {
    success: boolean;
    data?: User;
    error?: string;
}

export async function login(
    input: LoginInput,
    signature?: AdvancedSignaturePayload
): Promise<AuthResult> {
    try {
        // 签名验证
        const verification = await verifyAdvancedSignature(signature || null, input);
        if (!verification.valid) {
            return { success: false, error: 'Invalid request signature' };
        }

        const validationResult = loginSchema.safeParse(input);

        if (!validationResult.success) {
            return { success: false, error: validationResult.error.issues[0].message };
        }

        const { identifier, password } = validationResult.data;

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: identifier },
                    { username: identifier }
                ]
            }
        });

        if (!user) {
            return { success: false, error: 'Invalid credentials' };
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return { success: false, error: 'Invalid credentials' };
        }

        const token = await new SignJWT({ sub: user.id, email: user.email, username: user.username })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('7d')
            .sign(JWT_SECRET);

        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: SECURE_COOKIES,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        // Convert Date to string for client component consumption
        const userDto: User = {
            id: user.id,
            email: user.email,
            username: user.username,
            createdAt: user.createdAt.toISOString(),
            avatarUrl: user.avatarUrl || undefined
        };

        return { success: true, data: userDto };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Internal server error' };
    }
}


export async function register(
    input: RegisterInput,
    signature?: AdvancedSignaturePayload
): Promise<AuthResult> {
    try {
        // 签名验证
        const verification = await verifyAdvancedSignature(signature || null, input);
        if (!verification.valid) {
            console.warn('Invalid register signature:', verification.error);
            return { success: false, error: 'Invalid request signature' };
        }

        const validationResult = registerSchema.safeParse(input);

        if (!validationResult.success) {
            return { success: false, error: validationResult.error.issues[0].message };
        }

        const { email, username, password } = validationResult.data;

        const existingEmail = await prisma.user.findUnique({ where: { email } });
        if (existingEmail) {
            return { success: false, error: '该邮箱已被注册' };
        }

        const existingUsername = await prisma.user.findUnique({ where: { username } });
        if (existingUsername) {
            return { success: false, error: '该用户名已被使用' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            }
        });

        const token = await new SignJWT({ sub: user.id, email: user.email, username: user.username })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('7d')
            .sign(JWT_SECRET);

        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: SECURE_COOKIES,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });

        const userDto: User = {
            id: user.id,
            email: user.email,
            username: user.username,
            createdAt: user.createdAt.toISOString(),
            avatarUrl: user.avatarUrl || undefined
        };

        return { success: true, data: userDto };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: 'Internal server error' };
    }
}

export async function logoutAction(): Promise<{ success: boolean; error?: string }> {
    try {
        const cookieStore = await cookies();
        cookieStore.set('token', '', {
            httpOnly: true,
            expires: new Date(0),
            path: '/',
        });
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, error: 'Failed to logout' };
    }
}

export async function checkAuth(): Promise<AuthResult> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token');

        if (!token) return { success: false };

        const { payload } = await jwtVerify(token.value, JWT_SECRET);
        const userId = payload.sub as string;

        if (!userId) return { success: false };

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
                avatarUrl: true
            }
        });

        if (!user) return { success: false };

        const userDto: User = {
            id: user.id,
            email: user.email,
            username: user.username,
            createdAt: user.createdAt.toISOString(),
            avatarUrl: user.avatarUrl || undefined
        };

        return { success: true, data: userDto };
    } catch {
        // Token might be invalid or expired
        return { success: false };
    }
}

export async function checkAvailability(field: 'email' | 'username', value: string): Promise<boolean> {
    try {
        if (!value) return false;

        const count = await prisma.user.count({
            where: {
                [field]: value,
            },
        });

        return count === 0;
    } catch (error) {
        console.error('Check availability error:', error);
        return false;
    }
}
