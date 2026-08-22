import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { get, post, del } from '../../lib/api'
import type { Post } from '../../types'

export function useFeed(limit = 20, cursor?: string) {
  return useQuery({
    queryKey: ['feed', limit, cursor],
    queryFn: () => get<{ data: Post[]; pagination: any }>('/feed', { limit, cursor }),
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (content: string) => post<Post>('/posts', { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] })
    },
  })
}
