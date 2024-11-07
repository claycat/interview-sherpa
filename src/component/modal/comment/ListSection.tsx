import { Chip } from '@mui/material';
import React from 'react';

interface ListSectionProps {
    label: string;
    icon: any;
    items: string[];
}

const ListSection: React.FC<ListSectionProps> = ({ label, icon, items }) => {
    if (!items || items.length === 0) return null;

    return (
        <div>
            <Chip label={label} variant="outlined" size="small" icon={icon} />
            <ul style={{ marginTop: '5px', paddingLeft: '20px', marginBottom: '0' }}>
                {items.map((item, index) => (
                    <li key={index} style={{ marginBottom: '4px' }}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListSection;
