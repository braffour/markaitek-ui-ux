# Goal + Scope
Describe the current auth UI flow and its local state transitions; no backend integration is implemented. Evidence: `src/components/auth/AuthShell.tsx`.

# Architecture Overview (high-level)
- AuthShell holds view state and routes between login/register/forgot/reset/verify views. Evidence: `src/components/auth/AuthShell.tsx`.
- Toast notifications are local state; success triggers view transitions. Evidence: `src/components/auth/AuthShell.tsx`.

# Requirement → Decision Mapping
- Multiple auth screens → view state + switch-case rendering. Evidence: `src/components/auth/AuthShell.tsx`.
- Language selector in auth flow → shared `LanguageSelector` component. Evidence: `src/components/ui/LanguageSelector.tsx`.

# Contracts (list)
- None implemented. [NEEDS CLARIFICATION: define auth API contracts when backend exists]

# Data Model Impacts
- Local state: current view, email, toast. Evidence: `src/components/auth/AuthShell.tsx`.

# Test Strategy (contract→integration→e2e→unit)
- No tests implemented. Evidence: `package.json`.
- Future: add UI interaction tests once backend contracts are defined. [NEEDS CLARIFICATION]

# Phase -1 Gates (Simplicity / Anti-Abstraction / Integration-first)
- Simplicity: direct view rendering in component state. Evidence: `src/components/auth/AuthShell.tsx`.
- Anti-Abstraction: no custom router or state machine layer. Evidence: `src/components/auth/AuthShell.tsx`.
- Integration-first: not applicable without backend. [NEEDS CLARIFICATION]

# Migration Notes (if code differs)
- None.

# Risks & Rollback
- Risk: users may assume real authentication exists; it does not. Evidence: `src/components/auth/*`.
