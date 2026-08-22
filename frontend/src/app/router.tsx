import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Layout } from '@/components/Layout'
import { PageSkeleton } from '@/components/PageSkeleton'

const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))
const LoginPage = lazy(() => import('@/features/auth/LoginPage').then(m => ({ default: m.LoginPage })))
const RegisterPage = lazy(() => import('@/features/auth/RegisterPage').then(m => ({ default: m.RegisterPage })))
const ForgotPasswordPage = lazy(() => import('@/features/auth/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })))
const FeedPage = lazy(() => import('@/features/feed/FeedPage').then(m => ({ default: m.FeedPage })))
const PostDetailPage = lazy(() => import('@/features/posts/PostDetailPage').then(m => ({ default: m.PostDetailPage })))
const ProfilePage = lazy(() => import('@/features/profile/ProfilePage').then(m => ({ default: m.ProfilePage })))
const ProfileEditPage = lazy(() => import('@/features/profile/ProfileEditPage').then(m => ({ default: m.ProfileEditPage })))
const SearchPage = lazy(() => import('@/features/search/SearchPage').then(m => ({ default: m.SearchPage })))
const NotificationsPage = lazy(() => import('@/features/notifications/NotificationPage').then(m => ({ default: m.NotificationPage })))
const ChatPage = lazy(() => import('@/features/chat/ChatPage').then(m => ({ default: m.ChatPage })))
const SettingsPage = lazy(() => import('@/pages/SettingsPage').then(m => ({ default: m.SettingsPage })))
const SettingsAccountPage = lazy(() => import('@/pages/SettingsAccountPage').then(m => ({ default: m.SettingsAccountPage })))
const SettingsPrivacyPage = lazy(() => import('@/pages/SettingsPrivacyPage').then(m => ({ default: m.SettingsPrivacyPage })))
const SettingsSecurityPage = lazy(() => import('@/pages/SettingsSecurityPage').then(m => ({ default: m.SettingsSecurityPage })))
const AdminLoginPage = lazy(() => import('@/features/admin/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })))
const AdminDashboard = lazy(() => import('@/features/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })))
const AdminUsersPage = lazy(() => import('@/features/admin/AdminUsersPage').then(m => ({ default: m.AdminUsersPage })))
const AdminUserDetailPage = lazy(() => import('@/features/admin/AdminUserDetailPage').then(m => ({ default: m.AdminUserDetailPage })))
const AdminPostsPage = lazy(() => import('@/features/admin/AdminPostsPage').then(m => ({ default: m.AdminPostsPage })))
const AdminCommentsPage = lazy(() => import('@/features/admin/AdminCommentsPage').then(m => ({ default: m.AdminCommentsPage })))
const AdminReportsPage = lazy(() => import('@/features/admin/AdminReportsPage').then(m => ({ default: m.AdminReportsPage })))
const AdminAnalyticsPage = lazy(() => import('@/features/admin/AdminAnalyticsPage').then(m => ({ default: m.AdminAnalyticsPage })))
const AdminAuditLogsPage = lazy(() => import('@/features/admin/AdminAuditLogsPage').then(m => ({ default: m.AdminAuditLogsPage })))

function SuspenseBoundary({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {children}
    </Suspense>
  )
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem('triba_tokens')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

function PublicRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem('triba_tokens')
  if (token) {
    return <Navigate to="/feed" replace />
  }
  return <>{children}</>
}

function AdminRoute({ children }: { children: ReactNode }) {
  const userStr = localStorage.getItem('triba_user')
  if (!userStr) {
    return <Navigate to="/admin/login" replace />
  }
  try {
    const user = JSON.parse(userStr)
    if (user.role !== 'admin') {
      return <Navigate to="/" replace />
    }
    return <>{children}</>
  } catch {
    return <Navigate to="/admin/login" replace />
  }
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/feed" replace />,
      },
      {
        path: 'login',
        element: (
          <PublicRoute>
            <SuspenseBoundary>
              <LoginPage />
            </SuspenseBoundary>
          </PublicRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <PublicRoute>
            <SuspenseBoundary>
              <RegisterPage />
            </SuspenseBoundary>
          </PublicRoute>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <PublicRoute>
            <SuspenseBoundary>
              <ForgotPasswordPage />
            </SuspenseBoundary>
          </PublicRoute>
        ),
      },
      {
        path: 'feed',
        element: (
          <ProtectedRoute>
            <SuspenseBoundary>
              <FeedPage />
            </SuspenseBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: 'search',
        element: (
          <ProtectedRoute>
            <SuspenseBoundary>
              <SearchPage />
            </SuspenseBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile/:username',
        element: (
          <ProtectedRoute>
            <SuspenseBoundary>
              <ProfilePage />
            </SuspenseBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile/:username/edit',
        element: (
          <ProtectedRoute>
            <SuspenseBoundary>
              <ProfileEditPage />
            </SuspenseBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: 'notifications',
        element: (
          <ProtectedRoute>
            <SuspenseBoundary>
              <NotificationsPage />
            </SuspenseBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: 'chat',
        element: (
          <ProtectedRoute>
            <SuspenseBoundary>
              <ChatPage />
            </SuspenseBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute>
            <SuspenseBoundary>
              <SettingsPage />
            </SuspenseBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings/account',
        element: (
          <ProtectedRoute>
            <SuspenseBoundary>
              <SettingsAccountPage />
            </SuspenseBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings/privacy',
        element: (
          <ProtectedRoute>
            <SuspenseBoundary>
              <SettingsPrivacyPage />
            </SuspenseBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings/security',
        element: (
          <ProtectedRoute>
            <SuspenseBoundary>
              <SettingsSecurityPage />
            </SuspenseBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: 'posts/:id',
        element: (
          <ProtectedRoute>
            <SuspenseBoundary>
              <PostDetailPage />
            </SuspenseBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: 'home',
        element: (
          <ProtectedRoute>
            <SuspenseBoundary>
              <HomePage />
            </SuspenseBoundary>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/admin/login',
    element: <SuspenseBoundary><AdminLoginPage /></SuspenseBoundary>,
  },
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <SuspenseBoundary>
          <AdminDashboard />
        </SuspenseBoundary>
      </AdminRoute>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <AdminRoute>
        <SuspenseBoundary>
          <AdminUsersPage />
        </SuspenseBoundary>
      </AdminRoute>
    ),
  },
  {
    path: '/admin/users/:id',
    element: (
      <AdminRoute>
        <SuspenseBoundary>
          <AdminUserDetailPage />
        </SuspenseBoundary>
      </AdminRoute>
    ),
  },
  {
    path: '/admin/posts',
    element: (
      <AdminRoute>
        <SuspenseBoundary>
          <AdminPostsPage />
        </SuspenseBoundary>
      </AdminRoute>
    ),
  },
  {
    path: '/admin/comments',
    element: (
      <AdminRoute>
        <SuspenseBoundary>
          <AdminCommentsPage />
        </SuspenseBoundary>
      </AdminRoute>
    ),
  },
  {
    path: '/admin/reports',
    element: (
      <AdminRoute>
        <SuspenseBoundary>
          <AdminReportsPage />
        </SuspenseBoundary>
      </AdminRoute>
    ),
  },
  {
    path: '/admin/analytics',
    element: (
      <AdminRoute>
        <SuspenseBoundary>
          <AdminAnalyticsPage />
        </SuspenseBoundary>
      </AdminRoute>
    ),
  },
  {
    path: '/admin/audit-logs',
    element: (
      <AdminRoute>
        <SuspenseBoundary>
          <AdminAuditLogsPage />
        </SuspenseBoundary>
      </AdminRoute>
    ),
  },
  {
    path: '*',
    element: <SuspenseBoundary><NotFoundPage /></SuspenseBoundary>,
  },
])
