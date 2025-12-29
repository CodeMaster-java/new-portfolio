import { Globe, Mail, MessageCircle, type LucideIcon } from 'lucide-react'

export type Proficiency =
  | 'basic'
  | 'intermediate'
  | 'proficient'
  | 'advanced'
  | 'expert'

export type StackCategory = {
  name: string
  description: string
  tools: {
    label: string
    proficiency: Proficiency
  }[]
}

export type ProjectItem = {
  name: string
  description: string
  tech: string[]
  role: string
  year: string
  link?: string
}

export type ExperienceHighlight = {
  title: string
  period: string
  description: string
  outcomes: string[]
}

export type ContactChannel = {
  label: string
  value: string
  href: string
  icon: LucideIcon
}

export const navItems = [
  { id: 'hero', label: 'Visão Geral' },
  { id: 'about', label: 'Sobre' },
  { id: 'tech', label: 'Tecnologias' },
  { id: 'projects', label: 'Projetos' },
  { id: 'experience', label: 'Experiência' },
  { id: 'contact', label: 'Contato' },
] as const

export const heroMetrics = [
  { label: 'Anos criando sistemas', value: '6+' },
  { label: 'Plataformas entregues', value: 'Web · Desktop · Mobile' },
  { label: 'Integrações orquestradas', value: '40+ integrações' },
]

export const heroTags = [
  'Fullstack · foco em backend',
  'Engenharia de APIs e sistemas',
  'Automatizações multiplataforma',
]

export const stackCategories: StackCategory[] = [
  {
    name: 'Backend & Sistemas',
    description: 'Desenhando arquiteturas resilientes, integrações e pipelines de automação.',
    tools: [
      { label: 'Node.js', proficiency: 'expert' },
      { label: 'Python', proficiency: 'expert' },
      { label: 'Express', proficiency: 'advanced' },
      { label: 'Java', proficiency: 'intermediate' },
      { label: 'C#', proficiency: 'intermediate' },
      { label: 'Lua', proficiency: 'proficient' },
      { label: 'Zod', proficiency: 'advanced' },
      { label: 'REST · Integrations', proficiency: 'expert' },
    ],
  },
  {
    name: 'Experiência Frontend',
    description: 'Criando interfaces expressivas com sistemas de componentes escaláveis.',
    tools: [
      { label: 'React', proficiency: 'expert' },
      { label: 'Next.js', proficiency: 'advanced' },
      { label: 'TypeScript', proficiency: 'expert' },
      { label: 'Tailwind CSS', proficiency: 'advanced' },
      { label: 'Chart.js', proficiency: 'proficient' },
      { label: 'styled-components', proficiency: 'advanced' },
      { label: 'Recharts', proficiency: 'proficient' },
    ],
  },
  {
    name: 'Desktop & Mobile',
    description: 'Entregando experiências coesas além do navegador com núcleos compartilhados.',
    tools: [
      { label: 'Electron', proficiency: 'advanced' },
      { label: 'React Native', proficiency: 'proficient' },
    ],
  },
  {
    name: 'Dados & Ops',
    description: 'Cultura DevOps enxuta, observabilidade e entrega guiada por qualidade.',
    tools: [
      { label: 'MySQL', proficiency: 'advanced' },
      { label: 'SQLite', proficiency: 'proficient' },
      { label: 'Git & GitHub', proficiency: 'expert' },
      { label: 'Linux', proficiency: 'intermediate' },
      { label: 'CI/CD automation', proficiency: 'advanced' },
    ],
  },
]

