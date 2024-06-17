/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, TextField } from '@mui/material';
import EditableTextField from 'component/textfield/EditableTextField';
import React, { FC, useEffect, useState } from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    title: string;
    data: { label: string; question: string; answer: string };
    onUpdate: (newData: { label: string; question: string; answer: string }) => void;
}

const modalStyle = css`
    position: fixed;
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

const formStyle = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Modal: FC<ModalProps> = ({ show, onClose, title, data, onUpdate }) => {
    const [formData, setFormData] = useState(data);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(formData);
        onClose();
    };

    if (!show) return null;

    return (
        <>
            <div css={overlayStyle} onClick={onClose} />
            <div css={modalStyle}>
                <button css={closeButtonStyle} onClick={onClose}>
                    ×
                </button>
                <h2>{title}</h2>
                <form css={formStyle} onSubmit={handleSubmit}>
                    <TextField
                        label="Node Label"
                        value={formData.label}
                        onChange={e => setFormData({ ...formData, label: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Question"
                        value={formData.question}
                        onChange={e => setFormData({ ...formData, question: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Answer"
                        value={formData.answer}
                        onChange={e => setFormData({ ...formData, answer: e.target.value })}
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>

                    <EditableTextField />
                </form>
            </div>
        </>
    );
};

export default Modal;
