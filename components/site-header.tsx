'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeSelector } from '@/components/theme-selector'

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/resume', label: 'Resume' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 theme-transition shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-mono text-xl font-bold">
            evan.schultz
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === route.href ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {route.label}
            </Link>
          ))}
          <div className="flex items-center gap-2">
            <ThemeSelector />
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeSelector />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 border-b bg-background md:hidden">
            <nav className="container flex flex-col py-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`py-2 text-sm font-medium transition-colors hover:text-primary ${
                    pathname === route.href ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
