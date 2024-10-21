import styled from '@emotion/styled';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

export const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 70vh;
    width: calc(30vw + 200px);
    background: white;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    overflow-y: auto;

    @media (max-width: 1200px) {
        width: calc(40vw + 200px);
    }

    @media (max-width: 800px) {
        width: calc(50vw + 100px);
    }

    @media (max-width: 600px) {
        width: 70vw;
    }
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 32px;
    cursor: pointer;

    &:hover {
        color: #ff0000; /* Optional: Change color on hover for better visibility */
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Title = styled.h3`
    text-align: center;
    font-family: 'Open Sans', sans-serif;
`;

export const Subtitle = styled.h4`
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    margin: 20px 0px 0px 0px;
`;
