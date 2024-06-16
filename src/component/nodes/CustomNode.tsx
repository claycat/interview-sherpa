/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

interface CustomNodeData {
    label: string;
    onAddNode: (position: Position) => void;
}

const customNodeStyle = css`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #fff;
    position: relative;
`;

const CustomNode: FC<NodeProps<CustomNodeData>> = ({ data }) => {
    return (
        <div css={customNodeStyle}>
            <Handle
                type="target"
                position={Position.Left}
                onClick={event => {
                    event.stopPropagation();
                    data.onAddNode(Position.Left);
                }}
                style={{ cursor: 'pointer' }}
            />
            <div>{data.label}</div>
            <Handle
                type="source"
                position={Position.Right}
                onClick={event => {
                    event.stopPropagation();
                    data.onAddNode(Position.Right);
                }}
                style={{ cursor: 'pointer' }}
            />
        </div>
    );
};

export default CustomNode;
