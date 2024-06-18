import { useCallback } from 'react';
import { Edge, Node, Position, useEdgesState, useNodesState } from 'reactflow';
import { NodeContent } from 'type/NodeContent';

const useNode = (initialNodes: Node<NodeContent>[], initialEdges: Edge[]) => {
    const [nodes, setNodes, onNodesChange] = useNodesState<NodeContent>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const addNode = useCallback(
        (parentNodeId: string, position: Position) => {
            setNodes(nds => {
                const newNodeId = `node-${nds.length + 1}`;
                const parentNode = nds.find(node => node.id === parentNodeId);

                if (!parentNode) {
                    console.error(`Parent node with id ${parentNodeId} not found`);
                    return nds;
                }

                const newPosition = {
                    x:
                        position === Position.Right
                            ? parentNode.position.x + 200
                            : parentNode.position.x - 200,
                    y: parentNode.position.y,
                };

                const newNodeContent: NodeContent = {
                    label: `Node ${newNodeId}`,
                    question: '',
                    answer: [],
                };

                const newNode: Node<NodeContent> = {
                    id: newNodeId,
                    type: 'customNode',
                    data: newNodeContent,
                    position: newPosition,
                };

                const source = position === Position.Right ? parentNodeId : newNodeId;
                const target = position === Position.Right ? newNodeId : parentNodeId;

                setEdges(eds => [
                    ...eds,
                    {
                        id: `e${source}-${target}`,
                        source,
                        target,
                    },
                ]);

                return [...nds, newNode];
            });
        },
        [setNodes, setEdges],
    );

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
        onNodesChange,
        onEdgesChange,
        addNode,
        updateNodeData,
    };
};

export default useNode;
