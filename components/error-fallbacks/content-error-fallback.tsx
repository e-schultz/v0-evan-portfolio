"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

interface ContentErrorFallbackProps {
  error?: Error
  resetErrorBoundary?: () => void
  title?: string
  message?: string
  backLink?: string
  backText?: string
}

export function ContentErrorFallback({
  error,
  resetErrorBoundary,
  title = "Content Not Available",
  message = "We're having trouble loading this content.",
  backLink = "/",
  backText = "Go back home",
}: ContentErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-6 text-center">
      <div className="bg-amber-100 dark:bg-amber-900/20 p-4 rounded-full mb-4">
        <AlertCircle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>

      <div className="flex flex-col sm:flex-row gap-4">
        {resetErrorBoundary && (
          <Button onClick={resetErrorBoundary} variant="outline">
            Try again
          </Button>
        )}
        <Button asChild>
          <Link href={backLink}>{backText}</Link>
        </Button>
      </div>

      {process.env.NODE_ENV !== "production" && error && (
        <div className="mt-6 p-4 bg-muted/50 rounded-md overflow-auto max-w-full text-left">
          <p className="font-mono text-xs text-destructive">{error.toString()}</p>
        </div>
      )}
    </div>
  )
}
