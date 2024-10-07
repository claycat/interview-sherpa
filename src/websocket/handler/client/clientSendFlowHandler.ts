import { WebSocketMessage } from 'websocket/message/WebSocketMessage';
import { ClientSendFlowPayload } from 'websocket/payload/client/ClientSendFlowPayload';

export const clientSendFlowHandler = (
    sendMessage: (destination: string, message: WebSocketMessage) => void,
    payload: ClientSendFlowPayload,
) => {
    console.log(payload);
    sendMessage('/app/flow/update', payload);
};
