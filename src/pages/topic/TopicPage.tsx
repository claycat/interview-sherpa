import { StompHeaders } from '@stomp/stompjs';
import apiClient from 'common/axios/axios';
import DeletableEdge from 'component/edges/DeletableEdge';
import Flow from 'component/flow/Flow';
import TopicPageHeader from 'component/header/TopicPageHeader';
import Modal from 'component/modal/Modal';
import useModal from 'component/modal/hooks/useModal';
import CustomNode from 'component/nodes/CustomNode';
import useFlow from 'component/nodes/hooks/useFlow';
import { Role, mergeRole } from 'constant/roles';
import { useWebSocket } from 'hook/websocket/WebSocketContext';
import useFlowSubscription from 'hook/websocket/subscription/useFlowSubscription';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ConnectionMode, useReactFlow } from 'reactflow';

import 'reactflow/dist/style.css';
import { authStore } from 'state/authStore';

const nodeTypes = {
    customNode: CustomNode,
};

const edgeTypes = {
    deletableEdge: DeletableEdge,
};
const TopicPage = () => {
    const { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, updateNodeData } =
        useFlow([], []);

    const rf = useReactFlow();
    const params = useParams();
    const { user, setRole } = authStore();

    const { isModalOpen, modalNodeId, handleShowModal, handleCloseModal } = useModal();

    const { isConnected, subscribe, sendMessage } = useWebSocket();

    const updatedNodes = nodes.map(node => ({
        ...node,
        data: {
            ...node.data,
            setIsModalOpen: (open: boolean) =>
                open ? handleShowModal(node.id) : handleCloseModal(),
        },
    }));
    const currentNode = nodes.find(node => node.id === modalNodeId);

    useFlowSubscription(params.topic_id);

    useEffect(() => {
        const fetchRoles = async () => {
            let tokenRole: Role = 'ANONYMOUS';
            let userRole: Role = 'ANONYMOUS';

            const token = new URLSearchParams(window.location.search).get('token');
            if (token) {
                const response = await apiClient.get(`/flows/${params.topic_id}/tokens/${token}`);
                tokenRole = response.data as Role;
            }

            if (user) {
                try {
                    const response = await apiClient.get(
                        `/flows/${params.topic_id}/members/${user.id}/role`,
                    );
                    userRole = response.data.data.role as Role;
                } catch (error) {
                    console.error('Error fetching user role:', error);
                }
            }

            const finalRole = mergeRole(tokenRole, userRole);
            setRole(finalRole);
        };
        fetchRoles();
    }, [params.topic_id, setRole, user]);

    useEffect(() => {
        if (isConnected) {
            const token = new URLSearchParams(window.location.search).get('token');
            const headers: StompHeaders = {};

            if (token) {
                headers.token = token;
            }

            sendMessage(`/app/flow/${params.topic_id}/get`, {
                payload: {},
                headers,
            });
        }
    }, [isConnected, params.topic_id, sendMessage]);

    const handleSave = useCallback(() => {
        //sendMessage(`/app/flow/${params.topic_id}/patch`, { flow: flowToJson(rf) });
    }, [params.topic_id, rf, sendMessage]);

    return (
        <>
            <TopicPageHeader sendMessage={sendMessage} />
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
                {/* <button
                    onClick={() => console.log(JSON.stringify(flowToJson(rf)))}
                    disabled={!isConnected}
                    style={{ position: 'absolute', top: 90, right: 10 }}
                >
                    Print
                </button> */}
                {/* <button
                    onClick={handleSave}
                    disabled={!isConnected}
                    style={{ position: 'absolute', top: 60, right: 10 }}
                >
                    Save
                </button>
                <button
                    onClick={() => console.log(JSON.stringify(flowToJson(rf)))}
                    disabled={!isConnected}
                    style={{ position: 'absolute', top: 90, right: 10 }}
                >
                    Print
                </button>
                <button
                    onClick={() => sendMessage(`/app/flow/${params.topic_id}/get`, {})}
                    disabled={!isConnected}
                    style={{ position: 'absolute', top: 120, right: 10 }}
                >
                    refresh
                </button> */}
            </div>
        </>
    );
};

export default TopicPage;
