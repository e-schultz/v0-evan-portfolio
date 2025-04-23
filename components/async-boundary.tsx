"use client"

import type React from "react"
import { Suspense } from "react"
import { EnhancedErrorBoundary } from "./enhanced-error-boundary"
import { LoadingSpinner } from "./loading-spinner"

interface AsyncBoundaryProps {
  children: React.ReactNode
  errorFallback?: React.ReactNode
  loadingFallback?: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  resetKeys?: any[]
}

export function AsyncBoundary({
  children,
  errorFallback,
  loadingFallback = <LoadingSpinner />,
  onError,
  resetKeys,
}: AsyncBoundaryProps) {
  return (
    <EnhancedErrorBoundary fallback={errorFallback} onError={onError} resetKeys={resetKeys}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </EnhancedErrorBoundary>
  )
}
