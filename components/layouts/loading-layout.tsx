import { LoadingSpinner } from "@/components/loading-spinner"

interface LoadingLayoutProps {
  minHeight?: string
  spinnerSize?: "small" | "default" | "large"
  message?: string
}

export function LoadingLayout({
  minHeight = "400px",
  spinnerSize = "large",
  message = "Loading...",
}: LoadingLayoutProps) {
  return (
    <div className="container py-12">
      <div className={`flex justify-center items-center min-h-[${minHeight}]`}>
        <LoadingSpinner size={spinnerSize} message={message} />
      </div>
    </div>
  )
}
