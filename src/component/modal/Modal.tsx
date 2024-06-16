/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { FC } from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const modalStyle = css`
    position: fixed;
    border-radius: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50vw;
    height: 50vh;
    background: white;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    overflow-y: auto;
`;

const overlayStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const closeButtonStyle = css`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
`;

const Modal: FC<ModalProps> = ({ show, onClose, title, children }) => {
    if (!show) return null;

    return (
        <>
            <div css={overlayStyle} onClick={onClose} />
            <div css={modalStyle}>
                <button css={closeButtonStyle} onClick={onClose}>
                    ×
                </button>
                <h2>{title}</h2>
                <div>{children}</div>
            </div>
        </>
    );
};

export default Modal;
