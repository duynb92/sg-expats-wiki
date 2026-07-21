'use client'

import { useEffect } from 'react'

export default function ThemeToggle() {
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) document.documentElement.setAttribute('data-theme', saved)
  }, [])

  function toggle() {
    const root = document.documentElement
    const current = root.getAttribute('data-theme')
    const isDark =
      current === 'dark' ||
      (!current && window.matchMedia('(prefers-color-scheme: dark)').matches)
    const next = isDark ? 'light' : 'dark'
    root.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      Theme
    </button>
  )
}
