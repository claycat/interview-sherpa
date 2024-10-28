import apiClient from 'common/axios/axios';
import DeletableEdge from 'component/edges/DeletableEdge';
import Flow from 'component/flow/Flow';
import TopicPageHeader from 'component/header/TopicPageHeader';
import useModal from 'component/modal/hooks/useModal';
import Modal from 'component/modal/Modal';
import CustomNode from 'component/nodes/CustomNode';
import useFlow from 'component/nodes/hooks/useFlow';
import { newExampleFlowObject } from 'constant/exampleFlow';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Connection, ConnectionMode, Edge, Node, useReactFlow } from 'reactflow';
import { authStore, useAuthStore } from 'state/authStore';
import { titleStore } from 'state/titleStore';
import { NodeContent } from 'type/NodeContent';
import { flowToJson } from 'util/flowToJson';

const exampleFlowObject = newExampleFlowObject();

const initialNodes: Node<NodeContent>[] = exampleFlowObject.nodes;
const initialEdges: Edge[] = exampleFlowObject.edges;

const nodeTypes = {
    customNode: CustomNode,
};

const edgeTypes = {
    deletableEdge: DeletableEdge,
};

const InitialTopicPage = () => {
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    const { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, updateNodeData } =
        useFlow(initialNodes, initialEdges);

    const { isModalOpen, modalNodeId, handleShowModal, handleCloseModal } = useModal();

    const rf = useReactFlow();

    const updatedNodes = nodes.map(node => ({
        ...node,
        data: {
            ...node.data,
            setIsModalOpen: (open: boolean) =>
                open ? handleShowModal(node.id) : handleCloseModal(),
        },
    }));
    const currentNode = nodes.find(node => node.id === modalNodeId);

    const isValidConnection = useCallback(
        (connection: Connection) => {
            const { source, target } = connection;
            if (source === target) return false;
            const exists = edges.some(
                edge =>
                    (edge.source === source && edge.target === target) ||
                    (edge.source === target && edge.target === source),
            );
            return !exists;
        },
        [edges],
    );

    useEffect(() => {
        if (isAuthenticated) {
            const user = authStore.getState().user;
            const title = titleStore.getState().title;

            const sendAuthenticatedRequest = async () => {
                try {
                    const response = await apiClient.post('/flows', {
                        memberId: user?.id,
                        flow: JSON.stringify(exampleFlowObject),
                        title,
                    });
                    const flowId = response.data.data.flowId;
                    navigate(`/topic/${flowId}`);
                } catch (error) {
                    console.error('API request failed:', error);
                }
            };

            sendAuthenticatedRequest();
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <TopicPageHeader />
            <div style={{ width: '100vw', height: 'calc(100vh - 50px)' }}>
                <Flow
                    nodes={updatedNodes}
                    edges={edges}
                    connectionMode={ConnectionMode.Loose}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    fitView={false}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    zoomOnScroll={!isModalOpen}
                />
                {currentNode && (
                    <Modal
                        show={isModalOpen}
                        onClose={handleCloseModal}
                        data={currentNode}
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
                <button
                    onClick={() => console.log(flowToJson(rf))}
                    style={{ position: 'absolute', top: 90, right: 10 }}
                >
                    Print
                </button>
            </div>
        </>
    );
};

export default InitialTopicPage;
