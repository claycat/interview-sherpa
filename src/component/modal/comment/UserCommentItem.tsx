// UserCommentItem.tsx
import React from 'react';
import { UserCommentType } from './CommentType';
import CommonCommentContent from './CommonCommentContent';
import { PostCommentResponseDto } from './commentsApi';

interface CommentItemProps {
    comment: UserCommentType;
    addComment: (params: {
        content: string;
        memberId: string;
        parentId?: string | null;
    }) => Promise<PostCommentResponseDto>;
}

const UserCommentItem: React.FC<CommentItemProps> = ({ comment, addComment }) => {
    console.log('?');
    return <CommonCommentContent comment={comment} addComment={addComment}></CommonCommentContent>;
};

export default UserCommentItem;
