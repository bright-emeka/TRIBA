import { get, post, patch, del } from '../lib/api'
import type { User, Post, Comment, Notification, AIMessage } from '../types'

export const authService = {
  me: () => get<User>('/auth/me'),
  sync: (data: any) => post<User>('/auth/sync', data),
}

export const userService = {
  search: (q: string) => get<User[]>('/users/search', { q }),
  get: (username: string) => get<User>(`/users/${username}`),
  updateMe: (data: any) => patch<User>('/users/me', data),
}

export const postService = {
  create: (content: string) => post<Post>('/posts', { content }),
  get: (id: string) => get<Post>(`/posts/${id}`),
  update: (id: string, data: any) => patch<Post>(`/posts/${id}`, data),
  delete: (id: string) => del(`/posts/${id}`),
}

export const commentService = {
  create: (postId: string, content: string) => post<Comment>(`/posts/${postId}/comments`, { content }),
  list: (postId: string) => get<Comment[]>(`/posts/${postId}/comments`),
  update: (id: string, content: string) => patch<Comment>(`/comments/${id}`, { content }),
  delete: (id: string) => del(`/comments/${id}`),
}

export const notificationService = {
  list: () => get<Notification[]>('/notifications'),
  markRead: (id: string) => patch(`/notifications/${id}/read`),
  markAllRead: () => patch('/notifications/read-all'),
}

export const aiService = {
  chat: (message: string) => post<{ data: AIMessage }>('/ai/chat', { message }),
  history: () => get<{ data: AIMessage[] }>('/ai/history'),
  clearHistory: () => del('/ai/history'),
}

export const adminService = {
  dashboard: () => get<any>('/admin/dashboard'),
  users: (q?: string) => get<User[]>('/admin/users', { q }),
  posts: () => get<Post[]>('/admin/posts'),
  comments: () => get<Comment[]>('/admin/comments'),
  auditLogs: () => get<any[]>('/admin/audit-logs'),
}
