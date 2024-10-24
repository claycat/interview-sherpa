export interface Reply {
    id: string;
    author: string;
    profileURL: string;
    parentId: string;
    content: string;
    createdAt: string;
}

export interface CommentType {
    id: string;
    author: string;
    profileURL: string;
    content: string;
    parentId?: string | null;
    createdAt: string;
    replies: Reply[];
}
