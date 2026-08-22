import { api } from '@/lib/api'

export const authService = {
  async login(email: string, password: string) {
    const { data } = await api.post('/auth/login', { email, password })
    return data
  },
  async register(email: string, username: string, displayName: string, password: string) {
    const { data } = await api.post('/auth/register', { email, username, displayName, password })
    return data
  },
  async forgotPassword(email: string) {
    const { data } = await api.post('/auth/forgot-password', { email })
    return data
  },
  async resetPassword(token: string, password: string) {
    const { data } = await api.post('/auth/reset-password', { token, password })
    return data
  },
  async me() {
    const { data } = await api.get('/auth/me')
    return data
  },
}
