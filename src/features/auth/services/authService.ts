import { LoginCredentials, RegisterCredentials, User } from '../types';
import { login, register, logoutAction, checkAuth, checkAvailability } from '../actions';

export const authService = {
    async login(credentials: LoginCredentials): Promise<User> {
        const result = await login(credentials);
        if (!result.success || !result.data) {
            throw new Error(result.error || '登录失败');
        }
        return result.data;
    },

    async register(credentials: RegisterCredentials): Promise<User> {
        const result = await register(credentials);
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
