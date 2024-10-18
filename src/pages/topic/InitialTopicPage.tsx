import Flow from 'component/flow/Flow';
import TopicPageHeader from 'component/header/TopicPageHeader';
import useModal from 'component/modal/hooks/useModal';
import Modal from 'component/modal/Modal';
import CustomNode from 'component/nodes/CustomNode';
import useFlow from 'component/nodes/hooks/useFlow';
import exampleFlow from 'constant/exampleFlow';
import { Edge, Node, Position, ReactFlowJsonObject, useReactFlow } from 'reactflow';
import { NodeContent } from 'type/NodeContent';

const exampleFlowObject: ReactFlowJsonObject = JSON.parse(exampleFlow);

const initialNodes: Node<NodeContent>[] = exampleFlowObject.nodes;
const initialEdges: Edge[] = exampleFlowObject.edges;

const nodeTypes = {
    customNode: CustomNode,
};

const InitialTopicPage = () => {
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

    const rf = useReactFlow();
    return (
        <>
            <TopicPageHeader />
            <div style={{ width: '100vw', height: '100vh' }}>
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
                <button
                    onClick={() => {
                        console.log(rf.toObject());
                        console.log(JSON.stringify(rf.toObject()));
                    }}
                    style={{ position: 'absolute', top: 60, right: 10 }}
                >
                    Save
                </button>
            </div>
        </>
    );
};

export default InitialTopicPage;
