import { ReactFlowInstance } from 'reactflow';
import { ServerWebSocketMessage } from 'websocket/message/ServerWebSocketMessage';

export const serverSendFlowHandler = (message: string, rf: ReactFlowInstance) => {
    const serverWebSocketMessage =
        ServerWebSocketMessage.deserialize<'SERVER_SEND_FLOW_RESPONSE'>(message);

    const data = serverWebSocketMessage.getData();
    const { edges, nodes, viewport } = data;
    rf.setNodes(nodes);
    rf.setEdges(edges);
    rf.setViewport(viewport);
};
