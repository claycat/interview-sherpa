import { useCallback } from 'react';
import { ReactFlowInstance } from 'reactflow';
import { ServerSendFlow } from 'websocket/message/ServerSendFlow';
import useSubscription from './useSubscription';

const useFlowSubscription = (rf: ReactFlowInstance) => {
    const handleFlowMessage = useCallback(
        (message: string) => {
            try {
                const flowMessage: ServerSendFlow = JSON.parse(message);
                console.log('aReceived Flow Message:', flowMessage);
            } catch (error) {
                console.error('Error parsing flow message:', error);
            }
        },
        [rf],
    );

    useSubscription('/topic/flow', handleFlowMessage);
};

export default useFlowSubscription;
