// SocialLoginButtons.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Button, Divider } from '@mui/material';
import GoogleIcon from 'assets/icons/GoogleIcon';
import { handleOAuthGoogle } from './loginHandler';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
`;

const LoginContainer = styled.div`
    background: white;
    padding: 30px;
    padding-bottom: 60px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    width: 100%;
    text-align: center;
`;

const googleButtonStyle = css`
    border: none; /* No border */
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
    border-radius: 10px;
    height: 25%;
`;

const buttonStyle = css`
    margin-top: 10px;
    width: 100%;
    border-radius: 10px;
    height: 25%;
    font-size: 20px;
    text-transform: none;
`;

const LoginHeader = styled.h2`
    font-size: 2vw;
    font-weight: 300;
    margin-bottom: 20px;
`;

const SocialLoginButtons: React.FC = () => {
    return (
        <Container>
            <LoginContainer>
                <LoginHeader>Sign In / Register</LoginHeader>
                <Divider style={{ marginBottom: '30px' }} />
                <Button
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    style={{ fontSize: '1.3vw' }}
                    css={[buttonStyle, googleButtonStyle]}
                    onClick={() => handleOAuthGoogle()}
                >
                    Continue with Google
                </Button>
                <Button
                    variant="contained"
                    startIcon={<GitHubIcon />}
                    css={buttonStyle}
                    style={{ backgroundColor: '#000000', color: 'white', fontSize: '1.3vw' }}
                >
                    Continue with Github
                </Button>
            </LoginContainer>
        </Container>
    );
};

export default SocialLoginButtons;
