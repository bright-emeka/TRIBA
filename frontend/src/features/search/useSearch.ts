import { useQuery } from '@tanstack/react-query'
import { get } from '../../lib/api'
import type { Post } from '../../types'

export function useSearchUsers(query: string) {
  return useQuery({
    queryKey: ['search', 'users', query],
    queryFn: () => get<{ data: any[] }>('/search/users', { q: query }),
    enabled: query.length >= 2,
  })
}

export function useUserPosts(username: string) {
  return useQuery({
    queryKey: ['user-posts', username],
    queryFn: () => get<{ data: Post[] }>(`/users/${username}/posts`),
    enabled: !!username,
  })
}
