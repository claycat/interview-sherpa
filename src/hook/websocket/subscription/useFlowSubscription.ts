import { useCallback } from 'react';
import { useReactFlow } from 'reactflow';
import { titleStore } from 'state/titleStore';
import { ServerSendFlow } from 'websocket/message/ServerSendFlow';
import useSubscription from './useSubscription';

const useFlowSubscription = (flowId?: string) => {
    if (flowId === undefined) {
        console.log('flowId is undefined');
    }

    const reactFlow = useReactFlow();

    const handleFlowMessage = useCallback(
        (message: string) => {
            try {
                const flowMessage: ServerSendFlow = JSON.parse(message);
                console.log(flowMessage);
                reactFlow.setNodes(flowMessage.flow.nodes);
                reactFlow.setEdges(flowMessage.flow.edges);
                reactFlow.setViewport(flowMessage.flow.viewport);

                const { setTitle } = titleStore.getState();
                setTitle(flowMessage.title);
            } catch (error) {
                console.error('Error parsing flow message:', error);
            }
        },
        [reactFlow],
    );

    useSubscription(`/topic/flow/${flowId}`, handleFlowMessage);
};

export default useFlowSubscription;
