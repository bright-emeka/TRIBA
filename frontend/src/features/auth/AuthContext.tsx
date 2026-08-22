import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { auth as firebaseAuth } from '../lib/firebase'
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth'
import { post } from '../lib/api'

interface AuthContextType {
  user: any | null
  firebaseUser: FirebaseUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, username: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (fbUser) => {
      setFirebaseUser(fbUser)
      if (fbUser) {
        try {
          const token = await fbUser.getIdToken()
          localStorage.setItem('triba_token', token)
          const response = await post('/auth/sync', { uid: fbUser.uid, email: fbUser.email || '', display_name: fbUser.displayName || '', photo_url: fbUser.photoURL })
          setUser(response.data)
        } catch (error) {
          console.error('Auth sync failed:', error)
        }
      } else {
        localStorage.removeItem('triba_token')
        setUser(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    const { signInWithEmailAndPassword } = await import('firebase/auth')
    const credential = await signInWithEmailAndPassword(firebaseAuth, email, password)
    const token = await credential.user.getIdToken()
    localStorage.setItem('triba_token', token)
    const response = await post('/auth/sync', { uid: credential.user.uid, email: credential.user.email || '', display_name: credential.user.displayName || '', photo_url: credential.user.photoURL })
    setUser(response.data)
  }

  const register = async (email: string, password: string, username: string) => {
    const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth')
    const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
    await updateProfile(credential.user, { displayName: username })
    const token = await credential.user.getIdToken()
    localStorage.setItem('triba_token', token)
    const response = await post('/auth/sync', { uid: credential.user.uid, email: credential.user.email || '', display_name: username, photo_url: credential.user.photoURL })
    setUser(response.data)
  }

  const logout = async () => {
    const { signOut } = await import('firebase/auth')
    await signOut(firebaseAuth)
    localStorage.removeItem('triba_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
