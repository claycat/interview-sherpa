/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { TiDeleteOutline } from 'react-icons/ti';
import { Handle, NodeProps, NodeResizer, Position } from 'reactflow';

import { FiEdit } from 'react-icons/fi';
interface CustomNodeData {
    label: string;
    onAddNode: (position: Position) => void;
    setIsModalOpen: (open: boolean) => void;
    isModalOpen: boolean;
}

const customNodeStyle = css`
    border: 1px solid #ddd;
    border-radius: 15px;
    background: #fff;
    position: relative;
    font-size: 0.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const iconsContainerStyle = css`
    position: absolute;
    top: -12px;
    display: flex;
    gap: 5px;
    opacity: 0;
    cursor: pointer;
    transition: opacity 0.2s;
`;

const showIconsStyle = css`
    opacity: 1;
`;

const iconStyle = css`
    font-size: 1.2em;
`;

const CustomNode: FC<NodeProps<CustomNodeData>> = ({ data, selected }) => {
    const [hover, setHover] = useState(false);

    return (
        <div
            css={customNodeStyle}
            style={{ width: '100%', height: '100%' }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div css={[iconsContainerStyle, hover && showIconsStyle]}>
                <IoEyeOutline css={iconStyle} />
                <FiEdit css={iconStyle} onClick={() => data.setIsModalOpen(true)} />
                <TiDeleteOutline css={iconStyle} />
            </div>
            <NodeResizer color="#ff0071" isVisible={selected} minWidth={50} minHeight={30} />
            <Handle
                type="target"
                position={Position.Left}
                onClick={event => {
                    event.stopPropagation();
                    data.onAddNode(Position.Left);
                }}
                style={{ cursor: 'pointer' }}
            />
            <div style={{ padding: 10 }}>{data.label}</div>
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
