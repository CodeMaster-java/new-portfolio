import { drag } from 'd3-drag'
import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY } from 'd3-force'
import { select } from 'd3-selection'
import { zoom, zoomIdentity } from 'd3-zoom'
import { useEffect, useRef } from 'react'

import { getCategoryColor } from '@/utils/tech-graph'
import type { TechGraphData, TechNode } from '@/utils/tech-graph'

import type { D3DragEvent } from 'd3-drag'
import type { Simulation, SimulationLinkDatum, SimulationNodeDatum } from 'd3-force'
import type { D3ZoomEvent, ZoomTransform } from 'd3-zoom'

type SimNode = TechNode & SimulationNodeDatum
type SimLink = SimulationLinkDatum<SimNode> & { kind: 'hub' | 'shared-project'; weight: number }

type GraphCanvasProps = {
  data: TechGraphData
  activeCategory: string | null
  selectedId: string | null
  onSelect: (id: string | null) => void
  reducedMotion: boolean
}

const asNode = (value: SimNode | string | number): SimNode => {
  if (typeof value === 'string' || typeof value === 'number') {
    throw new Error('Expected a resolved node reference')
  }
  return value
}

const nodeRadius = (node: SimNode, degree: number) =>
  node.kind === 'category' ? 20 : 7 + Math.min(degree, 6) * 1.5

