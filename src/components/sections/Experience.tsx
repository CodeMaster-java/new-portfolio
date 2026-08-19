import { motion } from 'framer-motion'
import { BriefcaseBusiness, Gauge, Workflow } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { experienceHighlights } from '@/utils/portfolio-data'

const signalHighlights = [
  {
    icon: Gauge,
    title: 'Observabilidade desde o início',
    description: 'Logs, métricas e dashboards fazem parte do projeto desde a primeira versão, não depois que algo quebra.',
  },
  {
    icon: Workflow,
    title: 'Automação em primeiro lugar',
    description: 'Pipelines de CI/CD e checagens automáticas que tornam cada entrega mais previsível.',
  },
]

export const Experience = () => (
  <section id="experience" className="py-20">
    <Container className="space-y-12">
      <SectionHeading
        index={4}
        label="Experiência"
        title="Entregas previsíveis, em times e plataformas diferentes."
        description="Histórico liderando projetos backend-first sem abrir mão de uma boa experiência de uso."
      />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        <ol className="relative space-y-10 border-l border-ink-700 pl-8">
          {experienceHighlights.map((item, index) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative"
            >
              <span
                className={
                  index === 0
                    ? 'absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-amber-500'
                    : 'absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full border border-paper-400/60 bg-ink-950'
                }
              />
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-paper-400">{item.period}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-paper-50">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-400">{item.description}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-paper-200">
                {item.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 bg-amber-500" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="flex flex-col gap-6"
        >
          <Card>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness className="h-5 w-5 text-amber-500" />
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-paper-400">Recorte de habilidades</p>
              </div>
              <p className="text-sm leading-relaxed text-paper-400">
                Atuação fullstack com ênfase em backend: arquitetura de sistemas, integrações e decisões guiadas por dados
                reais de uso. Confortável liderando projetos sozinho ou colaborando com times maiores.
              </p>
              <div className="grid gap-3 text-sm text-paper-400">
                <span>• Arquitetura: modelagem de domínio, sistemas orientados a eventos, plataformas de API</span>
                <span>• Qualidade: testes automatizados, pipelines de entrega, documentação como parte do processo</span>
                <span>• Colaboração: alinhamento de escopo, mentoria técnica, comunicação direta com quem decide</span>
              </div>
            </div>
          </Card>
          {signalHighlights.map((signal) => (
            <Card key={signal.title}>
              <div className="flex items-start gap-4">
                <signal.icon className="h-5 w-5 flex-shrink-0 text-amber-500" />
                <div className="space-y-2">
                  <h4 className="text-base font-semibold text-paper-50">{signal.title}</h4>
                  <p className="text-sm leading-relaxed text-paper-400">{signal.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </Container>
  </section>
)
