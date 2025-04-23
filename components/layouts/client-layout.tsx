'use client'

import type React from 'react'

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return <div className="w-full">{children}</div>
}
