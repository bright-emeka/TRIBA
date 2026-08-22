import { useState, useEffect, useCallback } from 'react'

export function useInfiniteScroll(onLoadMore: () => void, hasMore: boolean) {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || !hasMore) return
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setIsLoading(true)
        onLoadMore()
        setTimeout(() => setIsLoading(false), 500)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [onLoadMore, hasMore, isLoading])

  return { isLoading }
}
