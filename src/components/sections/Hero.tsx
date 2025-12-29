import { motion } from 'framer-motion'
import { ArrowDownRight, CircleArrowOutUpRight } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { Container } from '@/components/ui/Container'
import { heroMetrics, heroTags } from '@/utils/portfolio-data'

const fadeVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export const Hero = () => (
  <section
    id="hero"
    className="relative w-full overflow-hidden bg-surface-900 pb-24 pt-20 md:pb-32 md:pt-28"
  >
    <div className="absolute inset-0 bg-hero-grid bg-[length:140px_140px] opacity-30" />
    <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl" />
    <div className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-primary-300/10 blur-3xl" />

    <Container className="relative grid gap-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
      {/* LEFT */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.12 }}
        className="flex flex-col gap-8"
      >
        <motion.div variants={fadeVariant} className="flex flex-wrap gap-3">
          {heroTags.map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </motion.div>

        <motion.h1
          variants={fadeVariant}
          className="text-balance text-4xl font-semibold leading-tight text-white md:text-5xl"
        >
          Construo ecossistemas resilientes que permitem produtos escalarem
          sem comprometer a experiência do time técnico.
        </motion.h1>

        <motion.p
          variants={fadeVariant}
          className="max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
        >
          Sou <strong className="text-white/90">Robson José</strong>, também conhecido como{' '}
          <strong className="text-white/90">CodeMaster</strong> — desenvolvedor fullstack
          com foco em backend. Atuo na arquitetura de APIs, automações e
          soluções multiplataforma onde confiabilidade, clareza e performance
          caminham juntas.
        </motion.p>

        <motion.div variants={fadeVariant} className="flex flex-wrap items-center gap-4">
          <Button href="#projects" className="inline-flex items-center gap-2">
            Ver projetos
            <CircleArrowOutUpRight className="h-4 w-4" />
          </Button>

          <Button
            variant="secondary"
            href="https://github.com/CodeMaster-java"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2"
          >
            GitHub
            <ArrowDownRight className="h-4 w-4 rotate-[-45deg]" />
          </Button>
        </motion.div>

        <motion.div
          variants={fadeVariant}
          className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3"
        >
          {heroMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-white/5 bg-white/5 p-5 text-white/90 backdrop-blur-lg"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                {metric.label}
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                {metric.value}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* RIGHT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative flex items-center justify-center"
      >
        <div className="relative flex h-[420px] w-full max-w-[420px] items-center justify-center rounded-[3rem] border border-white/5 bg-surface-800/50 p-10 shadow-[0_45px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur">
          <div className="absolute inset-0 -z-10 rounded-[3rem] border border-white/10" />

          <div className="flex flex-col items-center gap-6 text-center">
            <div className="gradient-border">
              <span className="font-mono text-xs uppercase tracking-[0.45em] text-white/60">
                Sistemas & Automações
              </span>
            </div>

            <p className="text-balance text-lg leading-relaxed text-white/70">
              Arquiteturas backend-first orientadas a produto. Da
              orquestração de serviços a interfaces estratégicas,
              cada camada é projetada com propósito.
            </p>

            <div className="flex items-center gap-4 text-sm text-white/50">
              <span className="font-mono text-white/80">Web</span>
              <span className="h-2 w-2 rounded-full bg-primary-400" />
              <span className="font-mono text-white/80">Desktop</span>
              <span className="h-2 w-2 rounded-full bg-primary-400" />
              <span className="font-mono text-white/80">Mobile</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Container>
  </section>
)
