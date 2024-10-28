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
    sessionExpired: boolean;
    fetchSession: () => Promise<{ user: User | null; sessionExpired: boolean }>;
    logout: () => Promise<void>;
    setAuth: (isAuth: boolean, user: User | null, sessionExpired?: boolean) => void;
}

export const useAuthStore = create<AuthState>(set => ({
    isAuthenticated: false,
    user: null,
    sessionExpired: false,
    fetchSession: async () => {
        try {
            const response = await apiClient.get('/session', { withCredentials: true });
            const user = response.data;

            set({
                isAuthenticated: true,
                user,
                sessionExpired: false,
            });

            return { user, sessionExpired: false };
        } catch (error: any) {
            console.error('Failed to fetch session', error);

            if (error.response && error.response.status === 401) {
                set({
                    isAuthenticated: false,
                    user: null,
                    sessionExpired: true,
                });
                return { user: null, sessionExpired: true };
            } else {
                set({
                    isAuthenticated: false,
                    user: null,
                    sessionExpired: false,
                });
                return { user: null, sessionExpired: false };
            }
        }
    },
    logout: async () => {
        try {
            await apiClient.post('/logout', {}, { withCredentials: true });
            set({
                isAuthenticated: false,
                user: null,
                sessionExpired: false,
            });
            window.location.href = `/topic`;
        } catch (error) {
            console.error('Logout failed', error);
        }
    },
    setAuth: (isAuth, user, sessionExpired = false) =>
        set({ isAuthenticated: isAuth, user, sessionExpired }),
}));

export const authStore = useAuthStore;
