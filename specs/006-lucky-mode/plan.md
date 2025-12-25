# Goal + Scope
Document Lucky mode UI behavior and static insights presentation.

# Architecture Overview (high-level)
- Lucky view renders intent input, system selection buttons, constraints, and insight cards. Evidence: `src/components/views/LuckyView.tsx`.
- Insight data comes from constants. Evidence: `src/constants.ts`.

# Requirement → Decision Mapping
- Insight display → map over `PAST_SUCCESS_INSIGHTS`. Evidence: `src/components/views/LuckyView.tsx`.
- Constraints UI → select inputs with no backing logic. Evidence: `src/components/views/LuckyView.tsx`.

# Contracts (list)
- None implemented. [NEEDS CLARIFICATION: define recommendation API if needed]

# Data Model Impacts
- No persisted data; uses constants for insights. Evidence: `src/constants.ts`.

# Test Strategy (contract→integration→e2e→unit)
- No tests implemented. Evidence: `package.json`.

# Phase -1 Gates (Simplicity / Anti-Abstraction / Integration-first)
- Simplicity: static UI rendering. Evidence: `src/components/views/LuckyView.tsx`.
- Anti-Abstraction: no external recommendation service. Evidence: `src/components/views/LuckyView.tsx`.
- Integration-first: not applicable without backend. [NEEDS CLARIFICATION]

# Migration Notes (if code differs)
- None.

# Risks & Rollback
- Risk: recommendations are static and may mislead users about real capability. Evidence: `src/components/views/LuckyView.tsx`.
