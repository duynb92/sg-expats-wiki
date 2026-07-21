'use client'

import { useEffect } from 'react'

export default function ActiveNav() {
  useEffect(() => {
    const sections = document.querySelectorAll('.section')
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.sidebar-nav a')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove('active'))
            const active = document.querySelector<HTMLAnchorElement>(
              `.sidebar-nav a[href="#${entry.target.id}"]`
            )
            if (active) active.classList.add('active')
          }
        })
      },
      { rootMargin: '-10% 0px -80% 0px' }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return null
}
