import axios from 'axios';
import { useAuthStore } from 'state/authStore';

const apiClient = axios.create({
    baseURL: '/api',
    timeout: 10000,
    withCredentials: true,
});

apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            const { setAuth } = useAuthStore.getState();
            setAuth(false, null);

            console.log('unauthorized');
        }
        return Promise.reject(error);
    },
);

export default apiClient;
