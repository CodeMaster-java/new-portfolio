import { motion } from 'framer-motion'

import { Chip } from '@/components/ui/Chip'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { education } from '@/utils/portfolio-data'

const summaryPoints = [
  'Mentalidade backend-first com olhar de designer para fluxo e narrativa',
  'Arquitetando APIs escaláveis, integrações e sistemas guiados por domínio',
  'Defendendo clean code, ferramentas sustentáveis e habilitação do time',
]

export const About = () => (
  <section id="about" className="py-20">
    <Container className="grid gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start">
      <div className="space-y-8">
        <SectionHeading
          label="Sobre"
          title="Fullstack por profissão. Backend por paixão."
          description="Transformo requisitos complexos em plataformas confiáveis. De orquestração de serviços a dashboards imersivos, construo produtos que as equipes podem escalar e confiar."
        />
        <div className="space-y-4">
          {summaryPoints.map((point) => (
            <motion.p
              key={point}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4 }}
              className="text-base leading-relaxed text-white/70"
            >
              {point}
            </motion.p>
          ))}
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {education.map((item) => (
            <motion.div
              key={item.program}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-white/5 bg-surface-800/50 p-6"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-white/40">Formação</p>
              <p className="mt-4 text-lg font-semibold text-white">{item.program}</p>
              <p className="mt-2 text-sm text-white/50">{item.status}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-6 rounded-3xl border border-white/5 bg-gradient-to-br from-surface-800/80 via-surface-800/40 to-surface-900/80 p-8"
      >
        <Chip className="self-start" leadingIcon={<span className="h-2 w-2 rounded-full bg-primary-400" />}>Princípios de atuação</Chip>
        <ul className="space-y-4 text-sm text-white/60">
          <li>• Entregar sistemas calmos e previsíveis que sustentam fluxos críticos de negócio.</li>
          <li>• Projetar para manutenção: código legível, documentação narrativa, verificações automatizadas.</li>
          <li>• Defender UX significativa mesmo em ferramentas internas — pensamento de produto não termina na API.</li>
          <li>• Investir na ergonomia do desenvolvedor: pipelines, observabilidade e ciclos de feedback que destravam equipes.</li>
        </ul>
        <div className="rounded-2xl border border-primary-400/40 bg-primary-500/10 p-6 text-sm text-primary-100">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary-200">Foco atual</p>
          <p className="mt-2 text-base text-primary-50">
            Compor malhas de automação, evoluir design systems e mentorar times que escalam entre web, desktop e mobile.
          </p>
        </div>
      </motion.div>
    </Container>
  </section>
)
