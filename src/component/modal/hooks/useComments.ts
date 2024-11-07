import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CommentType, GptCommentType } from '../comment/CommentType';
import { PostCommentResponseDto, addComment, fetchComments } from '../comment/commentsApi';

interface UseCommentsProps {
    topicId: string;
    nodeId: string;
}

interface UseCommentsProps {
    topicId: string;
    nodeId: string;
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
        type: 'user',
    },
    {
        id: '2',
        author: 'Another User',
        profileURL: 'https://ui-avatars.com/api/?background=random',
        content: 'Another test comment.',
        parentId: null,
        createdAt: new Date().toISOString(),
        replies: [],
        type: 'user',
    },

    {
        id: '3',
        author: 'Another User',
        profileURL: 'https://ui-avatars.com/api/?background=random',
        content: 'Another test comment.',
        parentId: '2',
        createdAt: new Date().toISOString(),
        replies: [],
        type: 'user',
    },
    {
        id: '4',
        author: 'GPT AI',
        profileURL: 'https://ui-avatars.com/api/?background=random',
        content: 'This is a test GPT-generated comment.',
        parentId: null,
        createdAt: new Date().toISOString(),
        replies: [],
        type: 'gpt',
        score: 8,
        good: 'Well-structured response.',
        bad: 'Could include more examples.',
        expected: ['Provide examples', 'Explain further'],
        followup: ['Would you like more details?', 'Do you have any specific questions?'],
    } as GptCommentType,
];

export const useComments = ({ topicId, nodeId }: UseCommentsProps) => {
    const queryClient = useQueryClient();

    const {
        data: comments,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<CommentType[], Error>({
        queryKey: ['comments', topicId, nodeId],
        queryFn: () => fetchComments(topicId, nodeId),
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        initialData: initialTestComments,
    });

    const addCommentMutation = useMutation<
        PostCommentResponseDto,
        Error,
        { content: string; memberId: string; parentId?: string | null }
    >({
        mutationFn: ({ content, memberId, parentId }) =>
            addComment(topicId, nodeId, content, memberId, parentId ?? null),
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
