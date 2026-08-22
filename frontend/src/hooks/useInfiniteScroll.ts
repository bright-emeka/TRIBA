import { useState, useEffect, useCallback } from 'react'

export function useInfiniteScroll(callback: () => void, hasMore: boolean) {
  const [isLoading, setIsLoading] = useState(false)

  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = window.innerHeight
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setIsLoading(true)
      callback()
      setTimeout(() => setIsLoading(false), 500)
    }
  }, [callback, hasMore, isLoading])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return { isLoading }
}
