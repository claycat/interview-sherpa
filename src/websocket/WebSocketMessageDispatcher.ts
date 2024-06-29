import { ReactFlowInstance } from 'reactflow';
import { serverSendFlowHandler } from './handler/server/serverSendFlowHandler';
import { ServerWebSocketMessage } from './message/ServerWebSocketMessage';
import { ServerWebSocketCommandType } from './type/WebSocketCommandTypes';

export const serverWebSocketMessageDispatcher = (
    message: string,
    rf: ReactFlowInstance,
    messageSender: (message: string) => void,
) => {
    const webSocketMessage = ServerWebSocketMessage.deserialize(message);

    const command: ServerWebSocketCommandType = webSocketMessage.getCommand();

    switch (command) {
        case 'SERVER_SEND_FLOW_RESPONSE':
            serverSendFlowHandler(message, rf);
            break;
        default:
            throw new Error('Invalid WebSocket Command');
    }
};
