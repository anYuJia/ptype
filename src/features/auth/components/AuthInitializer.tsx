'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store/authStore';
import { getProfile } from '@/features/profile/actions';

export function AuthInitializer() {
    const { login, setLoading } = useAuthStore();

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            try {
                const result = await getProfile();
                if (result.success && result.data) {
                    const userWithDateString = {
                        ...result.data.user,
                        createdAt: result.data.user.createdAt.toISOString()
                    };
                    login(userWithDateString);
                }
            } catch (error) {
                console.error('Failed to check auth status', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [login, setLoading]);

    return null;
}
