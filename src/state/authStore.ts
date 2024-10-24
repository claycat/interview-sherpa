import apiClient from 'common/axios/axios';
import { UUID } from 'crypto';
import { create } from 'zustand/react';

interface User {
    email: string;
    name: string;
    profileURL: string;
    id: UUID;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    fetchSession: () => Promise<void>;
    logout: () => Promise<void>;
    setAuth: (isAuth: boolean, user: User | null) => void;
}

export const useAuthStore = create<AuthState>(set => ({
    isAuthenticated: false,
    user: null,
    fetchSession: async () => {
        try {
            const response = await apiClient.get('/session', { withCredentials: true });
            const user = response.data;
            set({
                isAuthenticated: true,
                user,
            });
        } catch (error) {
            console.error('Failed to fetch session', error);
            set({
                isAuthenticated: false,
                user: null,
            });
        }
    },
    logout: async () => {
        try {
            await apiClient.post('/logout', {}, { withCredentials: true });
            set({
                isAuthenticated: false,
                user: null,
            });
            window.location.href = `/topic`;
        } catch (error) {
            console.error('Logout failed', error);
        }
    },
    setAuth: (isAuth, user) => set({ isAuthenticated: isAuth, user }),
}));

export const authStore = useAuthStore;
