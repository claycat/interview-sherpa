// GptComment.tsx
import React from 'react';
import { Comment, Label } from 'semantic-ui-react';
import CommentItem from './CommentItem';
import { GptCommentType } from './CommentType';

interface GptCommentProps {
    comment: GptCommentType;
    addComment: (params: {
        content: string;
        memberId: string;
        parentId?: string | null;
    }) => Promise<any>;
}

const GptComment: React.FC<GptCommentProps> = ({ comment, addComment }) => {
    return (
        <Comment>
            <Comment.Avatar src={comment.profileURL} />
            <Comment.Content>
                <Comment.Author as="a">
                    {comment.author} <Label color="blue">AI</Label>
                </Comment.Author>
                <Comment.Metadata>
                    <div>{new Date(comment.createdAt).toLocaleString()}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.content}</Comment.Text>
                <div
                    style={{
                        backgroundColor: '#f4f4f4',
                        padding: '10px',
                        borderRadius: '5px',
                        marginTop: '10px',
                    }}
                >
                    <strong>Score:</strong> {comment.score}/10
                    <p>
                        <strong>Good:</strong> {comment.good}
                    </p>
                    <p>
                        <strong>Bad:</strong> {comment.bad}
                    </p>
                    <p>
                        <strong>Expected:</strong> {comment.expected.join(', ')}
                    </p>
                    <p>
                        <strong>Follow-up:</strong> {comment.followup.join(', ')}
                    </p>
                </div>
                <Comment.Actions>{/* Add actions like Reply here */}</Comment.Actions>
                {comment.replies.length > 0 && (
                    <Comment.Group>
                        {comment.replies.map(reply => (
                            // Assuming replies can be of any type, use a parent component to handle
                            <CommentItem key={reply.id} comment={reply} addComment={addComment} />
                        ))}
                    </Comment.Group>
                )}
            </Comment.Content>
        </Comment>
    );
};

export default GptComment;
