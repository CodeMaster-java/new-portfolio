import { useState } from 'react'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { projectItems } from '@/utils/portfolio-data'

const DESCRIPTION_LIMIT = 220
const TECH_LIMIT = 6

const buildPreview = (text: string) => {
  if (text.length <= DESCRIPTION_LIMIT) {
    return text
  }

  const sliced = text.slice(0, DESCRIPTION_LIMIT)
  const lastSpace = sliced.lastIndexOf(' ')
  const safeSlice = lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced

  return `${safeSlice.trimEnd()}...`
}

export const Projects = () => {
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({})

  const toggleProject = (name: string) => {
    setExpandedProjects((state) => ({
      ...state,
      [name]: !state[name],
    }))
  }

  return (
    <section id="projects" className="py-20">
      <Container className="space-y-12">
        <SectionHeading
          label="Projetos"
          title="Iniciativas emblemáticas desenhadas para escala e clareza."
          description="Um recorte de sistemas que combinam backends estáveis com experiências intencionais. Cada projeto equilibra rigor técnico e execução elegante."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {projectItems.map((project, index) => {
            const isExpanded = Boolean(expandedProjects[project.name])
            const shouldClampDescription = project.description.length > DESCRIPTION_LIMIT
            const isTechClamped = project.tech.length > TECH_LIMIT
            const description =
              isExpanded || !shouldClampDescription
                ? project.description
                : buildPreview(project.description)
            const visibleTech = isExpanded || !isTechClamped ? project.tech : project.tech.slice(0, TECH_LIMIT)
            const shouldShowToggle = shouldClampDescription || isTechClamped

            return (
              <motion.div
                className="h-full"
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-white/40">{project.year}</p>
                      <h3 className="mt-3 text-xl font-semibold text-white">{project.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.demo ? (
                        <Button
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          variant="secondary"
                          className="px-3 py-1 text-xs"
                        >
                          Demo
                        </Button>
                      ) : null}
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-primary-400/80 hover:text-white"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm leading-relaxed text-white/60">{description}</p>
                    {shouldShowToggle ? (
                      <button
                        type="button"
                        onClick={() => toggleProject(project.name)}
                        className="text-xs uppercase tracking-[0.3em] text-primary-200/80 transition-colors hover:text-primary-100"
                      >
                        {isExpanded ? 'Ver menos' : 'Ver mais'}
                      </button>
                    ) : null}
                  </div>
                  <div className="mt-6 space-y-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">Papel</p>
                    <p className="text-sm text-white/70">{project.role}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {visibleTech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
