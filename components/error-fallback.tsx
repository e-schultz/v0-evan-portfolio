"use client"

import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorFallbackProps {
  title?: string
  message?: string
  error?: Error
  resetErrorBoundary?: () => void
  backLink?: string
  backText?: string
}

export function ErrorFallback({
  title = "Something went wrong",
  message = "We're having trouble loading this content. Please try again later.",
  error,
  resetErrorBoundary,
  backLink,
  backText,
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-6 text-center">
      <div className="bg-amber-100 dark:bg-amber-900/20 p-4 rounded-full mb-4">
        <AlertTriangle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>

      <div className="flex flex-col sm:flex-row gap-4">
        {resetErrorBoundary && (
          <Button onClick={resetErrorBoundary} variant="outline" size="sm" className="flex items-center">
            <RefreshCw className="mr-2 h-4 w-4" /> Try again
          </Button>
        )}

        {backLink && (
          <Button asChild>
            <a href={backLink}>{backText || "Go back"}</a>
          </Button>
        )}
      </div>

      {process.env.NODE_ENV === "development" && error && (
        <div className="mt-8 p-4 bg-muted rounded-md text-left w-full max-w-2xl overflow-auto">
          <p className="font-mono text-sm mb-2">{error.message}</p>
          <p className="font-mono text-xs text-muted-foreground">{error.stack}</p>
        </div>
      )}
    </div>
  )
}
