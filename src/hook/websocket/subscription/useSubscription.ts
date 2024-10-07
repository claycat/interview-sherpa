import { useEffect } from 'react';
import { useWebSocket } from '../WebSocketContext';

const useSubscription = (topic: string, onMessage: (message: string) => void) => {
    const { subscribe } = useWebSocket();

    useEffect(() => {
        const unsubscribe = subscribe(topic, onMessage);
        return () => {
            unsubscribe();
        };
    }, [subscribe, topic, onMessage]);
};

export default useSubscription;
