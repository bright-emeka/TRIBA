import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { get, post, patch, del } from '../../lib/api'
import type { Comment } from '../../types'

export function useComments(postId: string) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => get<{ data: Comment[] }>(`/posts/${postId}/comments`),
    enabled: !!postId,
  })
}

export function useCreateComment(postId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (content: string) => post<Comment>(`/posts/${postId}/comments`, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })
}

export function useUpdateComment(commentId: string) {
  return useMutation({
    mutationFn: (content: string) => patch<Comment>(`/comments/${commentId}`, { content }),
  })
}

export function useDeleteComment(commentId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => del(`/comments/${commentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
  })
}
