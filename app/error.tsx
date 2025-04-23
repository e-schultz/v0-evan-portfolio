'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ContentContainer } from '@/components/ui/content-container'
import { reportError } from '@/lib/error-reporting'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    reportError(error)
  }, [error])

  return (
    <ContentContainer>
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => reset()}>Try again</Button>
          <Button variant="outline" onClick={() => (window.location.href = '/')}>
            Return Home
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-muted rounded-md text-left w-full max-w-2xl overflow-auto">
            <p className="font-mono text-sm mb-2">{error.message}</p>
            <p className="font-mono text-xs text-muted-foreground">{error.stack}</p>
          </div>
        )}
      </div>
    </ContentContainer>
  )
}
