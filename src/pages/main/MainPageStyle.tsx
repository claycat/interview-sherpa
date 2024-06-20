import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import loginBg from '../../assets/image/mainpage.jpg';
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const SplitScreenContainer = styled.div`
    display: flex;
    height: 100vh;
`;

export const MainContainerLeft = styled.div`
    flex-grow: 1;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-image: url(${loginBg});
    background-size: cover;
    background-position: center;
    opacity: 0;
    padding-bottom: 100px;
    animation: ${fadeIn} 1s ease-in forwards;
`;

export const MainContainerRight = styled.div`
    width: 700px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

export const MainPageMainHeader = styled.div`
    font-size: 40px;
    color: white;
`;

export const MainPageSubHeader = styled.div`
    font-size: 24px;
    color: white;
`;
