// CommentItem.tsx
import React from 'react';
import { AddCommentFunction } from './CommentSection';
import { AICommentContent, AICommentType, CommentType } from './CommentType';
import GptCommentItem from './GptCommentItem';
import UserCommentItem from './UserCommentItem';

interface CommentItemProps {
    comment: CommentType;
    question: string;
    addComment: AddCommentFunction;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, addComment, question }) => {
    switch (comment.type) {
        case 'USER':
            return (
                <UserCommentItem comment={comment} question={question} addComment={addComment} />
            );
        case 'AI':
            const aiCommentContent: AICommentContent = JSON.parse(comment.content);
            const aiComment: AICommentType = { ...comment, ...aiCommentContent };
            return (
                <GptCommentItem comment={aiComment} question={question} addComment={addComment} />
            );
        default:
            return null;
    }
};

export default CommentItem;
