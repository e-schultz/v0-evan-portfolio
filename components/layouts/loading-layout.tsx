import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LoadingSpinner } from "@/components/loading-spinner"

interface LoadingLayoutProps {
  minHeight?: string
  spinnerSize?: "small" | "default" | "large"
  message?: string
  showHeader?: boolean
  showFooter?: boolean
}

export function LoadingLayout({
  minHeight = "400px",
  spinnerSize = "large",
  message = "Loading...",
  showHeader = true,
  showFooter = true,
}: LoadingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {showHeader && <SiteHeader />}
      <main className="flex-1 container py-12">
        <div className={`flex justify-center items-center min-h-[${minHeight}]`}>
          <LoadingSpinner size={spinnerSize} message={message} />
        </div>
      </main>
      {showFooter && <SiteFooter />}
    </div>
  )
}
