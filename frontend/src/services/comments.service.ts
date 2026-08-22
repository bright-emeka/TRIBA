import { api } from '@/lib/api'
import type { Comment, PaginatedResponse, PaginationParams, CreateCommentDto } from '@/types'

export const commentsService = {
  async getComments(postId: string, params: PaginationParams) {
    const { data } = await api.get<PaginatedResponse<Comment>>(`/posts/${postId}/comments`, { params })
    return data
  },
  async getComment(id: string) {
    const { data } = await api.get<Comment>(`/comments/${id}`)
    return data
  },
  async createComment(postId: string, dto: CreateCommentDto) {
    const { data } = await api.post<Comment>(`/posts/${postId}/comments`, dto)
    return data
  },
  async updateComment(id: string, dto: CreateCommentDto) {
    const { data } = await api.post<Comment>(`/comments/${id}`, dto)
    return data
  },
  async deleteComment(id: string) {
    await api.delete(`/comments/${id}`)
  },
  async likeComment(id: string) {
    const { data } = await api.post(`/comments/${id}/like`)
    return data
  },
  async unlikeComment(id: string) {
    const { data } = await api.post(`/comments/${id}/unlike`)
    return data
  },
}
