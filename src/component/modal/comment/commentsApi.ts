// src/api/commentsApi.ts
import apiClient from 'common/axios/axios';
import { ApiResponse } from 'common/types/ApiResponse';
import { UUID } from 'crypto';
import moment from 'moment';
import { CommentType } from './CommentType';

export interface GetCommentsResponseDto {
    comments: CommentType[];
}

export interface PostCommentResponseDto {
    commentId: UUID;
    memberId: UUID;
    nodeId: UUID;
    content: string;
    createdAt: string;
}
export const fetchComments = async (topicId: string, nodeId: string): Promise<CommentType[]> => {
    const response = await apiClient.get<ApiResponse<GetCommentsResponseDto>>(
        `/flows/${topicId}/nodes/${nodeId}/comments`,
    );

    const comments = response.data.data.comments;
    console.log(comments);
    const commentMap: { [key: string]: CommentType } = {};

    comments.forEach(comment => {
        commentMap[comment.id] = {
            ...comment,
            createdAt: moment(comment.createdAt).calendar(),
            replies: [],
        };
    });

    comments.forEach(comment => {
        if (comment.parentId) {
            const parent = commentMap[comment.parentId];
            if (parent) {
                parent.replies.push(commentMap[comment.id]);
            }
        }
    });

    const rootComments = comments
        .filter(comment => !comment.parentId)
        .map(comment => commentMap[comment.id]);

    return rootComments;
};

export const addComment = async (
    topicId: string,
    nodeId: string,
    content: string,
    question: string,
    memberId: string,
    parentId: string | null = null,
): Promise<PostCommentResponseDto> => {
    const response = await apiClient.post<ApiResponse<PostCommentResponseDto>>(
        `/flows/${topicId}/nodes/${nodeId}/comments`,
        {
            content,
            memberId,
            parentId,
            question,
            flowId: topicId,
        },
    );

    if (!response.data.success) {
        throw new Error('Failed to add comment');
    }

    return response.data.data;
};
