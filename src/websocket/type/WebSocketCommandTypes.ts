import { ServerSendFlowResponsePayload } from 'websocket/payload/ServerSendFlowResponsePayload';

export const ClientWebSocketCommand = [
    'CLIENT_CONNECT_REQUEST',
    'CLIENT_UPDATE_FLOW_REQUEST',
] as const;
export type ClientWebSocketCommandType = (typeof ClientWebSocketCommand)[number];

export type ClientWebSocketCommandMap = {
    CLIENT_CONNECT_REQUEST: null;
    CLIENT_UPDATE_FLOW_REQUEST: undefined;
};

export const ServerWebSocketCommand = ['SERVER_SEND_FLOW_RESPONSE'] as const;

export type ServerWebSocketCommandType = (typeof ServerWebSocketCommand)[number];

export type ServerWebSocketCommandMap = {
    SERVER_SEND_FLOW_RESPONSE: ServerSendFlowResponsePayload;
};

export type WebSocketCommandType = ClientWebSocketCommandType | ServerWebSocketCommandType;
