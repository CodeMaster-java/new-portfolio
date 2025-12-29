import { AnimatePresence, motion } from 'framer-motion'
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

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { activeSection } = useSectionObserver(navItems.map((item) => item.id))

  const handleNavigate = (id: string) => {
    scrollTo(id)
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        <button
          type="button"
          onClick={() => handleNavigate('hero')}
          className="flex items-center gap-3 text-left text-sm font-semibold uppercase tracking-[0.4em] text-white/60"
        >
          <span className="h-2 w-2 rounded-full bg-primary-400 shadow-glow" />
          CodeMaster
        </button>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item.id)}
              className={cn(
                'text-sm uppercase tracking-[0.3em] text-white/40 transition-colors duration-200 hover:text-white',
                activeSection === item.id && 'text-white',
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="md:hidden">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-transparent text-white/80 transition-colors duration-200 hover:border-primary-400/60 hover:text-white"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Alternar navegação"
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
            className="border-t border-white/5 bg-surface-900/90 backdrop-blur md:hidden"
          >
            <div className="space-y-3 px-6 py-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={cn(
                    'block w-full text-left text-base font-medium text-white/70 transition-colors duration-200 hover:text-white',
                    activeSection === item.id && 'text-white',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
