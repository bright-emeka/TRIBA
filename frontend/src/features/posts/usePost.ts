import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { get, post, patch, del } from '../../lib/api'
import type { Post } from '../../types'

export function usePost(postId: string) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => get<{ data: Post }>(`/posts/${postId}`),
    enabled: !!postId,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { content: string }) => post<Post>('/posts', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] })
    },
  })
}

export function useUpdatePost(postId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Post>) => patch<Post>(`/posts/${postId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] })
      queryClient.invalidateQueries({ queryKey: ['feed'] })
    },
  })
}

export function useDeletePost(postId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => del(`/posts/${postId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] })
    },
  })
}
