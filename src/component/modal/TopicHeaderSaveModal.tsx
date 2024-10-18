import styled from '@emotion/styled';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Button, Divider, Typography, css } from '@mui/material';
import GoogleIcon from 'assets/icons/GoogleIcon';
import { handleOAuthGoogle } from 'component/login/loginHandler';
import React from 'react';
import { useReactFlow } from 'reactflow';
/** @jsxImportSource @emotion/react */
interface SaveModalProps {
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

const SaveModal: React.FC<SaveModalProps> = ({ onClose }) => {
    const rf = useReactFlow();

    return (
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
    );
};

export default SaveModal;
