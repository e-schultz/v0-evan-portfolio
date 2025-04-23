'use client'

import { Button } from '@/components/ui/button'
import { AlertOctagon } from 'lucide-react'

interface FormErrorFallbackProps {
  error?: Error
  resetErrorBoundary?: () => void
  title?: string
  message?: string
}

export function FormErrorFallback({
  error,
  resetErrorBoundary,
  title = 'Form Error',
  message = 'We encountered an error while processing your request.',
}: FormErrorFallbackProps) {
  return (
    <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-center">
      <div className="flex justify-center mb-4">
        <AlertOctagon className="h-8 w-8 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{message}</p>

      {resetErrorBoundary && (
        <Button onClick={resetErrorBoundary} variant="outline" className="w-full">
          Try again
        </Button>
      )}
    </div>
  )
}
