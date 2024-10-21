import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import { authStore } from 'state/authStore';
import { CommentType } from './CommentType';
import { PostCommentResponseDto } from './commentsApi';

interface CommentSectionProps {
    nodeId: string;
    comments: CommentType[];
    addComment: (params: {
        content: string;
        memberId: string;
        parentId?: string | null;
    }) => Promise<PostCommentResponseDto>;
}

const CommentSection: React.FC<CommentSectionProps> = ({ nodeId, comments, addComment }) => {
    const [newComment, setNewComment] = useState<string>('');
    const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({});
    const [replyVisible, setReplyVisible] = useState<{ [key: string]: boolean }>({});
    const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});
    const userId = authStore.getState().user?.id;

    useEffect(() => {
        if (comments) {
            const initialCollapsed: { [key: string]: boolean } = {};
            comments.forEach(comment => {
                initialCollapsed[comment.id] = true;
            });
            setCollapsed(initialCollapsed);
        }
    }, [comments]);

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) {
            alert('Please login to add a comment');
            return;
        }
        if (newComment.trim() === '') return;
        try {
            await addComment({ content: newComment, memberId: userId });
            setNewComment('');
        } catch (err) {
            console.error('Failed to add comment:', err);
            alert('Failed to add comment. Please try again.');
        }
    };

    // Handle adding a reply to a comment
    const handleAddReply = async (e: React.FormEvent, commentId: string) => {
        e.preventDefault();
        if (!userId) {
            alert('Please login to add a comment');
            return;
        }
        if (replyContent[commentId]?.trim() === '') return;
        try {
            await addComment({
                content: replyContent[commentId],
                memberId: userId,
                parentId: commentId,
            });
            setReplyContent(prev => ({ ...prev, [commentId]: '' }));
            setReplyVisible(prev => ({ ...prev, [commentId]: false }));
        } catch (err) {
            console.error('Failed to add reply:', err);
            alert('Failed to add reply. Please try again.');
        }
    };

    const toggleReplyVisibility = (commentId: string) => {
        setReplyVisible(prev => ({ ...prev, [commentId]: !prev[commentId] }));
    };

    const toggleCollapse = (commentId: string) => {
        setCollapsed(prev => ({ ...prev, [commentId]: !prev[commentId] }));
    };

    return (
        <Comment.Group>
            <Header as="h3" dividing>
                Comments
            </Header>

            {comments.map(comment => (
                <Comment key={comment.id}>
                    <Comment.Avatar src={comment.profileURL} />
                    <Comment.Content>
                        <Comment.Author as="a">{comment.author}</Comment.Author>
                        <Comment.Metadata>
                            <span>{comment.createdAt}</span>
                        </Comment.Metadata>
                        <Comment.Text>
                            {!collapsed[comment.id] ? comment.content : '...'}
                        </Comment.Text>
                        <Comment.Actions>
                            <Comment.Action onClick={() => toggleReplyVisibility(comment.id)}>
                                Reply
                            </Comment.Action>
                            <Comment.Action onClick={() => toggleCollapse(comment.id)}>
                                {collapsed[comment.id]
                                    ? `Expand (${comment.replies.length} replies)`
                                    : 'Collapse'}
                            </Comment.Action>
                        </Comment.Actions>

                        {!collapsed[comment.id] && replyVisible[comment.id] && (
                            <Form reply>
                                <Form.TextArea
                                    value={replyContent[comment.id] || ''}
                                    onChange={e =>
                                        setReplyContent(prev => ({
                                            ...prev,
                                            [comment.id]: e.target.value,
                                        }))
                                    }
                                    placeholder="Add a reply..."
                                />
                                <Button
                                    onClick={e => handleAddReply(e, comment.id)}
                                    content="Add Reply"
                                    labelPosition="left"
                                    icon="edit"
                                    primary
                                    type="submit"
                                />
                            </Form>
                        )}

                        {!collapsed[comment.id] &&
                            comment.replies &&
                            comment.replies.length > 0 && (
                                <Comment.Group>
                                    {comment.replies.map(reply => (
                                        <Comment key={reply.id}>
                                            <Comment.Avatar src={reply.profileURL} />
                                            <Comment.Content>
                                                <Comment.Author as="a">
                                                    {reply.author}
                                                </Comment.Author>
                                                <Comment.Metadata>
                                                    <span>{reply.createdAt}</span>
                                                </Comment.Metadata>
                                                <Comment.Text>{reply.content}</Comment.Text>
                                            </Comment.Content>
                                        </Comment>
                                    ))}
                                </Comment.Group>
                            )}
                    </Comment.Content>
                </Comment>
            ))}

            <Form reply>
                <Form.TextArea
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <Button
                    onClick={handleAddComment}
                    content="Add Comment"
                    labelPosition="left"
                    icon="edit"
                    primary
                    type="submit"
                />
            </Form>
        </Comment.Group>
    );
};

export default CommentSection;
