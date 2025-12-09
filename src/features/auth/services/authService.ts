import { LoginCredentials, RegisterCredentials, User } from '../types';
import { login, register, logoutAction, checkAuth, checkAvailability } from '../actions';
import { sign } from '@/lib/security';

export const authService = {
    async login(credentials: LoginCredentials): Promise<User> {
        const signature = await sign(credentials);
        const result = await login(credentials, signature);
        if (!result.success || !result.data) {
            throw new Error(result.error || '登录失败');
        }
        return result.data;
    },

    async register(credentials: RegisterCredentials): Promise<User> {
        const signature = await sign(credentials);
        const result = await register(credentials, signature);
        if (!result.success || !result.data) {
            throw new Error(result.error || '注册失败');
        }
        return result.data;
    },

    async checkAvailability(field: 'email' | 'username', value: string): Promise<boolean> {
        return await checkAvailability(field, value);
    },

    async logout(): Promise<void> {
        const result = await logoutAction();
        if (!result.success) {
            console.error(result.error);
        }
    },

    async getCurrentUser(): Promise<User | null> {
        const result = await checkAuth();
        if (result.success && result.data) {
            return result.data;
        }
        return null;
    }
};

