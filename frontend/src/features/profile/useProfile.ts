import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { get, patch } from '../../lib/api'
import type { User, Post } from '../../types'

export function useProfile(username: string) {
  return useQuery({
    queryKey: ['profile', username],
    queryFn: () => get<{ data: User }>(`/profiles/${username}`),
    enabled: !!username,
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ username, data }: { username: string; data: any }) => patch(`/profiles/${username}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['profile', variables.username] })
    },
  })
}

export function useUserPosts(username: string) {
  return useQuery({
    queryKey: ['user-posts', username],
    queryFn: () => get<{ data: Post[] }>(`/users/${username}/posts`),
    enabled: !!username,
  })
}
