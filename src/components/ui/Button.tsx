import { cn } from '@/utils/cn'

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const baseStyles =
  'inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-0'

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-primary-500 text-white shadow-glow hover:bg-primary-400 hover:text-surface-900 dark:hover:bg-primary-400',
  secondary:
    'bg-surface-800/70 text-surface-50 border-white/10 hover:border-white/25 hover:bg-surface-800/90',
  ghost:
    'bg-transparent text-surface-50 hover:text-primary-300 hover:bg-white/5 border-white/10',
}

type BaseProps = PropsWithChildren<{
  variant?: Variant
  className?: string
  href?: string
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>['rel']
}>

type ButtonProps =
  | (BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })

export const Button = ({ variant = 'primary', className, href, children, ...props }: ButtonProps) => {
  if (href) {
    return (
      <a
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={href}
        className={cn(baseStyles, variantStyles[variant], className)}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={cn(baseStyles, variantStyles[variant], className)}
    >
      {children}
    </button>
  )
}
