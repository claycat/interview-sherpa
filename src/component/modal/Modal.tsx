/** @jsxImportSource @emotion/react */
import EditableTextField from 'component/textfield/EditableTextField';
import React, { FC, useEffect, useState } from 'react';
import { NodeContent } from 'type/NodeContent';

import { useParams } from 'react-router-dom';
import { Node } from 'reactflow';
import { CloseButton, Form, ModalContainer, ModalOverlay, Title } from './Modal.styles';
import CommentSection from './comment/CommentSection';
import { useComments } from './hooks/useComments';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    data: Node<NodeContent>;
    onUpdate: (newData: NodeContent) => void;
}

const Modal: FC<ModalProps> = ({ show, onClose, data, onUpdate }) => {
    const nodeData = data.data;
    const nodeId = data.id;

    const { topic_id } = useParams<{ topic_id: string }>();
    const [label, setLabel] = useState(nodeData.label);
    const [question, setQuestion] = useState(nodeData.question);
    const [answers, setAnswers] = useState<string[]>(nodeData.answers);

    const { comments, isLoading, isError, error, addComment, addCommentStatus } = useComments({
        topicId: topic_id as string,
        nodeId,
    });

    useEffect(() => {
        setLabel(nodeData.label);
        setQuestion(nodeData.question);
        setAnswers(nodeData.answers);
    }, [nodeData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({
            label,
            question,
            answers,
            comments: [],
        });
        onClose();
    };

    if (!show) return null;

    return (
        <>
            <ModalOverlay onClick={onClose} />
            <ModalContainer>
                <CloseButton onClick={onClose} aria-label="Close Modal">
                    ×
                </CloseButton>
                <Form onSubmit={handleSubmit}>
                    <Title>Question</Title>
                    <EditableTextField
                        text={question}
                        setText={setQuestion}
                        data={data}
                        onUpdate={onUpdate}
                    />
                    <CommentSection
                        question={question}
                        comments={comments ?? []}
                        addComment={addComment}
                        nodeId={nodeId}
                    />
                </Form>
            </ModalContainer>
        </>
    );
};

export default Modal;
