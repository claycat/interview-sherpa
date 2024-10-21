import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CommentType } from '../answer/CommentType';
import { PostCommentResponseDto, addComment, fetchComments } from '../answer/commentsApi';

interface UseCommentsProps {
    topicId: string;
    nodeId: string;
}

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
