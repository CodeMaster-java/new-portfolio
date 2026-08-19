import { LayoutGrid, Waypoints } from 'lucide-react'
import { lazy, Suspense, useMemo, useState } from 'react'

import { DetailPanel } from '@/components/tech-graph/DetailPanel'
import { GraphListView } from '@/components/tech-graph/GraphListView'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useIsMobile } from '@/hooks/useIsMobile'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/utils/cn'
import { buildTechGraph, getCategoryColor } from '@/utils/tech-graph'

const GraphCanvas = lazy(() => import('@/components/tech-graph/GraphCanvas').then((mod) => ({ default: mod.GraphCanvas })))

const GraphSkeleton = () => (
  <div className="blueprint-grid flex h-[480px] w-full animate-pulse items-center justify-center rounded border border-ink-700 bg-ink-950 md:h-[560px]">
    <p className="font-mono text-xs uppercase tracking-[0.3em] text-paper-400">Carregando mapa…</p>
  </div>
)

export const TechGraph = () => {
  const data = useMemo(() => buildTechGraph(), [])
  const isMobile = useIsMobile(768)
  const reducedMotion = usePrefersReducedMotion()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showList, setShowList] = useState(false)

  const toggleCategory = (name: string) => {
    setActiveCategory((current) => (current === name ? null : name))
    setSelectedId(null)
  }

  return (
    <section id="tech" className="py-20">
      <Container className="space-y-10">
        <SectionHeading
          index={2}
          label="Tecnologias"
          title="Um mapa vivo da stack, não uma lista de badges."
          description="Cada nó é uma ferramenta usada de verdade nos projetos abaixo; as ligações vêm de tecnologias que apareceram juntas no mesmo projeto. Arraste, aproxime e clique para explorar."
        />

        <div className="flex flex-wrap items-center gap-2">
          {data.categories.map((category) => {
            const color = getCategoryColor(data.categories, category)
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                aria-pressed={isActive}
                className={cn(
                  'flex items-center gap-2 rounded border border-ink-700 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-paper-400 transition-colors hover:border-amber-500/60 hover:text-paper-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
                  isActive && 'border-amber-500 text-paper-50',
                )}
              >
                <span className="h-2 w-2" style={{ backgroundColor: color }} />
                {category}
              </button>
            )
          })}

          {!isMobile ? (
            <button
              type="button"
              onClick={() => setShowList((prev) => !prev)}
              className="ml-auto flex items-center gap-2 rounded border border-ink-700 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-paper-400 transition-colors hover:border-amber-500/60 hover:text-paper-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-pressed={showList}
            >
              {showList ? <Waypoints className="h-3.5 w-3.5" /> : <LayoutGrid className="h-3.5 w-3.5" />}
              {showList ? 'Ver como grafo' : 'Ver como lista'}
            </button>
          ) : null}
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {isMobile || showList ? (
            <GraphListView data={data} activeCategory={activeCategory} selectedId={selectedId} onSelect={setSelectedId} />
          ) : (
            <Suspense fallback={<GraphSkeleton />}>
              <GraphCanvas
                data={data}
                activeCategory={activeCategory}
                selectedId={selectedId}
                onSelect={setSelectedId}
                reducedMotion={reducedMotion}
              />
            </Suspense>
          )}
          <DetailPanel data={data} selectedId={selectedId} onClose={() => setSelectedId(null)} />
        </div>
      </Container>
    </section>
  )
}
