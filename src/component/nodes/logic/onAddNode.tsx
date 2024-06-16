import { Edge, Node, Position } from 'reactflow';

export const onAddNode =
    (
        nodes: Node[],
        setNodes: (value: ((prevState: Node[]) => Node[]) | Node[]) => void,
        setEdges: (value: ((prevState: Edge[]) => Edge[]) | Edge[]) => void,
    ) =>
    (parentNodeId: string, position: Position) => {
        const newNodeId = (nodes.length + 1).toString();
        const parentNode = nodes.find(node => node.id === parentNodeId);

        const newPosition = {
            x:
                position === Position.Right
                    ? parentNode!.position.x + 200
                    : parentNode!.position.x - 200,
            y: parentNode!.position.y,
        };

        const newNode: Node = {
            id: newNodeId,
            type: 'customNode',
            data: { label: `Node ${newNodeId}`, onAddNode: () => {} },
            position: newPosition,
        };

        setNodes(nds => [...nds, newNode]);
        const source = position === Position.Right ? parentNodeId : newNodeId;
        const target = position === Position.Right ? newNodeId : parentNodeId;

        setEdges(eds => [...eds, { id: `e${source}-${target}`, source, target }]);
    };
