import { motion } from 'framer-motion'

import { cn } from '@/utils/cn'

type SectionHeadingProps = {
  label: string
  title: string
  align?: 'left' | 'center'
  description?: string
  className?: string
}

export const SectionHeading = ({ label, title, description, align = 'left', className }: SectionHeadingProps) => (
  <div
    className={cn(
      'flex w-full flex-col gap-4',
      align === 'center' ? 'items-center text-center' : 'items-start text-left',
      className,
    )}
  >
    <motion.span
      initial={{ y: 12, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="gradient-border"
    >
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.6em] text-white/60 dark:text-white/50">
        {label}
      </span>
    </motion.span>
    <motion.h2
      initial={{ y: 16, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      className="text-3xl font-semibold tracking-tight text-surface-50 md:text-4xl"
    >
      {title}
    </motion.h2>
    {description ? (
      <motion.p
        initial={{ y: 18, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.16 }}
        className="max-w-2xl text-base leading-relaxed text-white/60"
      >
        {description}
      </motion.p>
    ) : null}
  </div>
)
