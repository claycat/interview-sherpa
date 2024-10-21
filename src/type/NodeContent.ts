import { CommentType } from 'component/modal/answer/CommentType';

export type NodeContent = {
    label: string;
    question: string;
    answers: string[];
    comments: CommentType[];
};
