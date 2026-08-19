import { motion } from 'framer-motion'

import { Chip } from '@/components/ui/Chip'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { education } from '@/utils/portfolio-data'

const summaryPoints = [
  'Mentalidade backend-first, mas com atenção ao fluxo e à experiência de quem usa',
  'Arquitetura de APIs escaláveis, integrações e sistemas modelados por domínio',
  'Clean code, ferramentas sustentáveis e documentação que realmente ajuda o time',
]

export const About = () => (
  <section id="about" className="py-20">
    <Container className="grid gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start">
      <div className="space-y-8">
        <SectionHeading
          index={1}
          label="Sobre"
          title="Fullstack por profissão. Backend por paixão."
          description="Transformo requisitos complexos em sistemas confiáveis: de integrações de backend a dashboards que o time realmente usa no dia a dia."
        />
        <div className="space-y-4">
          {summaryPoints.map((point) => (
            <motion.p
              key={point}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-base leading-relaxed text-paper-400"
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hairline rounded bg-ink-900 p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-paper-400">Formação</p>
              <p className="mt-4 text-lg font-semibold text-paper-50">{item.program}</p>
              <p className="mt-2 text-sm text-paper-400">{item.status}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hairline flex flex-col gap-6 rounded bg-ink-900 p-8"
      >
        <Chip className="self-start" leadingIcon={<span className="h-1.5 w-1.5 bg-amber-500" />}>
          Princípios de atuação
        </Chip>
        <ul className="space-y-4 text-sm text-paper-400">
          <li>• Entregar sistemas calmos e previsíveis que sustentam fluxos críticos de negócio.</li>
          <li>• Projetar para manutenção: código legível, documentação clara, verificações automatizadas.</li>
          <li>• Cuidar da UX mesmo em ferramentas internas: pensar em produto não termina na API.</li>
          <li>• Investir em pipelines, observabilidade e ciclos de feedback que destravam o time.</li>
        </ul>
        <div className="rounded border border-petrol-500/40 bg-petrol-500/10 p-6 text-sm">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-petrol-400">Foco atual</p>
          <p className="mt-2 text-base text-paper-50">
            Evoluir a plataforma de mensageria e automações internas da H&A AF Tecnologia LTDA, mantendo design systems
            consistentes e entregas backend-first em produção.
          </p>
        </div>
      </motion.div>
    </Container>
  </section>
)
