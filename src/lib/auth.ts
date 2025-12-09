import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key');

export async function getUserId(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
        console.log('[Auth] No token cookie found');
        return null;
    }

    try {
        const { payload } = await jwtVerify(token.value, JWT_SECRET);
        console.log('[Auth] Token verified, user:', payload.sub);
        return payload.sub as string;
    } catch (error) {
        console.error('[Auth] Token verification failed:', error instanceof Error ? error.message : error);
        return null;
    }
}

export async function isAuthenticated(): Promise<boolean> {
    const userId = await getUserId();
    return !!userId;
}
