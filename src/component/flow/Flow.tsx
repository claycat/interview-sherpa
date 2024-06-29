import useWebSocket from 'hook/useWebSocket';
import { ComponentProps } from 'react';
import ReactFlow, {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    NodeChange,
    useReactFlow,
} from 'reactflow';
import { serverWebSocketMessageDispatcher } from 'websocket/WebSocketMessageDispatcher';

type ReactFlowProps = ComponentProps<typeof ReactFlow>;

const Flow: React.FC<ReactFlowProps> = props => {
    const rf = useReactFlow();

    const onMessage = (message: string) => {
        serverWebSocketMessageDispatcher(message, rf, sendMessage);
    };

    const h = (change: NodeChange[]) => {
        //console.log(change);
        if (props.onNodesChange) {
            props.onNodesChange(change);
            // const webSocketMessage = new WebSocketMessage('CLIENT_CONNECT', {
            //     flow: flowToJson(rf),
            // });
            // sendMessage(webSocketMessage);
        }
    };

    const { isConnected, sendMessage } = useWebSocket('ws://localhost:8080/ws/nodes', onMessage);

    return (
        <ReactFlow {...props} onNodesChange={h}>
            <Controls />
            <MiniMap />
            <Background variant={'dots' as BackgroundVariant} gap={12} size={1} />
        </ReactFlow>
    );
};

export default Flow;
