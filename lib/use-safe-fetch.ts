"use client"

import { useState, useEffect } from "react"

export function useSafeFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const signal = controller.signal

    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url, { ...options, signal })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result = await response.json()

        if (isMounted) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (isMounted && err instanceof Error && err.name !== "AbortError") {
          setError(err)
          setData(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [url, JSON.stringify(options)])

  return { data, error, loading }
}
