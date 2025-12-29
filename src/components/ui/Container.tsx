import { cn } from '@/utils/cn'

import type { PropsWithChildren } from 'react'

type ContainerProps = PropsWithChildren<{
  className?: string
}>

export const Container = ({ children, className }: ContainerProps) => (
  <div className={cn('mx-auto w-full max-w-7xl px-6 md:px-12', className)}>
    {children}
  </div>
)
