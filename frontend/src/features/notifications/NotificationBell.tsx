import { useQuery } from '@tanstack/react-query'
import { get } from '../../lib/api'
import type { Notification } from '../../types'

export function NotificationBell() {
  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => get<{ data: Notification[] }>('/notifications'),
    refetchInterval: 30000,
  })

  const unreadCount = data?.data?.filter((n: Notification) => !n.is_read).length || 0

  return (
    <div className="notification-bell">
      <span>Notifications</span>
      {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
    </div>
  )
}
