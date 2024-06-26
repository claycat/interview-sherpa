import { Edge, Node, Viewport } from 'reactflow';

export type WebSocketMessage = {
    command: string;
    data: {
        documentId?: string;
        nodes: Node[];
        edges: Edge[];
        viewport: Viewport;
    };
};
