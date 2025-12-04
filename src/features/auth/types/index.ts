export interface User {
    id: string;
    email: string;
    username: string;
    avatarUrl?: string;
    createdAt: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    isAuthModalOpen: boolean;
    authModalView: 'login' | 'register';
}

export interface LoginCredentials {
    identifier: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
}
