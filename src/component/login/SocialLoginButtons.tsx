// SocialLoginButtons.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Button } from '@mui/material';
import GoogleIcon from 'assets/icons/GoogleIcon';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const LoginContainer = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
`;

const googleButtonStyle = css`
    border: none; /* No border */
    color: rgba(0, 0, 0, 0.54);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
    font-size: 24px;
    margin-bottom: 20px;
`;

const SocialLoginButtons: React.FC = () => {
    return (
        <Container>
            <LoginContainer>
                <LoginHeader>Login</LoginHeader>
                <Button
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    css={[buttonStyle, googleButtonStyle]}
                >
                    Continue with Google
                </Button>
                <Button
                    variant="contained"
                    startIcon={<GitHubIcon />}
                    css={buttonStyle}
                    style={{ backgroundColor: '#000000', color: 'white' }}
                >
                    Continue with Github
                </Button>
            </LoginContainer>
        </Container>
    );
};

export default SocialLoginButtons;
