import { WebSocketMessage } from 'websocket/message/WebSocketMessage';

export const clientConnectHandler = (
    sendMessage: (destination: string, message: WebSocketMessage) => void,
) => {
    sendMessage('/app/flow/request', {});
};
