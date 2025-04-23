import type React from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { Inter, JetBrains_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import { ErrorBoundaryProvider } from '@/components/error-boundary-provider'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Evan Schultz | Technical Director & Software Engineer',
  description:
    'Portfolio and blog of Evan Schultz - Building high performing teams and the environment that enables them.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://evanschultz.dev',
    title: 'Evan Schultz | Technical Director & Software Engineer',
    description:
      'Portfolio and blog of Evan Schultz - Building high performing teams and the environment that enables them.',
    siteName: 'Evan Schultz Portfolio',
  },
  generator: 'v0.dev',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableTransitions={true}
          transitionDuration={200}
          themes={['light', 'dark', 'system']}
          defaultVariant="soft"
        >
          <ErrorBoundaryProvider>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </ErrorBoundaryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
