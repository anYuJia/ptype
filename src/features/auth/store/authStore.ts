import { create } from 'zustand';
import { AuthState, User } from '../types';
import { authService } from '../services/authService';

interface AuthStore extends AuthState {
    triggerPosition: { x: number; y: number } | null;
    // Actions
    openAuthModal: (view?: 'login' | 'register', position?: { x: number; y: number } | null) => void;
    closeAuthModal: () => void;
    setAuthModalView: (view: 'login' | 'register') => void;
    login: (user: User) => void;
    logout: () => Promise<void>;
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
    triggerPosition: null,

    openAuthModal: (view = 'login', position = null) => set({ isAuthModalOpen: true, authModalView: view, error: null, triggerPosition: position }),
    closeAuthModal: () => set({ isAuthModalOpen: false, error: null }), // Don't clear triggerPosition here to allow exit animation
    setAuthModalView: (view) => set({ authModalView: view, error: null }),

    login: (user) => set({ user, isAuthenticated: true, error: null }),
    logout: async () => {
        await authService.logout();
        set({ user: null, isAuthenticated: false, error: null });
    },
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));
