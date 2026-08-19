import { motion } from 'framer-motion'

import { cn } from '@/utils/cn'

type SectionHeadingProps = {
  label: string
  title: string
  index?: number
  align?: 'left' | 'center'
  description?: string
  className?: string
}

export const SectionHeading = ({
  label,
  title,
  description,
  index,
  align = 'left',
  className,
}: SectionHeadingProps) => (
  <div
    className={cn(
      'flex w-full flex-col gap-4',
      align === 'center' ? 'items-center text-center' : 'items-start text-left',
      className,
    )}
  >
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-paper-400"
    >
      {typeof index === 'number' ? (
        <span className="text-amber-500">{String(index).padStart(2, '0')}</span>
      ) : null}
      <span className={cn(typeof index === 'number' && 'text-paper-400/70')}>{label}</span>
      <span className="h-px w-8 bg-ink-600" aria-hidden="true" />
    </motion.div>
    <motion.h2
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      className="font-display text-3xl font-semibold tracking-tight text-paper-50 md:text-4xl"
    >
      {title}
    </motion.h2>
    {description ? (
      <motion.p
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.16 }}
        className="max-w-2xl text-base leading-relaxed text-paper-400"
      >
        {description}
      </motion.p>
    ) : null}
  </div>
)
