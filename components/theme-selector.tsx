'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Palette, Moon, Sun, Laptop } from 'lucide-react'
import { useThemePersistence } from '@/lib/theme-persistence'

const themeVariants = [
  { value: '', label: 'Default Blue' },
  { value: 'soft', label: 'Soft (Eye-friendly)' },
  { value: 'purple', label: 'Purple' },
  { value: 'green', label: 'Green' },
  { value: 'high-contrast', label: 'High Contrast' },
]

export function ThemeSelector({
  variant = 'default',
}: {
  variant?: 'default' | 'icon' | 'minimal'
}) {
  const { theme, setTheme } = useTheme()
  const [themeVariant, setThemeVariant] = useState('')
  const [mounted, setMounted] = useState(false)

  // Use theme persistence
  useThemePersistence()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)

    // Get the current theme variant from data-theme attribute
    const currentVariant = document.documentElement.getAttribute('data-theme') || ''
    setThemeVariant(currentVariant)
  }, [])

  // Update the data-theme attribute when the theme variant changes
  useEffect(() => {
    if (mounted) {
      if (themeVariant) {
        document.documentElement.setAttribute('data-theme', themeVariant)
      } else {
        document.documentElement.removeAttribute('data-theme')
      }
    }
  }, [themeVariant, mounted])

  if (!mounted) {
    return null
  }

  // Get the icon for the current theme mode
  const getThemeModeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-[1.2rem] w-[1.2rem]" />
      case 'dark':
        return <Moon className="h-[1.2rem] w-[1.2rem]" />
      default:
        return <Laptop className="h-[1.2rem] w-[1.2rem]" />
    }
  }

  // Render different button variants
  const renderTrigger = () => {
    switch (variant) {
      case 'icon':
        return (
          <Button variant="ghost" size="icon" aria-label="Toggle Theme">
            {getThemeModeIcon()}
          </Button>
        )
      case 'minimal':
        return (
          <Button variant="ghost" size="icon" aria-label="Toggle Theme">
            <Palette className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        )
      default:
        return (
          <Button variant="outline" size="sm" className="gap-2">
            <Palette className="h-4 w-4" />
            <span>Theme</span>
          </Button>
        )
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{renderTrigger()}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[12rem]">
        <DropdownMenuLabel>Mode</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme || ''} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light" className="gap-2">
            <Sun className="h-4 w-4" />
            <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" className="gap-2">
            <Moon className="h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system" className="gap-2">
            <Laptop className="h-4 w-4" />
            <span>System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Color Scheme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={themeVariant} onValueChange={setThemeVariant}>
          {themeVariants.map((variant) => (
            <DropdownMenuRadioItem key={variant.value} value={variant.value}>
              <div className="flex items-center gap-2">
                <div
                  className={`h-4 w-4 rounded-full ${
                    variant.value === 'purple'
                      ? 'bg-purple-600'
                      : variant.value === 'green'
                        ? 'bg-green-600'
                        : variant.value === 'high-contrast'
                          ? 'bg-black dark:bg-white'
                          : variant.value === 'soft'
                            ? 'bg-blue-400'
                            : 'bg-blue-600'
                  }`}
                />
                <span>{variant.label}</span>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
