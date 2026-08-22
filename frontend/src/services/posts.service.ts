import { api } from '@/lib/api'
import type { Post, PaginatedResponse, PaginationParams, CreatePostDto, UpdatePostDto } from '@/types'

export const postsService = {
  async getPosts(params: PaginationParams) {
    const { data } = await api.get<PaginatedResponse<Post>>('/posts', { params })
    return data
  },
  async getPost(id: string) {
    const { data } = await api.get<Post>(`/posts/${id}`)
    return data
  },
  async createPost(dto: CreatePostDto) {
    const { data } = await api.post<Post>('/posts', dto)
    return data
  },
  async updatePost(id: string, dto: UpdatePostDto) {
    const { data } = await api.post<Post>(`/posts/${id}`, dto)
    return data
  },
  async deletePost(id: string) {
    await api.delete(`/posts/${id}`)
  },
  async likePost(id: string) {
    const { data } = await api.post(`/posts/${id}/like`)
    return data
  },
  async unlikePost(id: string) {
    const { data } = await api.post(`/posts/${id}/unlike`)
    return data
  },
  async reportPost(id: string, reason: string) {
    const { data } = await api.post(`/posts/${id}/report`, { reason })
    return data
  },
}
