import useWebSocket from 'hook/useWebSocket';
import { ComponentProps } from 'react';
import ReactFlow, {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    useReactFlow,
} from 'reactflow';
import { WebSocketMessage } from 'type/WebSocketMessage';
type ReactFlowProps = ComponentProps<typeof ReactFlow>;

const Flow: React.FC<ReactFlowProps> = props => {
    const rf = useReactFlow();

    const onMessage = (message: string) => {
        const webSocketMessage: WebSocketMessage = JSON.parse(message);
        const { edges, nodes, viewport } = webSocketMessage.data;

        rf.setViewport(viewport);
        rf.setEdges(edges);
        rf.setNodes(nodes);

        console.log(webSocketMessage);
    };
    const { isConnected, sendMessage } = useWebSocket('ws://localhost:8080/ws/nodes', onMessage);

    return (
        <ReactFlow {...props}>
            <Controls />
            <MiniMap />
            <Background variant={'dots' as BackgroundVariant} gap={12} size={1} />
        </ReactFlow>
    );
};

export default Flow;
