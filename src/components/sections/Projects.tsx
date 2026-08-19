import { motion } from 'framer-motion'
import { ArrowUpRight, Lock } from 'lucide-react'
import { useState } from 'react'

import { ProjectCover } from '@/components/sections/ProjectCover'
import { ProjectDetailPanel } from '@/components/sections/ProjectDetailPanel'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/utils/cn'
import { projectItems, type ProjectItem } from '@/utils/portfolio-data'

const TECH_PREVIEW_LIMIT = 6

const getPitch = (description: string) => {
  const firstSentence = description.split(/(?<=\.)\s/)[0]
  if (firstSentence.length <= 180) {
    return firstSentence
  }
  const sliced = description.slice(0, 180)
  const lastSpace = sliced.lastIndexOf(' ')
  return `${sliced.slice(0, lastSpace > 0 ? lastSpace : 180).trimEnd()}...`
}

export const Projects = () => {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null)

  return (
    <section id="projects" className="py-20">
      <Container className="space-y-16">
        <SectionHeading
          index={3}
          label="Projetos"
          title="Iniciativas emblemáticas desenhadas para escala e clareza."
          description="Um recorte de sistemas que combinam backends estáveis com experiências intencionais. Clique em qualquer projeto para o detalhe completo."
        />

        <div className="divide-y divide-ink-700 border-y border-ink-700">
          {projectItems.map((project, index) => {
            const visibleTech = project.tech.slice(0, TECH_PREVIEW_LIMIT)
            const remainingTech = project.tech.length - visibleTech.length
            const isEven = index % 2 === 0

            return (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3) }}
                className="grid gap-8 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-12"
              >
                <div className={cn('order-2 md:order-1', !isEven && 'md:order-2')}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-amber-500">{String(index + 1).padStart(2, '0')}</span>
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-paper-400">
                      {project.year}
                      {project.client ? ` · ${project.client}` : ''}
                    </p>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-paper-50 md:text-3xl">{project.name}</h3>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper-400">{getPitch(project.description)}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {visibleTech.map((tech) => (
                      <span key={tech} className="rounded border border-ink-700 px-2.5 py-1 font-mono text-[0.65rem] text-paper-200">
                        {tech}
                      </span>
                    ))}
                    {remainingTech > 0 ? (
                      <span className="rounded border border-ink-700 px-2.5 py-1 font-mono text-[0.65rem] text-paper-400">
                        +{remainingTech}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {project.demo ? (
                      <Button href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                        Ver demo
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    ) : null}
                    <Button variant="secondary" onClick={() => setActiveProject(project)} className="inline-flex items-center gap-2">
                      Ver detalhes
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                    {!project.link && !project.demo ? (
                      <span
                        title="Repositório privado"
                        aria-label="Repositório privado"
                        className="flex h-11 w-11 items-center justify-center rounded border border-ink-700 text-paper-400"
                      >
                        <Lock className="h-4 w-4" />
                      </span>
                    ) : null}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  aria-label={`Ver detalhes de ${project.name}`}
                  className={cn(
                    'corner-frame group relative order-1 aspect-[4/3] overflow-hidden rounded border border-ink-700 bg-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 md:order-2',
                    !isEven && 'md:order-1',
                  )}
                >
                  <ProjectCover project={project} imageClassName="transition-transform duration-500 group-hover:scale-[1.03]" />
                </button>
              </motion.article>
            )
          })}
        </div>
      </Container>

      <ProjectDetailPanel project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}
