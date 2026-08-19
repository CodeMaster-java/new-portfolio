import { cn } from '@/utils/cn'

import type { PropsWithChildren, ReactNode } from 'react'

type ChipProps = PropsWithChildren<{
  className?: string
  leadingIcon?: ReactNode
}>

export const Chip = ({ className, leadingIcon, children }: ChipProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-2 rounded border border-ink-700 bg-ink-900 px-2.5 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-[0.15em] text-paper-400',
      className,
    )}
  >
    {leadingIcon}
    {children}
  </span>
)
