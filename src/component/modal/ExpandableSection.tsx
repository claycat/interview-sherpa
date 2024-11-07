// ExpandableSection.tsx
import { Collapse } from '@mui/material';
import React, { useState } from 'react';

interface ExpandableSectionProps {
    collapsedContent: React.ReactNode;
    expandedContent: React.ReactNode;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
    collapsedContent,
    expandedContent,
}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleExpansion = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <div>
            <div>{collapsedContent}</div>

            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <div>{expandedContent}</div>
            </Collapse>

            <div
                onClick={toggleExpansion}
                style={{
                    color: 'rgba(0,0,0,.4)',
                    cursor: 'pointer',
                    marginTop: '5px',
                    fontSize: '0.8rem',
                }}
            >
                {isExpanded ? 'Show less' : 'Read more'}
            </div>
        </div>
    );
};

export default ExpandableSection;
