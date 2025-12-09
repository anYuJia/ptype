import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key');

export async function getUserId(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(token.value, JWT_SECRET);
        return payload.sub as string;
    } catch {
        return null;
    }
}

export async function isAuthenticated(): Promise<boolean> {
    const userId = await getUserId();
    return !!userId;
}
