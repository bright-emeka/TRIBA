import { useState, useEffect, useCallback } from 'react'

const AUTH_STORAGE_KEY = 'triba_tokens'
const USER_STORAGE_KEY = 'triba_user'

export interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (tokens: AuthTokens, user: User) => void
  logout: () => void
  updateUser: (user: User) => void
}

export function useAuth(): AuthContextValue {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY)
    const tokens = localStorage.getItem(AUTH_STORAGE_KEY)
    if (storedUser && tokens) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem(USER_STORAGE_KEY)
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = useCallback((tokens: AuthTokens, userData: User) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokens))
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData))
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
    setUser(null)
  }, [])

  const updateUser = useCallback((userData: User) => {
    setUser(userData)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData))
  }, [])

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
  }
}
