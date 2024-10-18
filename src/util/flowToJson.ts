import { ReactFlowInstance, ReactFlowJsonObject } from 'reactflow';

export const flowToJson = (reactFlow: ReactFlowInstance): ReactFlowJsonObject => {
    return reactFlow.toObject();
};
