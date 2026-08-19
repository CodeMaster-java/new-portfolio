import { X } from 'lucide-react'

import { getCategoryColor, type TechGraphData } from '@/utils/tech-graph'

type DetailPanelProps = {
  data: TechGraphData
  selectedId: string | null
  onClose: () => void
}

export const DetailPanel = ({ data, selectedId, onClose }: DetailPanelProps) => {
  const node = data.nodes.find((item) => item.id === selectedId)

  if (!node) {
    return (
      <div className="hairline flex h-full flex-col justify-center gap-2 bg-ink-900 p-6 text-sm text-paper-400">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-paper-400">Nó selecionado</p>
        <p>Passe o mouse ou clique em um nó do grafo para ver detalhes.</p>
      </div>
    )
  }

  const color = getCategoryColor(data.categories, node.category)
  const relatedTools =
    node.kind === 'category' ? data.nodes.filter((item) => item.kind === 'tool' && item.category === node.category) : []

  return (
    <div className="hairline flex h-full flex-col gap-4 bg-ink-900 p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em]" style={{ color }}>
            {node.category}
          </p>
          <p className="mt-1 font-display text-xl font-semibold text-paper-50">{node.label}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Limpar seleção"
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded border border-ink-700 text-paper-400 transition-colors hover:border-amber-500/60 hover:text-paper-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {node.kind === 'category' ? (
        <>
          <p className="text-sm leading-relaxed text-paper-400">{node.description}</p>
          <div className="space-y-2">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-paper-400">
              Ferramentas ({relatedTools.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {relatedTools.map((tool) => (
                <span key={tool.id} className="rounded border border-ink-700 px-2 py-1 font-mono text-[0.65rem] text-paper-200">
                  {tool.label}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-2">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-paper-400">
            Usado em {node.projects.length} projeto{node.projects.length === 1 ? '' : 's'}
          </p>
          {node.projects.length > 0 ? (
            <ul className="space-y-1.5 text-sm text-paper-200">
              {node.projects.map((project) => (
                <li key={project} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0" style={{ backgroundColor: color }} />
                  {project}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-paper-400">Skill de base, ainda sem projeto de portfolio associado.</p>
          )}
        </div>
      )}
    </div>
  )
}
