import { cn } from '@/utils/cn'

import type { ElementType, PropsWithChildren, ReactNode } from 'react'

type CardProps = PropsWithChildren<{
  className?: string
  as?: ElementType
  media?: ReactNode
}>

export const Card = ({ className, as: As = 'div', media, children }: CardProps) => {
  const Component = As

  return (
    <Component
      className={cn(
        'relative overflow-hidden rounded border border-ink-700 bg-ink-900 transition-colors duration-300 hover:border-ink-600',
        className,
      )}
    >
      {media}
      <div className="relative flex flex-col gap-5 p-6 md:p-8">{children}</div>
    </Component>
  )
}
