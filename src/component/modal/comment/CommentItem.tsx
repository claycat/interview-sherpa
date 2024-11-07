import { Collapse } from '@mui/material';
import React, { useState } from 'react';
import { Button, Comment, Form } from 'semantic-ui-react';
import { authStore } from 'state/authStore';
import ExpandableText from '../ExpandableText';
import { PostCommentResponseDto } from './commentsApi';
import { CommentType } from './CommentType';

interface CommentItemProps {
    comment: CommentType;
    addComment: (params: {
        content: string;
        memberId: string;
        parentId?: string | null;
    }) => Promise<PostCommentResponseDto>;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, addComment }) => {
    const [replyContent, setReplyContent] = useState<string>('');
    const [replyVisible, setReplyVisible] = useState<boolean>(false);
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const userId = authStore.getState().user?.id;

    const handleAddReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) {
            alert('Please login to add a comment');
            return;
        }
        if (replyContent.trim() === '') return;
        try {
            await addComment({
                content: replyContent,
                memberId: userId,
                parentId: comment.id,
            });
            setReplyContent('');
            setReplyVisible(false);
        } catch (err) {
            console.error('Failed to add reply:', err);
            alert('Failed to add reply. Please try again.');
        }
    };

    return (
        <Comment>
            <Comment.Avatar src={comment.profileURL} />
            <Comment.Content>
                <Comment.Author as="a">{comment.author}</Comment.Author>
                <Comment.Metadata>
                    <span>{comment.createdAt}</span>
                </Comment.Metadata>
                <Comment.Text>
                    <ExpandableText text={comment.content} maxLength={100} />
                </Comment.Text>
                <Comment.Actions>
                    <Comment.Action onClick={() => setReplyVisible(!replyVisible)}>
                        Reply
                    </Comment.Action>
                    {comment.replies.length > 0 && (
                        <Comment.Action onClick={() => setCollapsed(!collapsed)}>
                            {collapsed ? `Expand (${comment.replies.length} replies)` : 'Collapse'}
                        </Comment.Action>
                    )}
                </Comment.Actions>
                {replyVisible && (
                    <Form reply>
                        <Form.TextArea
                            value={replyContent}
                            onChange={e => setReplyContent(e.target.value)}
                            placeholder="Add a reply..."
                        />
                        <Button
                            onClick={handleAddReply}
                            content="Add Reply"
                            labelPosition="left"
                            icon="edit"
                            primary
                            type="submit"
                        />
                    </Form>
                )}
                <Collapse
                    in={!collapsed && comment.replies.length > 0}
                    timeout="auto"
                    unmountOnExit
                >
                    <Comment.Group>
                        {comment.replies.map(reply => (
                            <CommentItem key={reply.id} comment={reply} addComment={addComment} />
                        ))}
                    </Comment.Group>
                </Collapse>
            </Comment.Content>
        </Comment>
    );
};

export default CommentItem;
