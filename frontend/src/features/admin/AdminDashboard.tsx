import { useAdminDashboard } from './useAdmin'

export function AdminDashboard() {
  const { data, isLoading } = useAdminDashboard()
  const stats = data?.data || {}

  return (
    <div className="admin-dashboard">
      <h1>Dashboard</h1>
      {isLoading && <div className="loading">Loading...</div>}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.total_users || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Posts</h3>
          <p>{stats.total_posts || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Comments</h3>
          <p>{stats.total_comments || 0}</p>
        </div>
      </div>
    </div>
  )
}
