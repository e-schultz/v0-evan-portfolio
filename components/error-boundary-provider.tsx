"use client"

import type React from "react"
import { EnhancedErrorBoundary } from "./enhanced-error-boundary"
import { reportError } from "@/lib/error-reporting"

interface ErrorBoundaryProviderProps {
  children: React.ReactNode
}

export function ErrorBoundaryProvider({ children }: ErrorBoundaryProviderProps) {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    reportError({
      error,
      componentStack: errorInfo.componentStack,
      additionalInfo: {
        timestamp: new Date().toISOString(),
        url: typeof window !== "undefined" ? window.location.href : null,
      },
    })
  }

  return <EnhancedErrorBoundary onError={handleError}>{children}</EnhancedErrorBoundary>
}
