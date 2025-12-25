# Goal + Scope
Document the execution panel UI behavior and simulated run status transitions.

# Architecture Overview (high-level)
- ExecutionPanel manages local state for status, active tab, and steps. Evidence: `src/components/execution/ExecutionPanel.tsx`.
- Run/Debug/History tabs are isolated components. Evidence: `src/components/execution/RunTab.tsx`, `src/components/execution/DebugTab.tsx`, `src/components/execution/HistoryTab.tsx`.

# Requirement → Decision Mapping
- Run simulation → mock steps array and timeout-based status change. Evidence: `src/components/execution/ExecutionPanel.tsx`.
- Tab navigation → `ExecutionTabs` component controlling activeTab. Evidence: `src/components/execution/ExecutionTabs.tsx`.

# Contracts (list)
- None implemented. [NEEDS CLARIFICATION: define execution/run contracts]

# Data Model Impacts
- Local state only: status and steps. Evidence: `src/components/execution/ExecutionPanel.tsx`.

# Test Strategy (contract→integration→e2e→unit)
- No tests implemented. Evidence: `package.json`.

# Phase -1 Gates (Simplicity / Anti-Abstraction / Integration-first)
- Simplicity: mock data embedded in component. Evidence: `src/components/execution/ExecutionPanel.tsx`.
- Anti-Abstraction: no execution service layer. Evidence: `src/components/execution/ExecutionPanel.tsx`.
- Integration-first: not applicable without backend. [NEEDS CLARIFICATION]

# Migration Notes (if code differs)
- None.

# Risks & Rollback
- Risk: run/debug/history data is not real and may be mistaken for true execution. Evidence: `src/components/execution/ExecutionPanel.tsx`.
