import { useQuery } from '@tanstack/react-query'
import { get } from '../../lib/api'
import type { Post, User, Comment, AdminAuditLog } from '../../types'

export function useAdminDashboard() {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: () => get<{ data: any }>('/admin/dashboard'),
  })
}

export function useAdminUsers(query = '') {
  return useQuery({
    queryKey: ['admin', 'users', query],
    queryFn: () => get<{ data: User[] }>('/admin/users', { q: query }),
  })
}

export function useAdminPosts() {
  return useQuery({
    queryKey: ['admin', 'posts'],
    queryFn: () => get<{ data: Post[] }>('/admin/posts'),
  })
}

export function useAdminComments() {
  return useQuery({
    queryKey: ['admin', 'comments'],
    queryFn: () => get<{ data: Comment[] }>('/admin/comments'),
  })
}

export function useAdminAuditLogs() {
  return useQuery({
    queryKey: ['admin', 'audit-logs'],
    queryFn: () => get<{ data: AdminAuditLog[] }>('/admin/audit-logs'),
  })
}
