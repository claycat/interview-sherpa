import styled from '@emotion/styled';
import { useState } from 'react';
import { EdgeLabelRenderer, EdgeProps, getBezierPath, useReactFlow } from 'reactflow';

// Styled component for the edge button
const StyledButton = styled.button`
    width: 20px;
    height: 20px;
    background: #eee;
    border: 1px solid #fff;
    cursor: pointer;
    opacity: 0.8;
    border-radius: 50%;
    font-size: 12px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.08);
    }
`;

export default function DeletableEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}: EdgeProps) {
    const { setEdges } = useReactFlow();
    const [isEdgeHovered, setIsEdgeHovered] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    const isHovered = isEdgeHovered || isButtonHovered;

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const onEdgeClick = () => {
        setEdges(edges => edges.filter(edge => edge.id !== id));
    };

    const handleEdgeMouseEnter = () => setIsEdgeHovered(true);
    const handleEdgeMouseLeave = () => setIsEdgeHovered(false);

    const handleButtonMouseEnter = () => setIsButtonHovered(true);
    const handleButtonMouseLeave = () => setIsButtonHovered(false);

    const hoverStrokeWidth = 10; // Adjust as needed for desired hover area

    return (
        <>
            {/* Visible edge path */}
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
                pointerEvents="none"
            />

            <path
                d={edgePath}
                stroke="transparent"
                strokeWidth={hoverStrokeWidth}
                fill="none"
                onMouseEnter={handleEdgeMouseEnter}
                onMouseLeave={handleEdgeMouseLeave}
                style={{ cursor: 'pointer' }}
            />

            {isHovered && (
                <EdgeLabelRenderer>
                    <div
                        style={{
                            position: 'absolute',
                            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                            fontSize: 12,
                            pointerEvents: 'all',
                        }}
                        className="nodrag nopan"
                        onMouseEnter={handleButtonMouseEnter}
                        onMouseLeave={handleButtonMouseLeave}
                    >
                        <StyledButton onClick={onEdgeClick}>×</StyledButton>
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
}
