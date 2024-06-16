import Modal from 'component/modal/Modal';
import CustomNode from 'component/nodes/CustomNode';
import { onAddNode } from 'component/nodes/logic/onAddNode';
import { useState } from 'react';
import ReactFlow, { BackgroundVariant, Edge, Node, Position, ReactFlowProvider } from 'reactflow';

import { Background, Controls, MiniMap, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
    {
        id: 'node-1',
        type: 'customNode',
        data: { label: 'Node 1' },
        position: { x: 250, y: 5 },
    },
];

const nodeTypes = {
    customNode: CustomNode,
};

const initialEdges: Edge[] = [];

const TopicPage = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalNodeId, setModalNodeId] = useState<string | null>(null);

    const addNodeHandler = onAddNode(nodes, setNodes, setEdges);

    const handleShowModal = (nodeId: string) => {
        setModalNodeId(nodeId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalNodeId(null);
        setIsModalOpen(false);
    };

    const updatedNodes = nodes.map(node => ({
        ...node,
        data: {
            ...node.data,
            onAddNode: (pos: Position) => addNodeHandler(node.id, pos),
            setIsModalOpen: (open: boolean) =>
                open ? handleShowModal(node.id) : handleCloseModal(),
            isModalOpen: node.id === modalNodeId && isModalOpen,
        },
    }));

    const currentNode = nodes.find(node => node.id === modalNodeId);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={updatedNodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodesConnectable={false}
                    fitView
                    nodeTypes={nodeTypes}
                    zoomOnScroll={!isModalOpen}
                >
                    <Controls />
                    <MiniMap />
                    <Background variant={'dots' as BackgroundVariant} gap={12} size={1} />
                </ReactFlow>
                <Modal
                    show={isModalOpen}
                    onClose={handleCloseModal}
                    title={`Edit Node ${modalNodeId}`}
                >
                    {currentNode && (
                        <div>
                            <p>Edit content for node {modalNodeId}</p>
                            <p>Label: {currentNode.data.label}</p>
                            {/* Add more content specific to the node */}
                        </div>
                    )}
                </Modal>
            </ReactFlowProvider>
        </div>
    );
};

export default TopicPage;
