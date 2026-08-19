import { Mail, MessageCircle, PhoneCall, type LucideIcon } from 'lucide-react'

import cdrLoginImage from '@/assets/projects/cdr-login.png'
import gmpLoginImage from '@/assets/projects/gmp-login.png'

export type StackCategory = {
  name: string
  description: string
  tools: string[]
}

export type ProjectItem = {
  name: string
  description: string
  tech: string[]
  role: string
  year: string
  link?: string
  demo?: string
  image?: string
  client?: string
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
  { label: 'Integrações orquestradas', value: '200+ integrações' },
]

export const heroTags = [
  'Fullstack · foco em backend',
  'Engenharia de APIs e sistemas',
  'Automatizações multiplataforma',
]

export const stackCategories: StackCategory[] = [
  {
    name: 'Backend & Sistemas',
    description: 'Arquiteturas backend resilientes, integrações de sistemas e pipelines de automação.',
    tools: ['Node.js', 'Python', 'FastAPI', 'Express', 'Java', 'C#', 'Zod', 'REST · Integrations'],
  },
  {
    name: 'Frontend',
    description: 'Interfaces expressivas construídas com sistemas de componentes escaláveis.',
    tools: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'CSS',
      'HTML',
      'Vite',
      'Framer Motion',
      'Zustand',
      'Context API',
      'Zod',
      'Chart.js',
      'styled-components',
      'Recharts',
    ],
  },
  {
    name: 'Desktop & Mobile',
    description: 'Experiências coesas além do navegador, com núcleos de lógica compartilhados entre plataformas.',
    tools: ['Electron', 'React Native', 'Kotlin', 'Jetpack Compose', 'Room', 'Hilt', 'Coroutines'],
  },
  {
    name: 'Games & Mods',
    description:
      'Experiências customizadas dentro de engines existentes, com foco em usabilidade e tooling para jogadores.',
    tools: ['Lua', 'Project Zomboid Modding', 'UI/UX In-Game', 'Localization', 'Steam Workshop tooling'],
  },
  {
    name: 'Dados & Ops',
    description: 'Observabilidade, DevOps enxuto e entrega guiada por qualidade.',
    tools: ['MySQL', 'SQLite', 'Git & GitHub', 'Linux', 'Docker', 'Gradle', 'CI/CD automation'],
  },
  {
    name: 'Tooling & Media',
    description: 'Automação de downloads, encoding e pipelines de assets multimídia.',
    tools: ['FFmpeg', 'yt-dlp'],
  },
]

