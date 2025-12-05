'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store/authStore';

export function AuthInitializer() {
    const { login, setLoading } = useAuthStore();

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/profile');
                if (res.ok) {
                    const { user } = await res.json();
                    login(user);
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
