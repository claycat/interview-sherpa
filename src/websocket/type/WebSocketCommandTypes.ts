import { ClientSendFlowPayload } from 'websocket/payload/client/ClientSendFlowPayload';
import { ServerSendFlowResponsePayload } from 'websocket/payload/server/ServerSendFlowResponsePayload';

export const ClientWebSocketCommand = ['CLIENT_CONNECT_REQUEST', 'CLIENT_SEND_FLOW'] as const;

export type ClientWebSocketCommandType = (typeof ClientWebSocketCommand)[number];

export type ClientWebSocketCommandMap = {
    CLIENT_CONNECT_REQUEST: null;
    CLIENT_SEND_FLOW: ClientSendFlowPayload;
};

export const ServerWebSocketCommand = ['SERVER_SEND_FLOW_RESPONSE'] as const;

export type ServerWebSocketCommandType = (typeof ServerWebSocketCommand)[number];

export type ServerWebSocketCommandMap = {
    SERVER_SEND_FLOW_RESPONSE: ServerSendFlowResponsePayload;
};

export type WebSocketCommandType = ClientWebSocketCommandType | ServerWebSocketCommandType;
