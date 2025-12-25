# Goal + Scope
Document Advisor mode UI behavior and its simulated conversation flow.

# Architecture Overview (high-level)
- Advisor view maintains step state (intent selection → conversation → summary). Evidence: `src/components/views/AdvisorView.tsx`.
- Messages are stored in local component state and rendered in a scrollable view. Evidence: `src/components/views/AdvisorView.tsx`.

# Requirement → Decision Mapping
- Multiple intents → static intent list with icons and labels. Evidence: `src/components/views/AdvisorView.tsx`.
- Conversation UI → local state array of messages. Evidence: `src/components/views/AdvisorView.tsx`.

# Contracts (list)
- None implemented. [NEEDS CLARIFICATION: define advisor chat API if required]

# Data Model Impacts
- Local state: step, selected intent, messages, business context. Evidence: `src/components/views/AdvisorView.tsx`.

# Test Strategy (contract→integration→e2e→unit)
- No tests implemented. Evidence: `package.json`.

# Phase -1 Gates (Simplicity / Anti-Abstraction / Integration-first)
- Simplicity: single component maintains state. Evidence: `src/components/views/AdvisorView.tsx`.
- Anti-Abstraction: no external chat services. Evidence: `src/components/views/AdvisorView.tsx`.
- Integration-first: not applicable without backend. [NEEDS CLARIFICATION]

# Migration Notes (if code differs)
- None.

# Risks & Rollback
- Risk: Users may assume real advisor logic exists. Evidence: `src/components/views/AdvisorView.tsx`.