export const GraphCanvas = ({ data, activeCategory, selectedId, onSelect, reducedMotion }: GraphCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const activeCategoryRef = useRef(activeCategory)
  const selectedIdRef = useRef(selectedId)
  const hoveredIdRef = useRef<string | null>(null)
  const drawRef = useRef<() => void>(() => {})

  useEffect(() => {
    activeCategoryRef.current = activeCategory
    drawRef.current()
  }, [activeCategory])

  useEffect(() => {
    selectedIdRef.current = selectedId
    drawRef.current()
  }, [selectedId])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) {
      return
    }

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let transform: ZoomTransform = zoomIdentity

    // Measured synchronously (before the simulation is built) so forceX/forceY —
    // which cache their target accessor once at initialization — get real dimensions
    // instead of the 0/0 defaults.
    const measure = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    measure()

    const degreeById = new Map<string, number>()

    data.links.forEach((link) => {
      degreeById.set(link.source, (degreeById.get(link.source) ?? 0) + 1)
      degreeById.set(link.target, (degreeById.get(link.target) ?? 0) + 1)
    })

    const nodes: SimNode[] = data.nodes.map((node) => ({ ...node }))
    const links: SimLink[] = data.links.map((link) => ({ ...link }))
    const nodeById = new Map(nodes.map((node) => [node.id, node]))

    // Fixed (not measured) on purpose: forceX/forceY cache this accessor's result once at
    // simulation init, so tying it to the live canvas size would bake in whatever size was
    // measured first (often wrong, before fonts/layout settle) and never update again.
    const HUB_RADIUS = 170

    const categoryCenter = (category: string) => {
      const index = Math.max(0, data.categories.indexOf(category))
      const angle = (index / data.categories.length) * Math.PI * 2 - Math.PI / 2
      return { cx: Math.cos(angle) * HUB_RADIUS, cy: Math.sin(angle) * HUB_RADIUS }
    }

    const toGraphPoint = (x: number, y: number): [number, number] => {
      const [gx, gy] = transform.invert([x, y])
      return [gx - width / 2, gy - height / 2]
    }

    const hitTestNode = (gx: number, gy: number): SimNode | undefined => {
      let closest: SimNode | undefined
      let closestDistance = Infinity
      for (const node of nodes) {
        if (node.x === undefined || node.y === undefined) continue
        const r = nodeRadius(node, degreeById.get(node.id) ?? 0) + 4
        const dist = Math.hypot(node.x - gx, node.y - gy)
        if (dist <= r && dist < closestDistance) {
          closest = node
          closestDistance = dist
        }
      }
      return closest
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.save()
      ctx.translate(transform.x, transform.y)
      ctx.scale(transform.k, transform.k)
      ctx.translate(width / 2, height / 2)

      const selectedNode = selectedIdRef.current ? nodeById.get(selectedIdRef.current) : undefined
      const hoveredNode = hoveredIdRef.current ? nodeById.get(hoveredIdRef.current) : undefined
      const focusNode = selectedNode ?? hoveredNode
      const category = activeCategoryRef.current

      const isDimmed = (node: SimNode) => {
        if (category && node.category !== category && node.kind === 'tool') return true
        if (focusNode && focusNode.id !== node.id) {
          const connected = links.some(
            (link) =>
              (asNode(link.source).id === focusNode.id && asNode(link.target).id === node.id) ||
              (asNode(link.target).id === focusNode.id && asNode(link.source).id === node.id),
          )
          return !connected
        }
        return false
      }

      links.forEach((link) => {
        const source = asNode(link.source)
        const target = asNode(link.target)
        if (source.x === undefined || target.x === undefined) return
        const connectedToFocus = focusNode && (source.id === focusNode.id || target.id === focusNode.id)
        const dimmedByCategory =
          category && ((source.kind === 'tool' && source.category !== category) || (target.kind === 'tool' && target.category !== category))

        ctx.beginPath()
        ctx.moveTo(source.x, source.y)
        ctx.lineTo(target.x, target.y!)

        if (connectedToFocus) {
          ctx.strokeStyle = 'rgba(255, 176, 32, 0.85)'
          ctx.lineWidth = 1.4
        } else if (dimmedByCategory || (focusNode && !connectedToFocus)) {
          ctx.strokeStyle = 'rgba(199, 201, 206, 0.05)'
          ctx.lineWidth = 1
        } else if (link.kind === 'shared-project') {
          ctx.strokeStyle = 'rgba(89, 207, 198, 0.25)'
          ctx.lineWidth = 1
        } else {
          ctx.strokeStyle = 'rgba(199, 201, 206, 0.18)'
          ctx.lineWidth = 1
        }
        ctx.stroke()
      })

      nodes.forEach((node) => {
        if (node.x === undefined || node.y === undefined) return
        const degree = degreeById.get(node.id) ?? 0
        const radius = nodeRadius(node, degree)
        const dimmed = isDimmed(node)
        const color = getCategoryColor(data.categories, node.category)
        const isFocus = focusNode?.id === node.id

        ctx.beginPath()
        if (node.kind === 'category') {
          ctx.save()
          ctx.translate(node.x, node.y)
          ctx.rotate(Math.PI / 4)
          ctx.rect(-radius * 0.72, -radius * 0.72, radius * 1.44, radius * 1.44)
          ctx.restore()
        } else {
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        }
        ctx.globalAlpha = dimmed ? 0.18 : 1
        ctx.fillStyle = node.kind === 'category' ? '#111316' : color
        ctx.fill()
        ctx.lineWidth = isFocus ? 2 : 1.2
        ctx.strokeStyle = isFocus ? '#ffb020' : color
        ctx.stroke()
        ctx.globalAlpha = 1

        const showLabel = node.kind === 'category' || isFocus || radius > 11
        if (showLabel && !dimmed) {
          ctx.font = node.kind === 'category' ? '600 11px "JetBrains Mono", monospace' : '500 10px "JetBrains Mono", monospace'
          ctx.fillStyle = node.kind === 'category' ? '#f3f1ea' : 'rgba(243, 241, 234, 0.85)'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'top'
          ctx.fillText(node.label.toUpperCase(), node.x, node.y + radius + 6)
        }
      })

      ctx.restore()
    }

    drawRef.current = draw

    const simulation: Simulation<SimNode, SimLink> = forceSimulation(nodes)
      .force(
        'link',
        forceLink<SimNode, SimLink>(links)
          .id((node) => node.id)
          .distance((link) => (link.kind === 'hub' ? 58 : 150))
          .strength((link) => (link.kind === 'hub' ? 0.7 : 0.12)),
      )
      .force(
        'charge',
        forceManyBody<SimNode>().strength((node) => (node.kind === 'category' ? -260 : -34)),
      )
      .force(
        'collide',
        forceCollide<SimNode>().radius((node) => nodeRadius(node, degreeById.get(node.id) ?? 0) + 4),
      )
      .force(
        'x',
        forceX<SimNode>((node) => categoryCenter(node.category).cx).strength((node) =>
          node.kind === 'category' ? 0.95 : 0.045,
        ),
      )
      .force(
        'y',
        forceY<SimNode>((node) => categoryCenter(node.category).cy).strength((node) =>
          node.kind === 'category' ? 0.95 : 0.045,
        ),
      )
      .force('center', forceCenter(0, 0).strength(0.02))

    simulation.on('tick', draw)

    const resize = () => {
      measure()
      draw()
    }

    draw()

    if (reducedMotion) {
      simulation.stop()
      for (let i = 0; i < 260; i += 1) simulation.tick()
      draw()
    }

    const selection = select(canvas)

    type DragEvent = D3DragEvent<HTMLCanvasElement, unknown, SimNode | null>

    const dragBehavior = drag<HTMLCanvasElement, unknown, SimNode | null>()
      .subject((event: DragEvent) => {
        const [gx, gy] = toGraphPoint(event.x, event.y)
        return hitTestNode(gx, gy) ?? null
      })
      .on('start', (event: DragEvent) => {
        const node = event.subject
        if (!node) return
        if (!reducedMotion) simulation.alphaTarget(0.2).restart()
        node.fx = node.x
        node.fy = node.y
      })
      .on('drag', (event: DragEvent) => {
        const node = event.subject
        if (!node) return
        const [gx, gy] = toGraphPoint(event.x, event.y)
        node.fx = gx
        node.fy = gy
        if (reducedMotion) draw()
      })
      .on('end', (event: DragEvent) => {
        const node = event.subject
        if (!node) return
        if (!reducedMotion) simulation.alphaTarget(0)
        node.fx = null
        node.fy = null
        draw()
      })

    const zoomBehavior = zoom<HTMLCanvasElement, unknown>()
      .scaleExtent([0.55, 2.4])
      .filter((event: Event) => {
        if (event.type === 'wheel') return true
        const pointerEvent = event as PointerEvent
        const rect = canvas.getBoundingClientRect()
        const [gx, gy] = toGraphPoint(pointerEvent.clientX - rect.left, pointerEvent.clientY - rect.top)
        return !hitTestNode(gx, gy)
      })
      .on('zoom', (event: D3ZoomEvent<HTMLCanvasElement, unknown>) => {
        transform = event.transform
        draw()
      })

    selection.call(dragBehavior)
    selection.call(zoomBehavior)

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const [gx, gy] = toGraphPoint(event.clientX - rect.left, event.clientY - rect.top)
      const hit = hitTestNode(gx, gy)
      const nextId = hit?.id ?? null
      if (hoveredIdRef.current !== nextId) {
        hoveredIdRef.current = nextId
        canvas.style.cursor = hit ? 'pointer' : 'default'
        draw()
      }
    }

    const handleClick = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const [gx, gy] = toGraphPoint(event.clientX - rect.left, event.clientY - rect.top)
      const hit = hitTestNode(gx, gy)
      onSelect(hit ? (hit.id === selectedIdRef.current ? null : hit.id) : null)
    }

    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('click', handleClick)

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    return () => {
      simulation.stop()
      resizeObserver.disconnect()
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('click', handleClick)
      selection.on('.drag', null)
      selection.on('.zoom', null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={`Mapa interativo de tecnologias com ${data.nodes.length} nós agrupados por categoria: ${data.categories.join(', ')}`}
      className="h-[480px] w-full touch-none rounded border border-ink-700 bg-ink-950 md:h-[560px]"
    />
  )
}
