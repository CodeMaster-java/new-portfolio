import { motion } from 'framer-motion'

import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { stackCategories } from '@/utils/portfolio-data'

export const TechStack = () => (
  <section id="tech" className="py-20">
    <Container className="space-y-12">
      <SectionHeading
        label="Tecnologias"
        title="Ferramentas que sustentam arquitetura sólida e interfaces cuidadas nos detalhes."
        description="Um conjunto testado em produção, equilibrando confiabilidade, manutenção e velocidade de entrega."
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {stackCategories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <Card className="h-full">
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                  <Chip className="text-[0.55rem] tracking-[0.4em] text-white/50">Ferramental base</Chip>
                </div>
                <p className="text-sm leading-relaxed text-white/60">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.tools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
)
