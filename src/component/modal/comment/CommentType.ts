export const CommentTypes = ['USER', 'AI'] as const;

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
    type: 'USER';
}

export interface AICommentContent {
    score: number;
    goodAspects: string;
    badAspects: string;
    expected: string[];
    followUp: string[];
}

export interface AICommentType extends BaseCommentType, AICommentContent {
    type: 'AI';
    provider: (typeof AIProviders)[number];
}

export type CommentType = UserCommentType | AICommentType;
