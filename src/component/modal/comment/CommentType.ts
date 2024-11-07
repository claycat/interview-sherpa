export const CommentTypes = ['user', 'gpt'] as const;

export interface BaseCommentType {
    id: string;
    author: string;
    profileURL: string;
    content: string;
    parentId?: string | null;
    createdAt: string;
    replies: CommentType[];
    type: (typeof CommentTypes)[number];
}

export interface UserCommentType extends BaseCommentType {
    type: 'user';
}

export interface GptCommentType extends BaseCommentType {
    type: 'gpt';
    score: number;
    good: string;
    bad: string;
    expected: string[];
    followup: string[];
}

export type CommentType = UserCommentType | GptCommentType;