export const projectItems: ProjectItem[] = [
  {
    name: 'Meu Primeiro Portfólio',
    description:
      'Portfólio pessoal com navegação fluida, tema claro/escuro sincronizado, traduções em tempo real e animações discretas otimizadas para diferentes dispositivos.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Context API'],
    role: 'Responsável pelo projeto',
    year: '2024',
    link: 'https://github.com/CodeMaster-java/PortFolio',
  },
  {
    name: 'WorkTime System · Controle de Ponto',
    description:
      'Plataforma corporativa de ponto eletrônico com autenticação em múltiplos níveis, dashboards em tempo real, notificações automáticas e exportações em PDF/CSV.',
    tech: ['React', 'TypeScript', 'PHP', 'MySQL', 'Tailwind CSS', 'Vite', 'Chart.js'],
    role: 'Líder técnico · Fullstack',
    year: '2025',
  },
  {
    name: 'BotDeck · Discord Bot Manager',
    description:
      'Aplicativo desktop para orquestrar bots Discord com logs em tempo real, diagnósticos automáticos, atalhos de teclado e gerenciamento centralizado de múltiplos perfis.',
    tech: ['Electron', 'Node.js', 'JavaScript', 'Python', 'CSS', 'HTML'],
    role: 'Autor e mantenedor',
    year: '2025',
    link: 'https://github.com/CodeMaster-java/BotDeck',
  },
    {
    name: 'Cafe Hora Certa · Gestão Operacional',
    description:
        'Painel operacional para cafeterias com KPIs de faturamento diário/mensal, gráficos Recharts interativos, módulo POS com catálogo filtrável, carrinho lateral e modal de checkout, gestão de estoque com busca/categorias, relatórios com exportações PDF/CSV e gerenciamento completo de usuários com avatars, autenticação por sessões e trilhas de auditoria.',
    tech: [
        'React',
        'TypeScript',
        'Vite',
        'styled-components',
        'Context API',
        'Recharts',
        'Node.js',
        'Express',
        'MySQL',
        'Zod'
    ],
    role: 'Autor e mantenedor · Fullstack',
    year: '2025',
    },
]

export const experienceHighlights: ExperienceHighlight[] = [
  {
    title: 'Desenvolvedor Fullstack · Autônomo',
    period: '2021 — Atual',
    description:
      'Liderando entregas de plataformas sob medida com foco em excelência de backend, experiência do desenvolvedor e resultados mensuráveis.',
    outcomes: [
      'Escalei suíte de automação processando 1M+ eventos/mês',
      'Desenhei gateways de API modulares que viabilizam integrações fluídas com parceiros',
      'Mentorei equipes multifuncionais em clean architecture e cadência de entrega',
    ],
  },
  {
    title: 'Desenvolvedor Web · Fire Hosting (encerrada)',
    period: '2025 — Projeto encerrado',
    description:
      'Atuei em uma equipe enxuta criando experiências web para clientes de hospedagem, alinhando desenvolvimento e infraestrutura.',
    outcomes: [
      'Construí painéis administrativos e integrações para produtos SaaS de clientes',
      'Automatizei rotinas de deploy e monitoramento em ambiente de hospedagem compartilhada',
      'Colaborei com equipe reduzida para lançar landing pages performáticas sob demanda',
    ],
  },
  {
    title: 'Técnico de TI Freelancer',
    period: '2025 — 2025',
    description:
      'Prestei suporte técnico e consultoria para pequenas empresas, garantindo operação estável e treinamentos práticos.',
    outcomes: [
      'Implementei políticas de backup e recuperação alinhadas ao porte de cada cliente',
      'Padronizei monitoramento preventivo e suporte remoto para reduzir tempo de inatividade',
      'Capacitei usuários em ferramentas colaborativas e boas práticas de segurança',
    ],
  },
]

export const education = [
  {
    program: 'Bacharelado em Sistemas de Informação',
    status: 'Em andamento',
  },
  {
    program: 'Técnico em Tecnologia da Informação',
    status: 'Concluído',
  },
]

export const contactChannels: ContactChannel[] = [
  {
    label: 'E-mail',
    value: 'robsonjosecorreacarvalho@gmail.com',
    href: 'mailto:robsonjosecorreacarvalho@gmail.com',
    icon: Mail,
  },
  {
    label: 'Portfólio',
    value: 'port-folio-two-indol.vercel.app',
    href: 'https://port-folio-two-indol.vercel.app',
    icon: Globe,
  },
  {
    label: 'Discord',
    value: 'codemaster_42',
    href: 'https://discord.com/users/962811453293875220',
    icon: MessageCircle,
  },
]
