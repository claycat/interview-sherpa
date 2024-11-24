import axios from 'axios';
import { useAuthStore } from 'state/authStore';

const baseURL = process.env.REACT_APP_API_BASE_URL || '/api';

const apiClient = axios.create({ baseURL, timeout: 10000, withCredentials: true });

apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            const { setAuth } = useAuthStore.getState();
            setAuth(false, null);

            console.error('unauthorized');
        }
        return Promise.reject(error);
    },
);

export default apiClient;
