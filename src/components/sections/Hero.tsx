import { motion } from 'framer-motion'
import { ArrowDownRight, CircleArrowOutUpRight } from 'lucide-react'
import { useState } from 'react'

import { ParticleField } from '@/components/canvas/ParticleField'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { Container } from '@/components/ui/Container'
import { heroMetrics, heroTags } from '@/utils/portfolio-data'

const fadeVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const profileImageUrl = (() => {
  try {
    return new URL('../../assets/perfil.jpeg', import.meta.url).href
  } catch {
    return null
  }
})()

export const Hero = () => {
  const [imageError, setImageError] = useState(false)
  const showProfileImage = profileImageUrl && !imageError

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-ink-950 pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="blueprint-grid absolute inset-0 opacity-40" />
      <ParticleField className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      <Container className="relative grid gap-16 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-start">
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
            className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-paper-50 md:text-6xl"
          >
            Construo backends confiáveis que escalam junto com o produto, sem virar dor de cabeça pra quem mantém
            depois<span className="text-amber-500">.</span>
          </motion.h1>

          <motion.p variants={fadeVariant} className="max-w-xl text-lg leading-relaxed text-paper-400">
            Sou <strong className="font-semibold text-paper-50">Robson José</strong>, também conhecido como{' '}
            <strong className="font-semibold text-paper-50">CodeMaster</strong>, desenvolvedor fullstack com foco em
            backend. Atuo na arquitetura de APIs, automações e soluções multiplataforma, priorizando confiabilidade,
            clareza e performance.
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
        </motion.div>

        {/* RIGHT — technical readout */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="corner-frame hairline relative flex flex-col gap-6 bg-ink-900/70 p-6 backdrop-blur md:p-8"
        >
          <div className="flex items-center gap-4">
            <div className="overflow-hidden rounded border border-ink-700 bg-ink-950">
              {showProfileImage ? (
                <img
                  src={profileImageUrl}
                  alt="Foto de Robson José"
                  className="h-16 w-16 object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center text-sm font-semibold text-paper-400">
                  RJ
                </div>
              )}
            </div>
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-paper-400">Perfil</p>
              <p className="font-mono text-sm text-paper-50">Sistemas &amp; Automações</p>
            </div>
          </div>

          <p className="text-balance text-sm leading-relaxed text-paper-400">
            Do banco de dados à interface, cada camada construída para durar e ser fácil de manter.
          </p>

          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-paper-400">
            <span className="text-paper-50">Web</span>
            <span className="h-1 w-1 bg-amber-500" />
            <span className="text-paper-50">Desktop</span>
            <span className="h-1 w-1 bg-amber-500" />
            <span className="text-paper-50">Mobile</span>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded border border-ink-700 bg-ink-700 sm:grid-cols-3">
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="bg-ink-900 p-4">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper-400">{metric.label}</p>
                <p className="mt-2 font-display text-lg font-semibold text-paper-50">{metric.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