export const projectItems: ProjectItem[] = [
  {
    name: 'CDR · Controle de Reclamações',
    description:
      'Sistema de gestão de ocorrências para frotas de transporte (ônibus escolares e vermelhinhos) da Ouro Negro Transporte e Turismo. Centraliza o registro de reclamações e avarias por veículo, com painel Kanban em tempo real e sincronização automática de status via integração com sistema legado externo (Escalante Pro). Uma máquina de estados decide o status operacional com base nas ocorrências ativas, evitando conflito entre ações manuais e atualizações da API externa, com histórico auditável de cada transição. Arquitetura multi-tenant isola dados por empresa/base. Mais de 75 veículos cadastrados, com todo o fluxo auditado ponta a ponta.',
    tech: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'Drizzle ORM',
      'PostgreSQL',
      'Docker',
      'GitHub Actions',
    ],
    role: 'Autor · Fullstack',
    client: 'Ouro Negro Transporte e Turismo',
    year: '2026',
    image: cdrLoginImage,
  },
  {
    name: 'Agente Royalties',
    description:
      'Agente automatizado que consulta diariamente a API da DAF (Banco do Brasil) para acompanhar royalties de petróleo devidos a municípios, calcula variações mês a mês e notifica a diretoria via WhatsApp — eliminando a conferência manual de repasses. O maior desafio foi o parsing dos relatórios da DAF: o valor da parcela vem numa linha sem data própria, exigindo rastrear e "herdar" a data de uma linha anterior de outra rubrica, além de ignorar totalizadores que repetem o mesmo padrão. Também exigiu idempotência (não reconsultar competências já concluídas), detecção de mudança real de valores — a DAF republica dados — e correção de um bug de competência no scheduler. Em produção monitorando 9 municípios do Rio de Janeiro, com suíte de 229+ testes unitários; substitui a checagem manual diária por notificação no WhatsApp com valor, data e variação percentual/histórica.',
    tech: [
      'Python 3.12',
      'FastAPI',
      'PostgreSQL 16',
      'SQLAlchemy 2.0 (async)',
      'Alembic',
      'APScheduler',
      'Pydantic Settings v2',
      'Loguru',
      'httpx',
      'Docker',
      'GitHub Actions',
      'Evolution API',
    ],
    role: 'Autor · Backend',
    client: 'H&A AF Tecnologia LTDA',
    year: '2026',
  },
  {
    name: 'grit-whatsapp-service · API interna',
    description:
      'Microserviço corporativo que abstrai completamente o provedor de WhatsApp (hoje Evolution API) dos sistemas internos da Grit Tecnologia — nenhum sistema cliente fala com o provedor diretamente, então trocar de provedor no futuro não quebra ninguém. Arquitetura em três camadas (Provider → Capability → Dispatch): a Capability Layer resolve o que uma instância suporta sem chamada de rede, e a Dispatch Layer valida e monta o plano de envio completo antes de qualquer ação de negócio ser executada. Pipeline assíncrono com idempotência determinística (dedup por sha256), filas dedicadas com dead-letter queue, e deploy próprio com rollback automático e healthcheck de todos os componentes (containers, Postgres, Redis, API, workers). Já consumido pelo Agente Royalties, com Financeiro, RH, OuroPortal e Vertex Workspace no roadmap. Ainda sem tráfego real de produção — como indicador de maturidade técnica: 50 commits, ~335 arquivos TypeScript, 13 migrations de banco e 67 arquivos de teste automatizado (~58% de cobertura).',
    tech: [
      'Node.js 22',
      'TypeScript',
      'Fastify 5',
      'Zod',
      'PostgreSQL',
      'Prisma',
      'Redis',
      'BullMQ',
      'Prometheus',
      'Grafana',
      'Docker',
      'GitHub Actions',
    ],
    role: 'Autor · Backend',
    client: 'H&A AF Tecnologia LTDA',
    year: '2026',
  },
  {
    name: 'GMP Dashboard · Grit Messaging Platform',
    description:
      'Painel administrativo web da Grit Messaging Platform. Dá a times técnicos e operacionais da Grit Tecnologia visibilidade e controle sobre instâncias WhatsApp, filas, workers, mensagens, logs e métricas sem precisar acessar o backend diretamente. Consome a API do grit-whatsapp-service através de um client HTTP próprio com interceptors e autenticação por API Key/JWT. Migração progressiva de dados mockados para dados reais em tempo real (filas, throughput de workers), mantendo a UI consistente durante a transição — e contornando o bloqueio de pareamento de dispositivo por passkey/WebAuthn introduzido pelo WhatsApp, que impediu re-parear a instância dedicada nova e forçou manter a instância antiga compartilhada enquanto o problema era investigado.',
    tech: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'TanStack Query',
      'Zustand',
      'Tailwind CSS 4',
      'Radix UI / shadcn',
      'Recharts',
      'React Hook Form',
      'Zod',
    ],
    role: 'Autor · Frontend',
    client: 'H&A AF Tecnologia LTDA',
    year: '2026',
    image: gmpLoginImage,
  },
  {
    name: 'NeoFinance',
    description:
      'Plataforma pessoal de gestão financeira que centraliza contas bancárias, cartões, faturas, parcelamentos, dívidas, orçamentos, metas e projeção de fluxo de caixa em um só lugar, com sincronização automática de contas via Open Finance (Pluggy) e um consultor de IA que analisa os dados financeiros do usuário — no lugar de planilhas manuais ou o app isolado de cada banco. A integração com Open Finance resolve o nome e o ícone real da instituição por trás de conectores-proxy, trata webhooks assíncronos de atualização de conta e reconcilia transações sem duplicar. O modelo de permissão multi-workspace é verificado ao vivo no banco — não no JWT — revogando acesso na hora quando alguém é removido, em vez de esperar o token expirar. Produto próprio, em produção desde 14/07/2026, rodando em infraestrutura self-hosted (Hetzner + Docker + Caddy), sem depender de PaaS. Conta com 20 módulos de domínio, suíte de testes automatizados, pipeline de CI/CD com deploy automático e conformidade com LGPD, com aceite de termos validado no backend.',
    tech: [
      'TypeScript',
      'Fastify 5',
      'Prisma',
      'PostgreSQL',
      'Redis',
      'React',
      'Vite',
      'TanStack Query',
      'Tailwind CSS',
      'shadcn/ui',
      'Pluggy (Open Finance)',
      'Ollama (LLM self-hosted)',
      'Sentry',
      'Docker',
      'Caddy',
    ],
    role: 'Autor · Fullstack · Produto próprio',
    year: '2026',
    demo: 'https://neocofre.com.br',
  },
  {
    name: 'Astra Bot Loading Page (Next.js)',
    description:
      'Landing/loading de portfolio para bot Discord com métricas vivas, timeline de inicialização, skeletons reais, micro-motions, sparkline de latência e painel de comandos com busca, hotkeys e filtros.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    role: 'Autor · Frontend',
    year: '2026',
    link: 'https://github.com/CodeMaster-java/astrabot-loadingpage.git',
    demo: 'https://astrabot-loadingpage.vercel.app/',
  },
  {
    name: 'YouTube Converter (Electron + Python)',
    description:
      'App desktop para download/conversão de vídeos do YouTube com backend FastAPI/yt-dlp, UI Electron, seleção de pasta, miniatura ao colar link, progresso/cancelamento e suporte a MP3/MP4.',
    tech: ['Electron', 'Node.js', 'FastAPI', 'Python', 'yt-dlp', 'FFmpeg'],
    role: 'Autor · Fullstack',
    year: '2025',
    link: 'https://github.com/CodeMaster-java/YoutubeConvert',
  },
  {
    name: 'Meu Primeiro Portfólio',
    description:
      'Portfólio pessoal com navegação fluida, tema claro/escuro sincronizado, traduções em tempo real e animações discretas otimizadas para diferentes dispositivos.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Context API'],
    role: 'Autor · Fullstack',
    year: '2024',
    link: 'https://github.com/CodeMaster-java/PortFolio',
  },
  {
    name: 'Barbearia Pro',
    description:
      'Plataforma de agendamento para barbearias com landing responsiva, storytelling animado, vitrine dinâmica de serviços, mock data sincronizado e jornada completa de autenticação e reservas com microinterações suaves.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
    role: 'Autor · Frontend',
    year: '2025',
    link: 'https://github.com/CodeMaster-java/BarbeariaSite',
    demo: 'https://barbearia-site-zeta.vercel.app/',
  },
  {
    name: 'WorkTime System · Controle de Ponto',
    description:
      'Plataforma corporativa de ponto eletrônico com autenticação em múltiplos níveis, dashboards em tempo real, notificações automáticas e exportações em PDF/CSV.',
    tech: ['React', 'TypeScript', 'PHP', 'MySQL', 'Tailwind CSS', 'Vite', 'Chart.js'],
    role: 'Autor · Fullstack',
    year: '2025',
  },
  {
    name: 'BotDeck · Discord Bot Manager',
    description:
      'Aplicativo desktop para orquestrar bots Discord com logs em tempo real, diagnósticos automáticos, atalhos de teclado e gerenciamento centralizado de múltiplos perfis.',
    tech: ['Electron', 'Node.js', 'JavaScript', 'Python', 'CSS', 'HTML'],
    role: 'Autor · Fullstack',
    year: '2025',
    link: 'https://github.com/CodeMaster-java/BotDeck',
  },
  {
    name: 'MoneyFlow Finance Manager',
    description:
      'Aplicativo Android para finanças pessoais com login biométrico, gerenciamento resiliente de sessões, persistência local via Room e fluxos Compose otimizados para registrar e acompanhar transações com segurança.',
    tech: ['Kotlin', 'Jetpack Compose', 'Room', 'Hilt', 'Coroutines'],
    role: 'Autor · Mobile',
    year: '2025',
  },
  {
    name: 'Zed Toolbox',
    description:
      'Mod singleplayer para Project Zomboid com menu de cheats completo: spawn instantâneo, favoritos persistentes, presets configuráveis, utilitários de sobrevivência e interface multilíngue responsiva.',
    tech: ['Lua', 'Project Zomboid Modding', 'UI/UX In-Game', 'Localization'],
    role: 'Autor · Fullstack',
    year: '2025',
    link: 'https://github.com/CodeMaster-java/ZedToolbox',
    demo: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3623287081',
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
      'Zod',
    ],
    role: 'Autor · Fullstack',
    year: '2025',
  },
]

