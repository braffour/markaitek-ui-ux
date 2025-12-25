# Summary
Visual workflow builder with a node-based canvas, component library, and node inspector UI. Evidence: `src/components/views/ClassicView.tsx`, `src/components/layout/LibrarySidebar.tsx`, `src/components/nodes/WorkflowNode.tsx`.

# Users & Goals
- Workflow designers who want to create workflows via drag-and-drop. Evidence: `src/components/views/ClassicView.tsx`.

# Non-Goals
- No persistence, execution, or backend validation of workflows. Evidence: `src/components/views/ClassicView.tsx`, `src/constants.ts`.

# User Stories
- As a user, I can drag components from the library onto the canvas. Evidence: `src/components/views/ClassicView.tsx`, `src/components/layout/LibrarySidebar.tsx`.
- As a user, I can connect nodes with edges. Evidence: `src/components/views/ClassicView.tsx`.
- As a user, I can select a node to view or edit details in the inspector panel. Evidence: `src/components/views/ClassicView.tsx`.

# Acceptance Criteria (Given/When/Then)
- Given the component library, when I drag and drop an item onto the canvas, then a new workflow node appears at the drop position. Evidence: `src/components/views/ClassicView.tsx`.
- Given two nodes, when I connect them, then an edge is created with smoothstep type. Evidence: `src/components/views/ClassicView.tsx`.
- Given a node selection, when I select a node, then the inspector panel shows its data. Evidence: `src/components/views/ClassicView.tsx`.

# Edge Cases & Errors
- Drag/drop without valid data logs a warning and does not create a node. Evidence: `src/components/views/ClassicView.tsx`.

# Permissions & Roles
- None implemented.

# Non-Functional Requirements
- None specified.

# Observability
- Console log on drop. Evidence: `src/components/views/ClassicView.tsx`.

# Open Questions [NEEDS CLARIFICATION]
- [NEEDS CLARIFICATION: What is the canonical workflow schema and persistence layer?]
- [NEEDS CLARIFICATION: Should validation rules or constraints be enforced on nodes/edges?]
