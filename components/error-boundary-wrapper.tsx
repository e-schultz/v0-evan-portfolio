'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ErrorBoundaryWrapper({ children, fallback }: ErrorBoundaryWrapperProps) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error('Error caught by error boundary:', event.error)
      setHasError(true)
      // Prevent the error from bubbling up
      event.preventDefault()
    }

    window.addEventListener('error', errorHandler)
    return () => window.removeEventListener('error', errorHandler)
  }, [])

  if (hasError) {
    return (
      fallback || (
        <div className="flex flex-col items-center justify-center p-6 text-center border rounded-lg bg-muted/30 my-4">
          <div className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-full mb-4">
            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
          <p className="text-muted-foreground mb-4">There was an error loading this content.</p>
          <Button
            onClick={() => setHasError(false)}
            variant="outline"
            size="sm"
            className="flex items-center"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Try again
          </Button>
        </div>
      )
    )
  }

  return <>{children}</>
}
