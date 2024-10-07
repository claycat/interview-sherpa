import { ClientConnect } from 'websocket/message/ClientConnect';
import { WebSocketMessage } from 'websocket/message/WebSocketMessage';

export const clientConnectHandler = (
    sendMessage: (destination: string, message: WebSocketMessage) => void,
) => {
    const message = new ClientConnect();
    sendMessage('/app/flow/request', message);
};
