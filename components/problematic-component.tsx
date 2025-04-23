'use client'

import { useState, useEffect } from 'react'

// Wrong way - causing "uncached promise" errors
export function ProblematicComponent() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/some-data')
      const json = await result.json()
      setData(json)
    }

    fetchData()
  }, [])

  // This is the problem - conditional rendering based on async data
  // without proper Suspense support
  if (!data) {
    // This creates a new promise on each render and throws it
    // React can't track this properly
    throw new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
  }

  return <div>{data.content}</div>
}
