import { Code2, LayoutTemplate, Server, Smartphone, Terminal } from 'lucide-react'

import { cn } from '@/utils/cn'
import type { ProjectItem } from '@/utils/portfolio-data'

const getProjectIcon = (role: string) => {
  const lower = role.toLowerCase()
  if (lower.includes('mobile')) return Smartphone
  if (lower.includes('frontend')) return LayoutTemplate
  if (lower.includes('backend')) return Server
  if (lower.includes('fullstack')) return Code2
  return Terminal
}

const getInitials = (name: string) =>
  name
    .split(/[\s·-]+/)
    .filter((word) => word.length > 1)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('')

type ProjectCoverProps = {
  project: ProjectItem
  className?: string
  imageClassName?: string
}

export const ProjectCover = ({ project, className, imageClassName }: ProjectCoverProps) => {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Captura de tela do projeto ${project.name}`}
        loading="lazy"
        className={cn('h-full w-full object-cover object-top', imageClassName)}
      />
    )
  }

  const Icon = getProjectIcon(project.role)

  return (
    <div
      className={cn(
        'blueprint-grid relative flex h-full w-full items-center justify-center overflow-hidden',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 40%, rgba(255, 176, 32, 0.12), transparent 60%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 14px)',
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -right-4 select-none font-display text-[8rem] font-bold leading-none text-white/[0.035]"
      >
        {getInitials(project.name)}
      </span>

      <div className="relative flex flex-col items-center gap-4">
        <div className="corner-frame flex h-16 w-16 items-center justify-center rounded border border-amber-500/30 bg-ink-950/60 backdrop-blur">
          <Icon className="h-7 w-7 text-amber-500" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="h-px w-10 bg-ink-600" aria-hidden="true" />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-paper-400">{project.role}</span>
        </div>
      </div>
    </div>
  )
}
