import { create } from 'zustand';
import { AuthState, User } from '../types';

interface AuthStore extends AuthState {
    // Actions
    openAuthModal: (view?: 'login' | 'register') => void;
    closeAuthModal: () => void;
    setAuthModalView: (view: 'login' | 'register') => void;
    login: (user: User) => void;
    logout: () => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isAuthModalOpen: false,
    authModalView: 'login',

    openAuthModal: (view = 'login') => set({ isAuthModalOpen: true, authModalView: view, error: null }),
    closeAuthModal: () => set({ isAuthModalOpen: false, error: null }),
    setAuthModalView: (view) => set({ authModalView: view, error: null }),

    login: (user) => set({ user, isAuthenticated: true, error: null }),
    logout: () => set({ user: null, isAuthenticated: false, error: null }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));
