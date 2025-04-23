'use client'

import { useState, useEffect, useRef } from 'react'

type CacheEntry<T> = {
  data: T
  timestamp: number
}

// Cache storage
const cache = new Map<string, CacheEntry<any>>()
const DEFAULT_CACHE_TTL = 5 * 60 * 1000 // 5 minutes in milliseconds

export function useCachedFetch<T>(
  url: string,
  options?: RequestInit,
  cacheTTL: number = DEFAULT_CACHE_TTL,
): {
  data: T | null
  error: Error | null
  loading: boolean
  refetch: () => Promise<void>
} {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // Use a ref to track if the component is mounted
  const isMounted = useRef(true)

  // Function to fetch data
  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      // Check cache first
      const cacheKey = `${url}:${JSON.stringify(options)}`
      const cachedData = cache.get(cacheKey)

      if (cachedData && Date.now() - cachedData.timestamp < cacheTTL) {
        if (isMounted.current) {
          setData(cachedData.data)
          setLoading(false)
        }
        return
      }

      // Fetch fresh data
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()

      // Update cache
      cache.set(cacheKey, {
        data: result,
        timestamp: Date.now(),
      })

      if (isMounted.current) {
        setData(result)
        setLoading(false)
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err instanceof Error ? err : new Error(String(err)))
        setLoading(false)
      }
    }
  }

  // Refetch function
  const refetch = async () => {
    await fetchData()
  }

  useEffect(() => {
    fetchData()

    // Cleanup function
    return () => {
      isMounted.current = false
    }
  }, [url, JSON.stringify(options)])

  return { data, error, loading, refetch }
}

// Helper function to clear the entire cache
export function clearCache(): void {
  cache.clear()
}

// Helper function to clear a specific cache entry
export function clearCacheEntry(url: string, options?: RequestInit): void {
  const cacheKey = `${url}:${JSON.stringify(options)}`
  cache.delete(cacheKey)
}
