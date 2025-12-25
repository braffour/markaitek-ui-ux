# Summary
Yolo mode provides a natural-language intent input with simulated agent processing and governance inputs (policy, context upload, urgency, environments). Evidence: `src/components/views/YoloView.tsx`.

# Users & Goals
- Workflow builders who want a rapid natural-language entry point. Evidence: `src/components/views/YoloView.tsx`.

# Non-Goals
- No real workflow generation or policy enforcement. Evidence: `src/components/views/YoloView.tsx`.

# User Stories
- As a user, I can type an intent and execute a simulated agent run. Evidence: `src/components/views/YoloView.tsx`.
- As a user, I can select policy scope, upload a context file (UI only), and choose urgency/environment. Evidence: `src/components/views/YoloView.tsx`.

# Acceptance Criteria (Given/When/Then)
- Given Yolo mode, when I enter text and click execute, then a transcript list is appended with timed steps. Evidence: `src/components/views/YoloView.tsx`.
- Given Yolo mode, when no input is provided, then execute is disabled. Evidence: `src/components/views/YoloView.tsx`.
- Given the governance section, when I pick options, then the UI reflects the selection (no persistence). Evidence: `src/components/views/YoloView.tsx`.

# Edge Cases & Errors
- Transcript simulation stops after the final step; no error states are simulated. Evidence: `src/components/views/YoloView.tsx`.

# Permissions & Roles
- None implemented.

# Non-Functional Requirements
- None specified.

# Observability
- None implemented.

# Open Questions [NEEDS CLARIFICATION]
- [NEEDS CLARIFICATION: What real policy enforcement and document processing should occur?]
- [NEEDS CLARIFICATION: What backend should run the agent?]
