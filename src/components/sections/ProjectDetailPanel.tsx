import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Lock, X } from 'lucide-react'
import { useEffect } from 'react'

import { ProjectCover } from '@/components/sections/ProjectCover'
import { Button } from '@/components/ui/Button'
import type { ProjectItem } from '@/utils/portfolio-data'

type ProjectDetailPanelProps = {
  project: ProjectItem | null
  onClose: () => void
}

export const ProjectDetailPanel = ({ project, onClose }: ProjectDetailPanelProps) => {
  useEffect(() => {
    if (!project) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project ? (
        <div className="fixed inset-0 z-[70] flex justify-end">
          <motion.button
            type="button"
            aria-label="Fechar detalhes do projeto"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.name}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-ink-700 bg-ink-900"
          >
            <div className="relative aspect-[16/9] w-full flex-shrink-0 border-b border-ink-700">
              <ProjectCover project={project} />
            </div>

            <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-paper-400">
                    {project.year} {project.client ? `· ${project.client}` : ''}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-paper-50">{project.name}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-amber-500">{project.role}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Fechar"
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded border border-ink-700 text-paper-400 transition-colors hover:border-amber-500/60 hover:text-paper-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-sm leading-relaxed text-paper-200">{project.description}</p>

              <div className="space-y-3">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-paper-400">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded border border-ink-700 bg-ink-950 px-2.5 py-1 font-mono text-[0.65rem] text-paper-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                {project.demo ? (
                  <Button href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                    Ver demo
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                ) : null}
                {project.link ? (
                  <Button
                    variant="secondary"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Repositório
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                ) : null}
                {!project.link && !project.demo ? (
                  <span className="flex items-center gap-2 rounded border border-ink-700 px-3 py-2 font-mono text-xs text-paper-400">
                    <Lock className="h-3.5 w-3.5" />
                    Repositório privado
                  </span>
                ) : null}
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
