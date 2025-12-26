# Goal + Scope
Document the Classic mode workflow builder UI and its in-memory graph behavior, including auto-connect and auto-layout rules.

# Architecture Overview (high-level)
- Uses React Flow for canvas rendering, nodes, edges, and selection. Evidence: `src/components/views/ClassicView.tsx`.
- Component library sidebar provides draggable items. Evidence: `src/components/layout/LibrarySidebar.tsx`.
- Custom node renderer displays type-specific icon and handles. Evidence: `src/components/nodes/WorkflowNode.tsx`.
- Auto-connect logic chooses nearby compatible nodes. Evidence: `src/utils/connectionUtils.js`.
- Auto-layout uses Dagre to reposition nodes. Evidence: `src/utils/layoutUtils.js`.

# Requirement → Decision Mapping
- Node creation via drag-and-drop → `onDrop` parses component data and adds node. Evidence: `src/components/views/ClassicView.tsx`.
- Auto-connect → `findAutoConnectCandidates` creates up to two edges on drop. Evidence: `src/components/views/ClassicView.tsx`, `src/utils/connectionUtils.js`.
- Edge creation → `onConnect` uses `addEdge` with `smoothstep`. Evidence: `src/components/views/ClassicView.tsx`.
- Node inspection → selection state renders inspector; `updateNodeData` updates node fields. Evidence: `src/components/views/ClassicView.tsx`.
- Deletion → selected node removed along with related edges. Evidence: `src/components/views/ClassicView.tsx`.
- Layout → `getLayoutedElements` applies Dagre positions. Evidence: `src/components/views/ClassicView.tsx`, `src/utils/layoutUtils.js`.

# Contracts (list)
- `specs/005-classic-workflow-builder/contracts/graph-schema.md` (UI-as-is node/edge schema).

# Data Model Impacts
- In-memory nodes/edges defined in `src/constants.ts` and managed in AppShell state. Evidence: `src/constants.ts`, `src/components/layout/AppShell.tsx`.
- Node data fields: label, type, meta, description. Evidence: `src/components/views/ClassicView.tsx`, `src/components/nodes/WorkflowNode.tsx`.

# Test Strategy (contract→integration→e2e→unit)
- No tests implemented. Evidence: `package.json`.
- Future: contract tests for graph schema and auto-connect compatibility. [NEEDS CLARIFICATION: test framework]

# Phase -1 Gates (Simplicity / Anti-Abstraction / Integration-first)
- Simplicity: React Flow used directly, minimal wrappers. Evidence: `src/components/views/ClassicView.tsx`.
- Anti-Abstraction: no separate graph domain layer. Evidence: `src/components/views/ClassicView.tsx`.
- Integration-first: not applicable without backend. [NEEDS CLARIFICATION]

# Migration Notes (if code differs)
- None.

# Risks & Rollback
- Risk: auto-connect may create unintended edges with no confirmation. Evidence: `src/utils/connectionUtils.js`.
- Risk: graph edits are not persisted. Evidence: `src/components/views/ClassicView.tsx`.
