// HeaderModal.tsx

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal as MUIModal, Slide } from '@mui/material';
import SaveModal from 'component/modal/TopicHeaderSaveModal';
import ShareModal from 'component/modal/TopicHeaderShareModal';
import React from 'react';

const modalStyle = {
    width: { xs: '90%', sm: 450 },
    bgcolor: 'background.paper',
    borderRadius: '4px',
    p: 4,
    outline: 'none',
    position: 'relative',
};

interface HeaderModalProps {
    open: boolean;
    onClose: () => void;
    modalType: 'save' | 'share' | null;
}

const TopicHeaderModal: React.FC<HeaderModalProps> = ({ open, onClose, modalType }) => (
    <MUIModal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        closeAfterTransition
    >
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
            }}
        >
            <Slide direction="down" in={open} mountOnEnter unmountOnExit timeout={600}>
                <Box sx={modalStyle}>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {modalType === 'save' && <SaveModal onClose={onClose} />}
                    {modalType === 'share' && <ShareModal onClose={onClose} />}
                </Box>
            </Slide>
        </Box>
    </MUIModal>
);

export default TopicHeaderModal;
