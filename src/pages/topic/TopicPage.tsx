import Flow from 'component/flow/Flow';
import Modal from 'component/modal/Modal';
import useModal from 'component/modal/hooks/useModal';
import CustomNode from 'component/nodes/CustomNode';
import useFlow from 'component/nodes/hooks/useFlow';
import { useWebSocket } from 'hook/websocket/WebSocketContext';
import { Edge, Node, Position, ReactFlowProvider } from 'reactflow';

import 'reactflow/dist/style.css';
import { NodeContent } from 'type/NodeContent';

const initialNodes: Node<NodeContent>[] = [
    {
        id: 'node-1',
        type: 'customNode',
        data: { label: 'Node 1', question: 'what', answers: ['answer'] },
        position: { x: 250, y: 5 },
    },
];

const nodeTypes = {
    customNode: CustomNode,
};

const initialEdges: Edge[] = [];

const TopicPage = () => {
    const {
        nodes,
        edges,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
        addNode,
        updateNodeData,
    } = useFlow(initialNodes, initialEdges);

    const { isModalOpen, modalNodeId, handleShowModal, handleCloseModal } = useModal();

    const { isConnected, subscribe, sendMessage } = useWebSocket();

    const updatedNodes = nodes.map(node => ({
        ...node,
        data: {
            ...node.data,
            onAddNode: (pos: Position) => addNode(node.id, pos),
            setIsModalOpen: (open: boolean) =>
                open ? handleShowModal(node.id) : handleCloseModal(),
        },
    }));
    const currentNode = nodes.find(node => node.id === modalNodeId);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlowProvider>
                <Flow
                    nodes={updatedNodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodesConnectable={false}
                    fitView
                    nodeTypes={nodeTypes}
                    zoomOnScroll={!isModalOpen}
                />
                {currentNode && (
                    <Modal
                        show={isModalOpen}
                        onClose={handleCloseModal}
                        data={currentNode.data}
                        onUpdate={newData => updateNodeData(currentNode.id, newData)}
                    />
                )}
            </ReactFlowProvider>
        </div>
    );
};

export default TopicPage;
