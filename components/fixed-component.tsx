'use client'

import { useState, useEffect } from 'react'
import { LoadingSpinner } from '@/components/loading-spinner'

export function FixedComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await fetch('/api/some-data')
        const json = await result.json()

        if (isMounted) {
          setData(json)
        }
      } catch (err) {
        if (isMounted) {
          setError(err)
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
    }
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <div>Error loading data</div>
  }

  return <div>{data?.content}</div>
}
