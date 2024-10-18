import { Box, Button, Typography } from '@mui/material';
import React from 'react';

interface ShareModalProps {
    onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ onClose }) => {
    return (
        <>
            <Typography variant="h6" component="h2">
                Share Topic
            </Typography>
            <Typography sx={{ mt: 2 }}>
                Enter the email address to share this topic with:
            </Typography>
            <Box sx={{ mt: 2 }}>
                <input
                    type="email"
                    placeholder="Email Address"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                />
            </Box>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        // Perform share operation here
                        console.log('Shared with email');
                        onClose();
                    }}
                    color="primary"
                    variant="contained"
                >
                    Share
                </Button>
            </Box>
        </>
    );
};

export default ShareModal;
