import axios from 'axios'
import type { ApiResponse } from '../types'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('triba_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred'
    return Promise.reject(new Error(message))
  }
)

export const get = async <T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> => {
  return api.get(url, { params })
}

export const post = async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
  return api.post(url, data)
}

export const patch = async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
  return api.patch(url, data)
}

export const del = async <T>(url: string): Promise<ApiResponse<T>> => {
  return api.delete(url)
}
