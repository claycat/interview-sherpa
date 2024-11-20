// CommentItem.tsx
import React from 'react';
import { AddCommentFunction } from './CommentSection';
import { CommentType } from './CommentType';
import GptCommentItem from './GptCommentItem';
import UserCommentItem from './UserCommentItem';

interface CommentItemProps {
    comment: CommentType;
    question: string;
    addComment: AddCommentFunction;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, addComment, question }) => {
    switch (comment.type) {
        case 'user':
            return (
                <UserCommentItem comment={comment} question={question} addComment={addComment} />
            );
        case 'ai':
            return <GptCommentItem comment={comment} question={question} addComment={addComment} />;
        default:
            return null; // Or handle unknown types appropriately
    }
};

export default CommentItem;
