import { ReactFlowInstance, ReactFlowJsonObject } from 'reactflow';

export const flowToJson = (reactFlow: ReactFlowInstance): ReactFlowJsonObject => {
    return {
        nodes: reactFlow.getNodes(),
        edges: reactFlow.getEdges(),
        viewport: reactFlow.getViewport(),
    };
};
