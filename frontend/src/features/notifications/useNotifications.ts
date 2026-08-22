import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { get, patch } from '../../lib/api'
import type { Notification } from '../../types'

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => get<{ data: Notification[] }>('/notifications'),
  })
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (notificationId: string) => patch(`/notifications/${notificationId}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => patch('/notifications/read-all'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}
