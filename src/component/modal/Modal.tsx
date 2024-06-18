/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@mui/material';
import EditableTextField from 'component/textfield/EditableTextField';
import React, { FC, useEffect, useState } from 'react';
import { NodeContent } from 'type/NodeContent';
import AnswersList from './AnswerList';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    data: NodeContent;
    onUpdate: (newData: NodeContent) => void;
}

const modalStyle = css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70vw;
    height: 70vh;
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
    font-size: 32px;
    cursor: pointer;
`;

const formStyle = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const titleStyle = css`
    text-align: center;
`;

const Modal: FC<ModalProps> = ({ show, onClose, data, onUpdate }) => {
    const [label, setLabel] = useState(data.label);
    const [question, setQuestion] = useState(data.question);
    const [answers, setAnswers] = useState<string[]>(data.answer);

    useEffect(() => {
        setLabel(data.label);
        setQuestion(data.question);
        setAnswers(data.answer);
    }, [data]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({ label, question, answer: answers });
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
                <form css={formStyle} onSubmit={handleSubmit}>
                    <h2 css={titleStyle}>Question</h2>
                    <EditableTextField text={question} setText={setQuestion} />

                    <h2 css={titleStyle}>Answers</h2>
                    <AnswersList answers={answers} setAnswers={setAnswers} />
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </div>
        </>
    );
};

export default Modal;
