import CustomNode from 'component/nodes/CustomNode';
import { onAddNode } from 'component/nodes/logic/onAddNode';
import ReactFlow, { BackgroundVariant, Edge, Node, Position } from 'reactflow';

import { Background, Controls, MiniMap, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
    {
        id: 'node-1',
        type: 'customNode',
        data: { label: 'Node 1' },
        position: { x: 250, y: 5 },
    },
];

const nodeTypes = {
    customNode: CustomNode,
};

const initialEdges: Edge[] = [];

const TopicPage = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const addNodeHandler = onAddNode(nodes, setNodes, setEdges);

    const updatedNodes = nodes.map(node => ({
        ...node,
        data: { ...node.data, onAddNode: (pos: Position) => addNodeHandler(node.id, pos) },
    }));

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={updatedNodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodesConnectable={false}
                fitView
                nodeTypes={nodeTypes}
            >
                <Controls />
                <MiniMap />
                <Background variant={'dots' as BackgroundVariant} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
};

export default TopicPage;
