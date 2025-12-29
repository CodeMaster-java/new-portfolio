import { motion } from 'framer-motion'
import { SendHorizonal } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { contactChannels } from '@/utils/portfolio-data'

const CONTACT_EMAIL = 'robsonjosecorreacarvalho@gmail.com'
const CONTACT_SUBJECT = 'Possível colaboração técnica — Robson José'
const CONTACT_BODY = `Olá Robson,

Gostaria de conversar sobre um possível projeto de desenvolvimento fullstack.

Algumas informações iniciais:
- Contexto do projeto:
- Desafio técnico principal:
- Objetivos esperados:
- Prazo estimado (se houver):

Fico no aguardo.
Obrigado!`

const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodeURIComponent(
  CONTACT_EMAIL,
)}&su=${encodeURIComponent(CONTACT_SUBJECT)}&body=${encodeURIComponent(CONTACT_BODY)}`

export const Contact = () => (
  <section id="contact" className="py-20">
    <Container className="space-y-12">
      <SectionHeading
        label="Contato"
        title="Vamos construir o que vem a seguir."
        description="Disponível para posições sêniores focadas em backend, consultorias e colaborações onde clareza e craft importam."
      />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {contactChannels.map((channel) => (
            <Card key={channel.label}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">{channel.label}</p>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="mt-2 block text-lg font-semibold text-white hover:text-primary-200"
                  >
                    {channel.value}
                  </a>
                </div>
                <channel.icon className="h-5 w-5 text-primary-200" />
              </div>
            </Card>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="h-full">
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-white/40">Alinhamento de colaboração</p>
                <p className="text-base leading-relaxed text-white/60">
                  Eu prospero liderando a estratégia de backend de produtos ambiciosos, conectando isso a experiências bem desenhadas e ferramental sólido para o time.
                </p>
                <p className="text-base leading-relaxed text-white/60">
                  Vamos conversar se você precisa de sistemas automatizados, modernização de plataformas ou uma liderança que conecte arquitetura e UX sem fricção.
                </p>
              </div>
              <Button
                href={GMAIL_COMPOSE_URL}
                target="_blank"
                rel="noreferrer"
                className="self-start"
              >
                Iniciar conversa
                <SendHorizonal className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </Container>
  </section>
)
