# Summary
I'm Lucky mode provides an intent input and static recommendation panels using mock insights. Evidence: `src/components/views/LuckyView.tsx`, `src/constants.ts`.

# Users & Goals
- Users seeking quick recommendations for automation. Evidence: `src/components/views/LuckyView.tsx`.

# Non-Goals
- No real recommendation engine or persistence. Evidence: `src/components/views/LuckyView.tsx`.

# User Stories
- As a user, I can enter an intent and view recommended insights. Evidence: `src/components/views/LuckyView.tsx`.
- As a user, I can choose primary systems and constraints (UI only). Evidence: `src/components/views/LuckyView.tsx`.

# Acceptance Criteria (Given/When/Then)
- Given Lucky mode, when I focus the intent input, then the UI shows the suggestion and insight panels. Evidence: `src/components/views/LuckyView.tsx`.
- Given the insights panel, when it renders, then past success items are listed from constants. Evidence: `src/components/views/LuckyView.tsx`, `src/constants.ts`.

# Edge Cases & Errors
- No error handling for empty intent or missing data. Evidence: `src/components/views/LuckyView.tsx`.

# Permissions & Roles
- None implemented.

# Non-Functional Requirements
- None specified.

# Observability
- None implemented.

# Open Questions [NEEDS CLARIFICATION]
- [NEEDS CLARIFICATION: What data sources and algorithms should drive recommendations?]
