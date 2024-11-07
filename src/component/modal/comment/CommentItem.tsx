// CommentItem.tsx
import React from 'react';
import { CommentType } from './CommentType';
import GptCommentItem from './GptCommentItem';
import UserCommentItem from './UserCommentItem';
import { PostCommentResponseDto } from './commentsApi';

interface CommentItemProps {
    comment: CommentType;
    addComment: (params: {
        content: string;
        memberId: string;
        parentId?: string | null;
    }) => Promise<PostCommentResponseDto>;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, addComment }) => {
    switch (comment.type) {
        case 'user':
            return <UserCommentItem comment={comment} addComment={addComment} />;
        case 'gpt':
            return <GptCommentItem comment={comment} addComment={addComment} />;
        default:
            return null; // Or handle unknown types appropriately
    }
};

export default CommentItem;
