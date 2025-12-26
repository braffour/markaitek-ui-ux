# Summary
Visual workflow builder using a node-based canvas (React Flow), component library, and inspector. Supports drag/drop node creation, auto-connecting nearby nodes, manual edge creation, auto-layout, and node deletion. Evidence: `src/components/views/ClassicView.tsx`, `src/components/layout/LibrarySidebar.tsx`, `src/utils/connectionUtils.js`, `src/utils/layoutUtils.js`.

# Users & Goals
- Workflow designers who want to create workflows via drag-and-drop and connect steps. Evidence: `src/components/views/ClassicView.tsx`.

# Non-Goals
- No persistence, execution, or backend validation of workflows. Evidence: `src/components/views/ClassicView.tsx`, `src/constants.ts`.

# User Stories
- As a user, I can drag components from the library onto the canvas to create nodes. Evidence: `src/components/views/ClassicView.tsx`, `src/components/layout/LibrarySidebar.tsx`.
- As a user, I can connect nodes with edges. Evidence: `src/components/views/ClassicView.tsx`.
- As a user, I can auto-layout the graph. Evidence: `src/components/views/ClassicView.tsx`, `src/utils/layoutUtils.js`.
- As a user, I can select a node and edit its fields in the inspector. Evidence: `src/components/views/ClassicView.tsx`.
- As a user, I can delete a selected node and its connected edges. Evidence: `src/components/views/ClassicView.tsx`.

# Acceptance Criteria (Given/When/Then)
- Given the component library, when I drag and drop an item onto the canvas, then a new workflow node appears at the drop position. Evidence: `src/components/views/ClassicView.tsx`.
- Given a new node, when it is dropped near compatible nodes, then auto-connections are created according to compatibility rules. Evidence: `src/components/views/ClassicView.tsx`, `src/utils/connectionUtils.js`.
- Given two nodes, when I connect them, then an edge is created with type smoothstep. Evidence: `src/components/views/ClassicView.tsx`.
- Given the layout action, when I trigger auto-layout, then node positions update according to Dagre layout. Evidence: `src/components/views/ClassicView.tsx`, `src/utils/layoutUtils.js`.
- Given a node selection, when I change a field in the inspector, then the node data updates in state. Evidence: `src/components/views/ClassicView.tsx`.
- Given a selected node, when I delete it, then the node and its connected edges are removed. Evidence: `src/components/views/ClassicView.tsx`.

# Edge Cases & Errors
- Drag/drop without valid component data logs a warning and does not create a node. Evidence: `src/components/views/ClassicView.tsx`.
- Drag/drop JSON parse errors are logged to console. Evidence: `src/components/views/ClassicView.tsx`.

# Permissions & Roles
- None implemented.

# Non-Functional Requirements
- None specified.

# Observability
- Console logs on drop and error cases. Evidence: `src/components/views/ClassicView.tsx`.

# Open Questions [NEEDS CLARIFICATION]
- [NEEDS CLARIFICATION: What is the canonical workflow schema and persistence layer?]
- [NEEDS CLARIFICATION: Should validation rules or constraints be enforced on nodes/edges beyond auto-connect compatibility?]
- [NEEDS CLARIFICATION: Should auto-layout and auto-connect be optional or configurable?]
