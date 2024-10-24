import { CommentType } from 'component/modal/comment/CommentType';

export type NodeContent = {
    label: string;
    question: string;
    answers: string[];
    comments: CommentType[];
};
