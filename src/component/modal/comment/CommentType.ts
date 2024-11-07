export const CommentType = ['user', 'gpt'] as const;

export interface CommentType {
    id: string;
    author: string;
    profileURL: string;
    content: string;
    parentId?: string | null;
    createdAt: string;
    replies: CommentType[];
    type?: (typeof CommentType)[number];
}
export interface GptCommentType extends CommentType {
    type: 'gpt';
    score: number;
    good: string;
    bad: string;
    expected: string[];
    followup: string[];
}
