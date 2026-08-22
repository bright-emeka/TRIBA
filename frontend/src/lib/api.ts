import axios from 'axios'
import type { AuthTokens, LoginCredentials, RegisterCredentials } from '@/types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const tokens = localStorage.getItem('triba_tokens')
    if (tokens) {
      const parsed = JSON.parse(tokens) as AuthTokens
      if (parsed.accessToken) {
        config.headers.Authorization = `Bearer ${parsed.accessToken}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const tokens = localStorage.getItem('triba_tokens')
        if (tokens) {
          const parsed = JSON.parse(tokens) as AuthTokens
          const response = await api.post('/auth/refresh', {
            refreshToken: parsed.refreshToken,
          })
          const newTokens = response.data.tokens as AuthTokens
          localStorage.setItem('triba_tokens', JSON.stringify(newTokens))
          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`
          return api(originalRequest)
        }
      } catch {
        localStorage.removeItem('triba_tokens')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export const authApi = {
  login: (credentials: LoginCredentials) =>
    api.post('/auth/login', credentials),
  register: (credentials: RegisterCredentials) =>
    api.post('/auth/register', credentials),
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),
  refresh: (refreshToken: string) =>
    api.post('/auth/refresh', { refreshToken }),
  me: () => api.get('/auth/me'),
}
