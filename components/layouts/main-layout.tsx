import type React from 'react'
import { ClientLayout } from './client-layout'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return <ClientLayout>{children}</ClientLayout>
}
