import { useNotifications, useMarkNotificationRead } from './useNotifications'

export function NotificationsPage() {
  const { data, isLoading } = useNotifications()
  const markRead = useMarkNotificationRead()

  const notifications = data?.data || []

  return (
    <div className="page-notifications">
      <h1>Notifications</h1>
      {isLoading && <div className="loading">Loading notifications...</div>}
      <div className="notification-list">
        {notifications.map((notification: any) => (
          <div key={notification.notification_id} className={`notification-item ${notification.is_read ? 'read' : 'unread'}`}>
            <p>{notification.message}</p>
            <span>{new Date(notification.created_at).toLocaleDateString()}</span>
            {!notification.is_read && (
              <button onClick={() => markRead.mutate(notification.notification_id)}>Mark as read</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
