import styled from '@emotion/styled';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Button, Divider, Typography, css } from '@mui/material';
import GoogleIcon from 'assets/icons/GoogleIcon';
import { handleOAuthGoogle } from 'component/login/loginHandler';
import React from 'react';
import { useReactFlow } from 'reactflow';
import { Modal } from 'semantic-ui-react';
/** @jsxImportSource @emotion/react */

interface SaveModalProps {
    open: boolean;
    onClose: () => void;
}

const StyledTypography = styled(Typography)({
    whiteSpace: 'pre-line',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: 550,
    fontStretch: 'normal',
    fontFamily: 'Open Sans',
});

const boxStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'center',
    padding: '16px',
    minHeight: '150px',
    gap: '16px',
};

const googleButtonStyle = css`
    border: none;
    color: rgba(0, 0, 0, 0.54);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    &:hover {
        background-color: rgba(0, 0, 0, 0);
        color: rgba(0, 0, 0, 0.87);
        border: none;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
    width: 100%;
    font-size: 20px;
    border-radius: 5px;
    height: 25%;
`;

const buttonStyle = css`
    margin-top: 10px;
    width: 100%;
    border-radius: 5px;
    height: 25%;
    font-size: 12px;
    padding: 6px;
    text-transform: none;
`;

const LoginContainer = styled.div`
    width: 65%;
`;
const slideDownAnimation = css`
    @keyframes slideDown {
        0% {
            transform: translateY(-100%);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

const AnimatedModal = styled(Modal)`
    ${slideDownAnimation};
    &.ui.modal {
        animation: slideDown 0.5s ease-out;
    }
`;

const CustomStyledModal = styled(AnimatedModal)`
    &.ui.modal {
        position: relative; /* Make it relative to position the close icon */
    }

    .close.icon {
        position: absolute;
        top: 10px; /* Adjust as needed to place inside */
        right: 10px; /* Adjust as needed to place inside */
        z-index: 10; /* Ensure it stays on top */
        color: #333; /* Change the color to a dark gray or any color that fits */
        &:hover {
            color: #000; /* Optionally, make it darker or a different color when hovered */
        }
    }
`;
const SaveModal: React.FC<SaveModalProps> = ({ open, onClose }) => {
    const rf = useReactFlow();

    return (
        <CustomStyledModal
            open={open}
            onClose={onClose}
            size="tiny"
            dimmer="dimmed"
            closeIcon
            transition={{
                animation: 'slide down',
                duration: 500,
            }}
            closeOnDimmerClick={false}
        >
            <Modal.Content>
                <Box sx={boxStyles}>
                    <StyledTypography>Please login to save your content</StyledTypography>
                    <Divider sx={{ width: '50%', marginTop: '5px', marginBottom: '-10px' }} />
                    <LoginContainer>
                        <Button
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            style={{ fontSize: '12px', fontFamily: 'Roboto,sans-serif' }}
                            css={[buttonStyle, googleButtonStyle]}
                            onClick={() => handleOAuthGoogle(onClose, rf)}
                        >
                            Continue with Google
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<GitHubIcon />}
                            css={buttonStyle}
                            style={{
                                backgroundColor: '#000000',
                                color: 'white',
                                fontSize: '12px',
                                fontFamily: 'Roboto,sans-serif',
                            }}
                        >
                            Continue with Github
                        </Button>
                    </LoginContainer>
                </Box>
            </Modal.Content>
        </CustomStyledModal>
    );
};

export default SaveModal;
