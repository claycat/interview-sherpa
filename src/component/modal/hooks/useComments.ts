import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AICommentType, CommentType } from '../comment/CommentType';
import { PostCommentResponseDto, addComment, fetchComments } from '../comment/commentsApi';

interface UseCommentsProps {
    topicId: string;
    nodeId: string;
    token?: string;
}

const initialTestComments: CommentType[] = [
    {
        id: '1',
        author: 'Test User',
        profileURL: 'https://ui-avatars.com/api/?background=random',
        content:
            'This is a test comment.This is a test comment.This is a test comment.This is a test comment.This is a test comment.This is a test comment.This is a test comment.',
        parentId: null,
        createdAt: new Date().toISOString(),
        replies: [],
        type: 'USER',
    },
    {
        id: '2',
        author: 'Another User',
        profileURL: 'https://ui-avatars.com/api/?background=random',
        content: 'Another test comment.',
        parentId: null,
        createdAt: new Date().toISOString(),
        replies: [],
        type: 'USER',
    },

    {
        id: '3',
        author: 'Another User',
        profileURL: 'https://ui-avatars.com/api/?background=random',
        content: 'Another test comment.',
        parentId: '2',
        createdAt: new Date().toISOString(),
        replies: [],
        type: 'USER',
    },
    {
        id: '4',
        author: 'GPT AI',
        provider: 'gpt-4o-mini',
        profileURL: 'https://ui-avatars.com/api/?background=random',
        content: 'This is a test GPT-generated comment.',
        parentId: null,
        createdAt: new Date().toISOString(),
        replies: [],
        type: 'AI',
        score: 8,
        goodAspects: 'Well-structured response.',
        badAspects: 'Could include more examples.',
        expected: ['Provide examples', 'Explain further'],
        followUp: ['Would you like more details?', 'Do you have any specific questions?'],
    } as AICommentType,
];

export const useComments = ({ topicId, nodeId, token }: UseCommentsProps) => {
    const queryClient = useQueryClient();

    const {
        data: comments,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<CommentType[], Error>({
        queryKey: ['comments', topicId, nodeId],
        queryFn: () => fetchComments(topicId, nodeId, token),
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    });

    const addCommentMutation = useMutation<
        PostCommentResponseDto,
        Error,
        {
            content: string;
            memberId: string;
            parentId?: string | null;
            question: string;
            requestAIEvaluation: boolean;
        }
    >({
        mutationFn: ({ content, memberId, parentId, question, requestAIEvaluation }) =>
            addComment(
                topicId,
                nodeId,
                content,
                question,
                memberId,
                parentId ?? null,
                requestAIEvaluation,
                token,
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', topicId, nodeId] });
        },
        onError: error => {
            console.error('Error adding comment:', error);
        },
    });

    return {
        comments,
        isLoading,
        isError,
        error,
        refetch,
        addComment: addCommentMutation.mutateAsync,
        addCommentStatus: addCommentMutation.status,
    };
};
