import { ComponentProps } from 'react';
import ReactFlow, { Background, BackgroundVariant, Controls, MiniMap, NodeChange } from 'reactflow';

type ReactFlowProps = ComponentProps<typeof ReactFlow>;

const Flow: React.FC<ReactFlowProps> = props => {
    const h = (change: NodeChange[]) => {
        if (props.onNodesChange) {
            props.onNodesChange(change);
        }
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactFlow {...props} onNodesChange={h}>
                <Controls />
                <MiniMap />
                <Background variant={'dots' as BackgroundVariant} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
};

export default Flow;
