import { useEffect, useState } from 'react'

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return
    }

    const query = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    setIsMobile(query.matches)

    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches)
    query.addEventListener('change', handleChange)

    return () => query.removeEventListener('change', handleChange)
  }, [breakpoint])

  return isMobile
}
