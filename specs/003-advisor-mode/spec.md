# Summary
Advisor mode provides intent selection and a simulated advisor chat experience with contextual business prompts. Evidence: `src/components/views/AdvisorView.tsx`.

# Users & Goals
- Users seeking strategic guidance before building workflows. Evidence: `src/components/views/AdvisorView.tsx`.

# Non-Goals
- No real AI backend or persistence; responses are simulated. Evidence: `src/components/views/AdvisorView.tsx`.

# User Stories
- As a user, I can select an advisor intent (objective/diagnosis/strategy/tools/brief). Evidence: `src/components/views/AdvisorView.tsx`.
- As a user, I can enter messages and receive simulated advisor replies. Evidence: `src/components/views/AdvisorView.tsx`.

# Acceptance Criteria (Given/When/Then)
- Given Advisor mode, when I select an intent, then the UI advances to the conversation step. Evidence: `src/components/views/AdvisorView.tsx`.
- Given a conversation, when I send a message, then a new message appears in the thread. Evidence: `src/components/views/AdvisorView.tsx`.

# Edge Cases & Errors
- No error handling for empty messages beyond UI checks. Evidence: `src/components/views/AdvisorView.tsx`.

# Permissions & Roles
- No role/permission logic. Evidence: `src/components/views/AdvisorView.tsx`.

# Non-Functional Requirements
- None specified.

# Observability
- None implemented.

# Open Questions [NEEDS CLARIFICATION]
- [NEEDS CLARIFICATION: What advisor backend or model should provide responses?]
- [NEEDS CLARIFICATION: Should advisor conversations be persisted?]
