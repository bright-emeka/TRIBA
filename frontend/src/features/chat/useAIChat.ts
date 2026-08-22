import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { get, post, del } from '../../lib/api'

export function useAIChat() {
  const [message, setMessage] = useState('')
  const queryClient = useQueryClient()

  const { data: historyData } = useQuery({
    queryKey: ['ai-history'],
    queryFn: () => get<{ data: any[] }>('/ai/history'),
  })

  const chatMutation = useMutation({
    mutationFn: (msg: string) => post<{ data: any }>('/ai/chat', { message: msg }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-history'] })
    },
  })

  const sendMessage = async () => {
    if (!message.trim()) return
    await chatMutation.mutateAsync(message.trim())
    setMessage('')
  }

  const clearHistory = useMutation({
    mutationFn: () => del('/ai/history'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-history'] })
    },
  })

  return {
    messages: historyData?.data || [],
    sendMessage,
    clearHistory: clearHistory.mutate,
    message,
    setMessage,
    isLoading: chatMutation.isPending,
  }
}
