import { UUID } from 'crypto';
import { ReactFlowJsonObject } from 'reactflow';
import { WebSocketMessage } from './WebSocketMessage';

export interface ServerSendFlow extends WebSocketMessage {
    flowId: UUID;
    title: string;
    flowContent: ReactFlowJsonObject;
}
