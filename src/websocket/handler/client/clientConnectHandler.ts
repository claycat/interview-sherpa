import { ClientWebSocketMessage } from 'websocket/message/ClientWebSocketMessage';
import { WebSocketMessage } from 'websocket/message/WebSocketMessage';

export const clientConnectHandler = (
    sendMessage: (destination: string, message: WebSocketMessage) => void,
) => {
    const message = new ClientWebSocketMessage('CLIENT_CONNECT_REQUEST', null);
    sendMessage('/app/flow/request', message);
};
