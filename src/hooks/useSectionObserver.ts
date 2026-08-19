import { useEffect, useRef, useState } from 'react'

export const useSectionObserver = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '')
  const ratiosRef = useRef(new Map<string, number>())

  useEffect(() => {
    if (!sectionIds.length || typeof IntersectionObserver === 'undefined') {
      return
    }

    const ratios = ratiosRef.current
    ratios.clear()

    const observer = new IntersectionObserver(
      (entries) => {
        // Each callback only reports entries whose ratio changed, so state is
        // tracked cumulatively across calls instead of trusting a single batch —
        // otherwise a fast programmatic scroll (nav click) can leave the active
        // section stuck on whichever id last appeared in a batch, even after it
        // has scrolled out of view.
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        let bestId = ''
        let bestRatio = 0
        sectionIds.forEach((id) => {
          const ratio = ratios.get(id) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        })

        if (bestId) {
          setActiveSection(bestId)
        }
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0, 0.2, 0.4, 0.6],
      },
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return { activeSection }
}
