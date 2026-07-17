import { motion } from 'framer-motion'
import { BriefcaseBusiness, Gauge, Workflow } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
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
        label="Experiência"
        title="Entregas previsíveis, em times e plataformas diferentes."
        description="Histórico liderando projetos backend-first sem abrir mão de uma boa experiência de uso."
      />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        <div className="space-y-6">
          {experienceHighlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <Card>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/40">{item.period}</p>
                    </div>
                    <Chip className="text-[0.6rem] tracking-[0.4em] text-white/40">Impacto</Chip>
                  </div>
                  <p className="text-sm leading-relaxed text-white/60">{item.description}</p>
                  <ul className="space-y-3 text-sm text-white/60">
                    {item.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary-400" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="flex flex-col gap-6"
        >
          <Card>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness className="h-5 w-5 text-primary-200" />
                <p className="text-sm uppercase tracking-[0.3em] text-white/40">Recorte de habilidades</p>
              </div>
              <p className="text-sm leading-relaxed text-white/60">
                Atuação fullstack com ênfase em backend: arquitetura de sistemas, integrações e decisões guiadas por dados reais de uso. Confortável liderando projetos sozinho ou colaborando com times maiores.
              </p>
              <div className="grid gap-3 text-sm text-white/60">
                <span>• Arquitetura: modelagem de domínio, sistemas orientados a eventos, plataformas de API</span>
                <span>• Qualidade: testes automatizados, pipelines de entrega, documentação como parte do processo</span>
                <span>• Colaboração: alinhamento de escopo, mentoria técnica, comunicação direta com quem decide</span>
              </div>
            </div>
          </Card>
          {signalHighlights.map((signal) => (
            <Card key={signal.title}>
              <div className="flex items-start gap-4">
                <signal.icon className="h-5 w-5 flex-shrink-0 text-primary-200" />
                <div className="space-y-2">
                  <h4 className="text-base font-semibold text-white">{signal.title}</h4>
                  <p className="text-sm leading-relaxed text-white/60">{signal.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </Container>
  </section>
)
