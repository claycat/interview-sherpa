import apiClient from 'common/axios/axios';
import { create } from 'zustand';

interface TitleState {
    title: string;
    setTitle: (newTitle: string) => void;
    saveTitleToServer: (flowId?: string) => void;
}

export const useTitleStore = create<TitleState>((set, get) => ({
    title: 'Untitled',
    setTitle: newTitle => set({ title: newTitle }),
    saveTitleToServer: async (flowId?: string) => {
        const { title } = get();
        if (flowId === undefined) return;
        try {
            const response = await apiClient.patch(`/flow/${flowId}/title`, {
                title: title,
            });
        } catch (error) {
            console.error('Failed to save title', error);
        }
    },
}));

export const titleStore = useTitleStore;
