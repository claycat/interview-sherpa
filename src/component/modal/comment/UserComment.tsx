// DefaultComment.tsx
import React from 'react';
import { Comment } from 'semantic-ui-react';
import { CommentType } from './CommentType';

interface UserCommentProps {
    comment: CommentType;
    addComment: (params: {
        content: string;
        memberId: string;
        parentId?: string | null;
    }) => Promise<any>;
}

const UserComment: React.FC<UserCommentProps> = ({ comment, addComment }) => {
    return (
        <Comment>
            <Comment.Avatar src={comment.profileURL} />
            <Comment.Content>
                <Comment.Author as="a">{comment.author}</Comment.Author>
                <Comment.Metadata>
                    <div>{new Date(comment.createdAt).toLocaleString()}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.content}</Comment.Text>
                <Comment.Actions>{/* Add actions like Reply here */}</Comment.Actions>
                {comment.replies.length > 0 && (
                    <Comment.Group>
                        {comment.replies.map(reply => (
                            <UserComment key={reply.id} comment={reply} addComment={addComment} />
                        ))}
                    </Comment.Group>
                )}
            </Comment.Content>
        </Comment>
    );
};

export default UserComment;
