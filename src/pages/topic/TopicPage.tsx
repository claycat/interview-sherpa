import Modal from 'component/modal/Modal';
import useModal from 'component/modal/hooks/useModal';
import CustomNode from 'component/nodes/CustomNode';
import useNode from 'component/nodes/hooks/useNode';
import ReactFlow, { BackgroundVariant, Edge, Node, Position, ReactFlowProvider } from 'reactflow';

import { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { NodeContent } from 'type/NodeContent';

const initialNodes: Node<NodeContent>[] = [
    {
        id: 'node-1',
        type: 'customNode',
        data: { label: 'Node 1', question: 'what', answer: ['answer'] },
        position: { x: 250, y: 5 },
    },
];

const nodeTypes = {
    customNode: CustomNode,
};

const initialEdges: Edge[] = [];

const TopicPage = () => {
    const { nodes, edges, setNodes, onNodesChange, onEdgesChange, addNode, updateNodeData } =
        useNode(initialNodes, initialEdges);

    const { isModalOpen, modalNodeId, handleShowModal, handleCloseModal } = useModal();

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
