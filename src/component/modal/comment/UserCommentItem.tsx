// UserCommentItem.tsx
import React from 'react';
import { AddCommentFunction } from './CommentSection';
import { UserCommentType } from './CommentType';
import CommonCommentContent from './CommonCommentContent';

interface CommentItemProps {
    comment: UserCommentType;
    question: string;
    addComment: AddCommentFunction;
}

const UserCommentItem: React.FC<CommentItemProps> = ({ comment, addComment, question }) => {
    return (
        <CommonCommentContent
            comment={comment}
            question={question}
            addComment={addComment}
        ></CommonCommentContent>
    );
};

export default UserCommentItem;
