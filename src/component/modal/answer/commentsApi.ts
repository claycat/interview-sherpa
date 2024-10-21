// src/api/commentsApi.ts
import apiClient from 'common/axios/axios';
import { ApiResponse } from 'common/types/ApiResponse';
import { UUID } from 'crypto';
import moment from 'moment';
import { CommentType, Reply } from './CommentType';

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
        `/flow/${topicId}/node/${nodeId}/comments`,
    );

    const comments = response.data.data.comments;
    const commentMap: { [key: string]: CommentType } = {};
    const rootComments: CommentType[] = [];

    try {
        comments.forEach(comment => {
            commentMap[comment.id] = {
                id: comment.id,
                author: comment.author,
                profileURL: comment.profileURL,
                content: comment.content,
                createdAt: moment(comment.createdAt).calendar(),
                parentId: comment.parentId ?? null,
                replies: [],
            };
        });
        comments.forEach(comment => {
            if (comment.parentId) {
                const parent = commentMap[comment.parentId];
                if (parent) {
                    const reply: Reply = {
                        id: comment.id,
                        author: comment.author,
                        profileURL: comment.profileURL,
                        content: comment.content,
                        createdAt: moment(comment.createdAt).calendar(),
                        parentId: comment.parentId,
                    };
                    parent.replies.push(reply);
                } else {
                    rootComments.push(commentMap[comment.id]);
                }
            } else {
                rootComments.push(commentMap[comment.id]);
            }
        });
    } catch (e) {
        console.log(e);
    }

    return rootComments;
};

export const addComment = async (
    topicId: string,
    nodeId: string,
    content: string,
    memberId: string,
    parentId: string | null = null,
): Promise<PostCommentResponseDto> => {
    const response = await apiClient.post<ApiResponse<PostCommentResponseDto>>(
        `/flow/${topicId}/node/${nodeId}/comments`,
        {
            content,
            memberId,
            parentId,
        },
    );

    if (!response.data.success) {
        throw new Error('Failed to add comment');
    }

    return response.data.data;
};
