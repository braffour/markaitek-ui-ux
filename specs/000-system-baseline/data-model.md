# Data Model (As-Is)

No persisted data model is implemented. The UI uses in-memory structures and component state only.

## In-Memory Structures
- Workspaces, policies, environments: `src/constants.ts`.
- Past success insights: `src/constants.ts`.
- Initial workflow nodes/edges for Classic mode: `src/constants.ts`.

## Constraints & Invariants
- Node IDs are generated in Classic mode by incrementing a module-level counter; no persistence or uniqueness across sessions. Evidence: `src/components/views/ClassicView.tsx`.
- Auth state is a local boolean toggle in `App`. Evidence: `src/main.tsx`.
