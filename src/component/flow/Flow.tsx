import { ComponentProps, useCallback, useRef } from 'react';
import ReactFlow, {
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    Edge,
    MiniMap,
    Node,
    NodeChange,
    OnConnectStartParams,
    addEdge,
    useReactFlow,
} from 'reactflow';
import { NodeContent } from 'type/NodeContent';
import { v4 as uuidv4 } from 'uuid';

type ReactFlowProps = ComponentProps<typeof ReactFlow>;

const Flow: React.FC<ReactFlowProps> = props => {
    const h = (change: NodeChange[]) => {
        if (props.onNodesChange) {
            props.onNodesChange(change);
        }
    };

    const rf = useReactFlow();

    const addNodeOnDrop = useCallback(
        (
            sourceNodeId: string,
            position: { x: number; y: number },
            sourceHandleId: string | null,
        ) => {
            const newNodeId = `${uuidv4()}`;

            const newNode: Node<NodeContent> = {
                id: newNodeId,
                type: 'customNode',
                data: { label: `Node ${newNodeId}`, question: '', answers: [], comments: [] },
                position,
            };

            rf.setNodes(nds => [...nds, newNode]);

            let targetHandleId = null;

            if (sourceHandleId === 'handle-right') {
                targetHandleId = 'handle-left';
            } else if (sourceHandleId === 'handle-left') {
                targetHandleId = 'handle-right';
            }

            if (sourceHandleId && targetHandleId) {
                const newEdge: Edge = {
                    id: `e${sourceNodeId}-${newNodeId}`,
                    type: 'deletableEdge',
                    source: sourceNodeId,
                    sourceHandle: sourceHandleId,
                    target: newNodeId,
                    targetHandle: targetHandleId,
                };

                rf.setEdges(eds => addEdge(newEdge, eds));
            }
        },
        [rf],
    );

    const connectingNodeId = useRef<string | null>(null);
    const connectingHandleId = useRef<string | null>(null);

    const onConnect = useCallback(
        (params: Connection) => {
            const newEdge = {
                ...params,
                type: 'deletableEdge',
            };
            rf.setEdges(eds => addEdge(newEdge, eds));

            connectingNodeId.current = null;
            connectingHandleId.current = null;
        },
        [rf],
    );

    const onConnectStart = useCallback((event: any, { nodeId, handleId }: OnConnectStartParams) => {
        if (nodeId && handleId) {
            connectingNodeId.current = nodeId;
            connectingHandleId.current = handleId;
        } else {
            connectingNodeId.current = null;
            connectingHandleId.current = null;
        }
    }, []);

    const onConnectEnd = useCallback(
        (event: MouseEvent | TouchEvent) => {
            if (!connectingNodeId.current) {
                return;
            }

            const target = event.target as HTMLElement;
            const targetIsPane = target.classList.contains('react-flow__pane');

            if (targetIsPane) {
                const dropPosition = rf.screenToFlowPosition({
                    x: 'touches' in event ? event.touches[0].clientX : event.clientX,
                    y: 'touches' in event ? event.touches[0].clientY : event.clientY,
                });

                addNodeOnDrop(connectingNodeId.current, dropPosition, connectingHandleId.current);

                connectingNodeId.current = null;
                connectingHandleId.current = null;
            }
        },
        [rf, addNodeOnDrop],
    );

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactFlow
                {...props}
                onNodesChange={h}
                onConnect={onConnect}
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
            >
                <Controls />
                <MiniMap />
                <Background variant={'dots' as BackgroundVariant} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
};

export default Flow;
