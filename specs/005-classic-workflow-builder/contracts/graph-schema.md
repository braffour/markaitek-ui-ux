# Workflow Graph Contract (UI-As-Is)

## Node Shape
- id: string (generated as "node-<n>")
- type: "workflow" (React Flow node type)
- position: { x: number, y: number }
- data:
  - label: string
  - type: "trigger" | "action" | "connector"
  - meta?: string
  - description?: string

Evidence: `src/components/views/ClassicView.tsx`, `src/components/nodes/WorkflowNode.tsx`.

## Edge Shape
- id: string
- source: string (node id)
- target: string (node id)
- type: "smoothstep"
- animated?: boolean
- style?: { stroke: string, strokeWidth: number }

Evidence: `src/components/views/ClassicView.tsx`.

## Auto-Connect Rules
- Compatibility:
  - trigger -> action
  - action -> action | connector
  - connector -> (no outgoing)
- Auto-connect searches nearby nodes within 200px and connects to the closest compatible source/target.
- At most 2 auto-connections: 1 incoming, 1 outgoing.

Evidence: `src/utils/connectionUtils.js`, `src/components/views/ClassicView.tsx`.

## Layout Rules
- Auto-layout uses Dagre with rankdir=LR, nodesep=80, ranksep=150.

Evidence: `src/utils/layoutUtils.js`.
