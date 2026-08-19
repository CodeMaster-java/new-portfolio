import { Github, MessageCircle } from 'lucide-react'

import { Container } from '@/components/ui/Container'

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/CodeMaster-java',
    icon: Github,
  },
  {
    label: 'Discord',
    href: 'https://discord.com/users/962811453293875220',
    icon: MessageCircle,
  },
]

export const Footer = () => (
  <footer className="border-t border-ink-700 py-10">
    <Container className="flex flex-col gap-6 font-mono text-sm text-paper-400 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-semibold uppercase tracking-[0.4em] text-paper-200">CodeMaster</p>
        <p className="mt-2 text-paper-400">Fullstack por profissão. Backend por paixão.</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-11 items-center gap-2 rounded border border-ink-700 px-3 py-2 text-paper-400 transition-colors hover:border-amber-500/60 hover:text-paper-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </a>
        ))}
        <a
          href="https://codetime.dev"
          target="_blank"
          rel="noreferrer"
          className="flex items-center rounded border border-ink-700 px-3 py-2 transition-colors hover:border-amber-500/60"
        >
          <img
            src="https://shields.jannchie.com/endpoint?style=social&color=222&url=https%3A%2F%2Fapi.codetime.dev%2Fv3%2Fusers%2Fshield%3Fuid%3D31383"
            alt="CodeTime tracking badge"
            className="h-6 w-auto"
          />
        </a>
      </div>
    </Container>
  </footer>
)
