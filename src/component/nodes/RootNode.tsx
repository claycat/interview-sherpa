/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { FC } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

interface RootNodeData {
    label: string;
}

const rootNodeStyle = css`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #fff;
`;

const RootNode: FC<NodeProps<RootNodeData>> = ({ data }) => {
    return (
        <div css={rootNodeStyle}>
            <Handle type="target" position={Position.Left} />
            <div>{data.label}</div>
            <Handle type="source" position={Position.Right} />
        </div>
    );
};

export default RootNode;
