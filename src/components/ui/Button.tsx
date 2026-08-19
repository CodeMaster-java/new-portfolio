import { cn } from '@/utils/cn'

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const baseStyles =
  'inline-flex min-h-11 items-center gap-2 rounded border border-transparent px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-0'

const variantStyles: Record<Variant, string> = {
  primary: 'bg-amber-500 text-ink-950 hover:bg-amber-400',
  secondary: 'bg-ink-900 text-paper-50 border-ink-700 hover:border-ink-600 hover:bg-ink-800',
  ghost: 'bg-transparent text-paper-50 border-ink-700 hover:text-amber-400 hover:bg-white/5',
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
