import { useCallback } from 'react';
import { Edge, Node, useEdgesState, useNodesState } from 'reactflow';
import { NodeContent } from 'type/NodeContent';

const useFlow = (initialNodes: Node<NodeContent>[], initialEdges: Edge[]) => {
    const [nodes, setNodes, onNodesChange] = useNodesState<NodeContent>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const updateNodeData = useCallback(
        (nodeId: string, newData: Partial<NodeContent>) => {
            setNodes(nds =>
                nds.map(node =>
                    node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node,
                ),
            );
        },
        [setNodes],
    );

    return {
        nodes,
        edges,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
        updateNodeData,
    };
};

export default useFlow;
