# Goal + Scope
Document the Classic mode workflow builder UI and its in-memory graph behavior.

# Architecture Overview (high-level)
- Uses React Flow for canvas rendering, nodes, and edges. Evidence: `src/components/views/ClassicView.tsx`.
- Component library sidebar provides draggable items. Evidence: `src/components/layout/LibrarySidebar.tsx`.
- Custom node renderer for workflow nodes. Evidence: `src/components/nodes/WorkflowNode.tsx`.

# Requirement → Decision Mapping
- Node creation via drag-and-drop → `onDrop` handler parses data and adds node. Evidence: `src/components/views/ClassicView.tsx`.
- Edge creation → `onConnect` uses `addEdge` with `smoothstep`. Evidence: `src/components/views/ClassicView.tsx`.
- Node inspection → selection state renders inspector panel. Evidence: `src/components/views/ClassicView.tsx`.

# Contracts (list)
- None implemented. [NEEDS CLARIFICATION: define workflow schema/validation contracts]

# Data Model Impacts
- In-memory nodes/edges defined in `src/constants.ts` and managed in AppShell state. Evidence: `src/constants.ts`, `src/components/layout/AppShell.tsx`.

# Test Strategy (contract→integration→e2e→unit)
- No tests implemented. Evidence: `package.json`.

# Phase -1 Gates (Simplicity / Anti-Abstraction / Integration-first)
- Simplicity: React Flow used directly. Evidence: `src/components/views/ClassicView.tsx`.
- Anti-Abstraction: no custom graph abstraction. Evidence: `src/components/views/ClassicView.tsx`.
- Integration-first: not applicable without backend. [NEEDS CLARIFICATION]

# Migration Notes (if code differs)
- None.

# Risks & Rollback
- Risk: users may assume workflows persist or execute. Evidence: `src/components/views/ClassicView.tsx`.
