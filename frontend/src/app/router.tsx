import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../features/auth/LoginPage'
import RegisterPage from '../features/auth/RegisterPage'
import ForgotPasswordPage from '../features/auth/ForgotPasswordPage'
import FeedPage from '../features/feed/FeedPage'
import SearchPage from '../features/search/SearchPage'
import ProfilePage from '../features/profile/ProfilePage'
import ProfileEditPage from '../features/profile/ProfileEditPage'
import NotificationsPage from '../features/notifications/NotificationsPage'
import ChatPage from '../features/chat/ChatPage'
import SettingsPage from '../features/profile/SettingsPage'
import AdminLayout from '../features/admin/AdminLayout'
import AdminDashboard from '../features/admin/AdminDashboard'
import AdminUsersPage from '../features/admin/AdminUsersPage'
import AdminPostsPage from '../features/admin/AdminPostsPage'
import AdminCommentsPage from '../features/admin/AdminCommentsPage'
import AdminReportsPage from '../features/admin/AdminReportsPage'
import AdminAnalyticsPage from '../features/admin/AdminAnalyticsPage'
import AdminAuditLogsPage from '../features/admin/AdminAuditLogsPage'
import NotFoundPage from '../pages/NotFoundPage'

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/feed', element: <FeedPage /> },
  { path: '/search', element: <SearchPage /> },
  { path: '/profile/:username', element: <ProfilePage /> },
  { path: '/profile/:username/edit', element: <ProfileEditPage /> },
  { path: '/notifications', element: <NotificationsPage /> },
  { path: '/chat', element: <ChatPage /> },
  { path: '/settings', element: <SettingsPage /> },
  { path: '/settings/account', element: <SettingsPage /> },
  { path: '/settings/privacy', element: <SettingsPage /> },
  { path: '/settings/security', element: <SettingsPage /> },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'users', element: <AdminUsersPage /> },
      { path: 'users/:id', element: <AdminUsersPage /> },
      { path: 'posts', element: <AdminPostsPage /> },
      { path: 'comments', element: <AdminCommentsPage /> },
      { path: 'reports', element: <AdminReportsPage /> },
      { path: 'analytics', element: <AdminAnalyticsPage /> },
      { path: 'audit-logs', element: <AdminAuditLogsPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
