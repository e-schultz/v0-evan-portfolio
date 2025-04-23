"use client"

import { useEffect } from "react"

// Theme persistence hook
export function useThemePersistence() {
  useEffect(() => {
    // Get theme variant from localStorage
    const savedThemeVariant = localStorage.getItem("theme-variant") || ""

    // Apply theme variant
    if (savedThemeVariant) {
      document.documentElement.setAttribute("data-theme", savedThemeVariant)
    }

    // Create a MutationObserver to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
          const currentThemeVariant = document.documentElement.getAttribute("data-theme") || ""
          localStorage.setItem("theme-variant", currentThemeVariant)
        }
      })
    })

    // Start observing
    observer.observe(document.documentElement, { attributes: true })

    // Cleanup
    return () => {
      observer.disconnect()
    }
  }, [])
}