export const experienceHighlights: ExperienceHighlight[] = [
  {
    title: 'Auxiliar Operacional Administrativo · H&A AF Tecnologia LTDA',
    period: 'Jun 2026 — Atual',
    description:
      'Desenvolvedor sênior responsável, sozinho, pela arquitetura e desenvolvimento dos sistemas internos de mensageria e automação da empresa.',
    outcomes: [
      'Arquitetei o grit-whatsapp-service, microserviço que abstrai o provedor de WhatsApp para todos os sistemas internos da empresa',
      'Construí o GMP Dashboard, painel administrativo com visibilidade em tempo real sobre instâncias, filas e mensagens da plataforma',
      'Automatizei o monitoramento de royalties de petróleo para 9 municípios com o Agente Royalties, eliminando a conferência manual diária',
    ],
  },
  {
    title: 'Desenvolvedor Fullstack · Autônomo',
    period: '2021 — Atual',
    description:
      'Lidero entregas de plataformas sob medida para clientes, com foco em arquitetura backend sólida, ferramentas que aceleram o time e resultados que dá pra medir.',
    outcomes: [
      'Escalei suíte de automação processando 1M+ eventos/mês',
      'Desenhei gateways de API modulares que viabilizam integrações fluídas com parceiros',
      'Mentorei equipes multifuncionais em clean architecture e cadência de entrega',
    ],
  },
  {
    title: 'Desenvolvedor Web · Fire Hosting',
    period: '2025',
    description:
      'Atuei em uma equipe enxuta criando experiências web para clientes de hospedagem, alinhando desenvolvimento e infraestrutura.',
    outcomes: [
      'Construí painéis administrativos e integrações para produtos SaaS de clientes',
      'Automatizei rotinas de deploy e monitoramento em ambiente de hospedagem compartilhada',
      'Colaborei com equipe reduzida para lançar landing pages performáticas sob demanda',
      'Prestei atendimento ao cliente e resolução de problemas técnicos em ambiente de hospedagem',
    ],
  },
  {
    title: 'Técnico de TI Freelancer',
    period: '2025',
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
    label: 'WhatsApp',
    value: '+55 22 99228-2700',
    href: 'https://wa.me/5522992282700?text=Ol%C3%A1%20Robson%2C%20gostaria%20de%20conversar%20sobre%20um%20poss%C3%ADvel%20projeto%20de%20desenvolvimento%20fullstack.',
    icon: PhoneCall,
  },
  {
    label: 'Discord',
    value: 'codemaster_42',
    href: 'https://discord.com/users/962811453293875220',
    icon: MessageCircle,
  },
]
