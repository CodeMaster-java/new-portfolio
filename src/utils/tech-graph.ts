import { projectItems, stackCategories } from './portfolio-data'

export type TechNodeKind = 'category' | 'tool'

export type TechNode = {
  id: string
  label: string
  kind: TechNodeKind
  category: string
  description?: string
  projects: string[]
}

export type TechLinkKind = 'hub' | 'shared-project'

export type TechLink = {
  source: string
  target: string
  kind: TechLinkKind
  weight: number
}

export type TechGraphData = {
  nodes: TechNode[]
  links: TechLink[]
  categories: string[]
}

/**
 * Derives a node/link graph straight from `stackCategories` + `projectItems`
 * (no invented data): one hub node per category, one node per tool linked to
 * its hub, plus cross-category links between tools that actually co-occur in
 * the same project's `tech` list.
 */
export const buildTechGraph = (): TechGraphData => {
  const nodes: TechNode[] = []
  const nodeById = new Map<string, TechNode>()
  const toolIdByLabel = new Map<string, string>()
  const hubLinks: TechLink[] = []

  stackCategories.forEach((category) => {
    const categoryId = `category:${category.name}`
    const categoryNode: TechNode = {
      id: categoryId,
      label: category.name,
      kind: 'category',
      category: category.name,
      description: category.description,
      projects: [],
    }
    nodes.push(categoryNode)
    nodeById.set(categoryId, categoryNode)

    category.tools.forEach((tool) => {
      const toolId = `tool:${tool}`
      if (!toolIdByLabel.has(tool)) {
        toolIdByLabel.set(tool, toolId)
        const toolNode: TechNode = { id: toolId, label: tool, kind: 'tool', category: category.name, projects: [] }
        nodes.push(toolNode)
        nodeById.set(toolId, toolNode)
      }
      hubLinks.push({ source: categoryId, target: toolId, kind: 'hub', weight: 1 })
    })
  })

  const toolLabels = [...toolIdByLabel.keys()]
  const sharedLinkByPairKey = new Map<string, TechLink>()

  projectItems.forEach((project) => {
    const matchedToolIds: string[] = []

    project.tech.forEach((techEntry) => {
      const matchedLabel = toolLabels.find(
        (label) => techEntry === label || techEntry.startsWith(`${label} `) || techEntry.startsWith(`${label} ·`),
      )
      if (!matchedLabel) {
        return
      }
      const toolId = toolIdByLabel.get(matchedLabel)!
      matchedToolIds.push(toolId)
      const node = nodeById.get(toolId)
      if (node && !node.projects.includes(project.name)) {
        node.projects.push(project.name)
      }
    })

    for (let i = 0; i < matchedToolIds.length; i += 1) {
      for (let j = i + 1; j < matchedToolIds.length; j += 1) {
        const a = nodeById.get(matchedToolIds[i])
        const b = nodeById.get(matchedToolIds[j])
        if (!a || !b || a.category === b.category) {
          continue
        }
        const pairKey = [a.id, b.id].sort().join('|')
        const existing = sharedLinkByPairKey.get(pairKey)
        if (existing) {
          existing.weight += 1
        } else {
          sharedLinkByPairKey.set(pairKey, { source: a.id, target: b.id, kind: 'shared-project', weight: 1 })
        }
      }
    }
  })

  return {
    nodes,
    links: [...hubLinks, ...sharedLinkByPairKey.values()],
    categories: stackCategories.map((category) => category.name),
  }
}

export const CATEGORY_COLORS = ['#ffb020', '#59cfc6', '#ffc65c', '#1fa9a0', '#c77e00', '#8b8e96']

export const getCategoryColor = (categories: string[], category: string) => {
  const index = categories.indexOf(category)
  return CATEGORY_COLORS[index >= 0 ? index % CATEGORY_COLORS.length : 0]
}
