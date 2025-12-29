import { cn } from '@/utils/cn'

import type { PropsWithChildren, ReactNode } from 'react'

type ChipProps = PropsWithChildren<{
  className?: string
  leadingIcon?: ReactNode
}>

export const Chip = ({ className, leadingIcon, children }: ChipProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/70 backdrop-blur-lg dark:text-white/50',
      className,
    )}
  >
    {leadingIcon}
    {children}
  </span>
)
