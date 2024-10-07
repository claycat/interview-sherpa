import { useWebSocket } from 'hook/websocket/WebSocketContext';
import { ComponentProps, useCallback } from 'react';
import ReactFlow, {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    NodeChange,
    useReactFlow,
} from 'reactflow';
import { flowToJson } from 'util/flowToJson';
import { clientSendFlowHandler } from 'websocket/handler/client/clientSendFlowHandler';

type ReactFlowProps = ComponentProps<typeof ReactFlow>;

const Flow: React.FC<ReactFlowProps> = props => {
    const rf = useReactFlow();

    const h = (change: NodeChange[]) => {
        if (props.onNodesChange) {
            props.onNodesChange(change);
        }
    };

    const { isConnected, sendMessage } = useWebSocket();

    const handleSave = useCallback(() => {
        console.log('handle save');

        clientSendFlowHandler(sendMessage, {
            flow: flowToJson(rf),
        });
    }, [rf, sendMessage]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactFlow {...props} onNodesChange={h}>
                <Controls />
                <MiniMap />
                <Background variant={'dots' as BackgroundVariant} gap={12} size={1} />
            </ReactFlow>
            <button
                onClick={handleSave}
                disabled={!isConnected}
                style={{ position: 'absolute', top: 10, right: 10 }}
            >
                Save
            </button>
        </div>
    );
};

export default Flow;
