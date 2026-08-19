import { cn } from '@/utils/cn'
import { getCategoryColor, type TechGraphData } from '@/utils/tech-graph'

type GraphListViewProps = {
  data: TechGraphData
  activeCategory: string | null
  selectedId: string | null
  onSelect: (id: string | null) => void
}

export const GraphListView = ({ data, activeCategory, selectedId, onSelect }: GraphListViewProps) => {
  const categories = activeCategory ? data.categories.filter((name) => name === activeCategory) : data.categories

  return (
    <div className="hairline max-h-[560px] space-y-6 overflow-y-auto bg-ink-950 p-6">
      {categories.map((categoryName) => {
        const color = getCategoryColor(data.categories, categoryName)
        const tools = data.nodes.filter((node) => node.kind === 'tool' && node.category === categoryName)

        return (
          <div key={categoryName}>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em]" style={{ color }}>
              {categoryName}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <li key={tool.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(tool.id === selectedId ? null : tool.id)}
                    aria-pressed={tool.id === selectedId}
                    className={cn(
                      'rounded border border-ink-700 px-3 py-1.5 font-mono text-xs text-paper-200 transition-colors hover:border-amber-500/60 hover:text-paper-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
                      tool.id === selectedId && 'border-amber-500 text-paper-50',
                    )}
                  >
                    {tool.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
