import { useQuery } from '@tanstack/react-query'
import { get } from '../../lib/api'

export function AdminAnalyticsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'analytics'],
    queryFn: () => get<{ data: any }>('/analytics/platform/stats'),
  })

  const stats = (data as any)?.data || {}

  return (
    <div className="admin-page">
      <h1>Analytics</h1>
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
      </div>
    </div>
  )
}
