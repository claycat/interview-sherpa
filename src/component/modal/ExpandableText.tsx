import React, { useState } from 'react';

interface ExpandableTextProps {
    text: string;
    maxLength: number;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text, maxLength }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    if (text.length <= maxLength) {
        return <span>{text}</span>;
    }

    return (
        <>
            {isExpanded ? text : `${text.substring(0, maxLength)}...`}
            <span
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    color: 'rgba(0,0,0,.4)',
                    cursor: 'pointer',
                    marginLeft: '5px',
                    fontSize: '0.8rem',
                }}
            >
                {isExpanded ? 'Show less' : 'Read more'}
            </span>
        </>
    );
};

export default ExpandableText;
