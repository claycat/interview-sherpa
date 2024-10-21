/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { TiDeleteOutline } from 'react-icons/ti';
import { Handle, NodeProps, NodeResizer, Position } from 'reactflow';

import { FiEdit } from 'react-icons/fi';
import { NodeContent } from 'type/NodeContent';
interface CustomNodeData extends NodeContent {
    onAddNode: (position: Position) => void;
    setIsModalOpen: (open: boolean) => void;
    isModalOpen: boolean;
}

const customNodeStyle = css`
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #fff;
    position: relative;
    font-size: 0.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 80px;
    min-height: 40px;
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

const labelStyle = css`
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    width: 100%;
    text-align: center;
`;
const handleStyle = css`
    width: 12px;
    height: 12px;
    background: #555;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: #000;
    }
`;

const CustomNode: FC<NodeProps<CustomNodeData>> = ({ data, selected }) => {
    const [hover, setHover] = useState(false);

    const handleDoubleClick = () => {
        data.setIsModalOpen(true);
    };

    return (
        <div
            onDoubleClick={() => handleDoubleClick()}
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
            <Handle type="source" position={Position.Left} id="handle-left" />
            <div css={labelStyle}>{data.question}</div>
            <Handle type="source" position={Position.Right} id="handle-right" />
        </div>
    );
};

export default CustomNode;
