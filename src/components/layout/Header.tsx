import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import { useSectionObserver } from '@/hooks/useSectionObserver'
import { cn } from '@/utils/cn'
import { navItems } from '@/utils/portfolio-data'

const scrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const sectionIds = navItems.map((item) => item.id)

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { activeSection } = useSectionObserver(sectionIds)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  const handleNavigate = (id: string) => {
    scrollTo(id)
    setIsOpen(false)
  }

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-[60] h-px origin-left bg-amber-500"
      />
      <header className="sticky top-0 z-50 w-full border-b border-ink-700 bg-ink-950/85 backdrop-blur-lg">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          <button
            type="button"
            onClick={() => handleNavigate('hero')}
            className="flex items-center gap-3 rounded font-mono text-xs font-semibold uppercase tracking-[0.4em] text-paper-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <span className="h-1.5 w-1.5 bg-amber-500" />
            CodeMaster
          </button>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                aria-current={activeSection === item.id ? 'true' : undefined}
                className={cn(
                  'group flex items-center gap-2 rounded px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-paper-400 transition-colors duration-200 hover:text-paper-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
                  activeSection === item.id && 'text-paper-50',
                )}
              >
                <span className={cn('text-amber-500/60', activeSection === item.id && 'text-amber-500')}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="md:hidden">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded border border-ink-700 bg-transparent text-paper-200 transition-colors duration-200 hover:border-amber-500/60 hover:text-paper-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Alternar navegação"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-ink-700 bg-ink-950/95 backdrop-blur md:hidden"
            >
              <div className="space-y-1 px-6 py-4">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    aria-current={activeSection === item.id ? 'true' : undefined}
                    className={cn(
                      'flex w-full items-center gap-3 rounded py-3 text-left font-mono text-sm uppercase tracking-[0.2em] text-paper-400 transition-colors duration-200 hover:text-paper-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
                      activeSection === item.id && 'text-paper-50',
                    )}
                  >
                    <span className={cn('text-amber-500/60', activeSection === item.id && 'text-amber-500')}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
      <nav
        aria-label="Progresso da seção"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleNavigate(item.id)}
            aria-current={activeSection === item.id ? 'true' : undefined}
            aria-label={item.label}
            className="group flex items-center gap-3 focus-visible:outline-none"
          >
            <span
              className={cn(
                'font-mono text-[0.65rem] uppercase tracking-[0.2em] text-paper-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100',
                activeSection === item.id && 'opacity-100 text-amber-500',
              )}
            >
              {item.label}
            </span>
            <span
              className={cn(
                'h-2 w-2 rounded-full border border-paper-400/50 transition-all duration-200 group-hover:border-amber-500',
                activeSection === item.id && 'border-amber-500 bg-amber-500',
              )}
            />
          </button>
        ))}
      </nav>
    </>
  )
}
