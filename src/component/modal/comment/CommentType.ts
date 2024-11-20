export const CommentTypes = ['user', 'ai'] as const;

export const AIProviders = ['gpt-4o-mini', 'gpt3', 'gpt4', 'gpt4o'];

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

export interface AICommentType extends BaseCommentType {
    type: 'ai';
    provider: (typeof AIProviders)[number];
    score: number;
    good: string;
    bad: string;
    expected: string[];
    followup: string[];
}

export type CommentType = UserCommentType | AICommentType;
