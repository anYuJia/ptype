import { LoginCredentials, RegisterCredentials, User } from '../types';

export const authService = {
    async login(credentials: LoginCredentials): Promise<User> {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || '登录失败');
        }

        return data.user;
    },

    async register(credentials: RegisterCredentials): Promise<User> {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || '注册失败');
        }

        return data.user;
    },

    async checkAvailability(field: 'email' | 'username', value: string): Promise<boolean> {
        const response = await fetch('/api/auth/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ field, value }),
        });

        if (!response.ok) return false;
        const data = await response.json();
        return data.available;
    },

    async logout(): Promise<void> {
        await fetch('/api/auth/logout', { method: 'POST' });
    },

    async getCurrentUser(): Promise<User | null> {
        try {
            const response = await fetch('/api/auth/me');
            if (!response.ok) return null;
            const data = await response.json();
            return data.user;
        } catch {
            return null;
        }
    }
};
