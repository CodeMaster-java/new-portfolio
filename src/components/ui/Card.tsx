import { cn } from '@/utils/cn'

import type { ElementType, PropsWithChildren } from 'react'

type CardProps = PropsWithChildren<{
  className?: string
  as?: ElementType
}>

export const Card = ({ className, as: As = 'div', children }: CardProps) => {
  const Component = As

  return (
    <Component
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-white/5 bg-surface-800/60 backdrop-blur transition-all duration-300 hover:border-white/15 hover:bg-surface-800/80',
        className,
      )}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="pattern-mask absolute inset-0 translate-y-4 bg-[radial-gradient(circle_at_center,_rgba(109,61,250,0.14),_transparent_65%)]" />
      </div>
      <div className="relative flex h-full flex-col gap-5 p-6 md:p-8">{children}</div>
    </Component>
  )
}
