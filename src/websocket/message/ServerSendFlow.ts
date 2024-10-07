import { UUID } from 'crypto';
import { ReactFlowJsonObject } from 'reactflow';

export interface ServerSendFlow {
    flowId: UUID;
    flow: ReactFlowJsonObject;
}
