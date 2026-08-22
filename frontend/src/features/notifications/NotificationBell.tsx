import { useQuery } from '@tanstack/react-query'
import { get } from '../../lib/api'
import type { Notification } from '../../types'

export function NotificationBell() {
  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => get<{ data: Notification[] }>('/notifications'),
    refetchInterval: 30000,
  })

  const notifications = (data as any)?.data || []
  const unreadCount = notifications.filter((n: Notification) => !n.is_read).length

  return (
    <div className="notification-bell">
      <span>Notifications</span>
      {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
    </div>
  )
}
