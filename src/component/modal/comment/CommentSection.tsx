import { Collapse } from '@mui/material';
import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Checkbox, Comment, Form, Header } from 'semantic-ui-react';
import { authStore } from 'state/authStore';
import CommentItem from './CommentItem';
import { CommentType } from './CommentType';
import { SubmitCommentButtons } from './SubmitCommentButtons';
import { PostCommentResponseDto } from './commentsApi';
export interface AddCommentParams {
    content: string;
    question: string;
    memberId: string;
    parentId?: string | null;
    requestAIEvaluation: boolean;
}

export type AddCommentFunction = (params: AddCommentParams) => Promise<PostCommentResponseDto>;

interface CommentSectionProps {
    nodeId: string;
    comments: CommentType[];
    question: string;
    addComment: AddCommentFunction;
}

const CommentSection: React.FC<CommentSectionProps> = ({
    nodeId,
    comments,
    addComment,
    question,
}) => {
    const [newComment, setNewComment] = useState<string>('');
    const [commentsVisible, setCommentsVisible] = useState<boolean>(true);
    const userId = authStore.getState().user?.id;

    const handleAddComment = async (e: React.FormEvent, requestAIEvaluation: boolean) => {
        e.preventDefault();
        if (!userId) {
            alert('Please login to add a comment');
            return;
        }
        if (newComment.trim() === '') return;
        try {
            await addComment({
                content: newComment,
                memberId: userId,
                question,
                requestAIEvaluation,
            });
            setNewComment('');
        } catch (err) {
            console.error('Failed to add comment:', err);
            alert('Failed to add comment. Please try again.');
        }
    };

    const toggleCommentsVisibility = () => {
        setCommentsVisible(prev => !prev);
    };

    return (
        <Comment.Group style={{ maxWidth: '100%', margin: '0' }}>
            <Header as="h3" dividing>
                Comments
            </Header>

            <Checkbox
                onClick={toggleCommentsVisibility}
                toggle
                label={commentsVisible ? 'Hide Comments' : 'Show Comments'}
            />

            <Collapse in={commentsVisible} timeout="auto" unmountOnExit sx={{ marginTop: '15px' }}>
                <>
                    {comments.map(comment => (
                        <CommentItem
                            question={question}
                            key={comment.id}
                            comment={comment}
                            addComment={addComment}
                        />
                    ))}
                </>
            </Collapse>

            <Form reply>
                <Form.TextArea
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <SubmitCommentButtons handleAddComment={handleAddComment} />
            </Form>
        </Comment.Group>
    );
};

export default CommentSection;
