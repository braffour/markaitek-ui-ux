# Goal + Scope
Document the current architecture and behaviors as implemented in the UI-only frontend and optional Tauri shell, without proposing new behavior. Evidence: `src/`, `src-tauri/`.

# Architecture Overview (high-level)
- React 18 app bootstrapped by Vite; root renders AuthShell until authenticated, then AppShell. Evidence: `src/main.tsx`.
- AppShell manages mode selection and holds Classic mode workflow graph state. Evidence: `src/components/layout/AppShell.tsx`.
- Views render mode-specific UI with mock data and simulated behaviors. Evidence: `src/components/views/*.tsx`, `src/constants.ts`.
- Tauri config wraps the web app for desktop distribution; no custom Rust commands. Evidence: `src-tauri/src/main.rs`, `src-tauri/tauri.conf.json`.

# Requirement → Decision Mapping
- Multi-mode UI → implement tabbed sections in AppShell and render view components. Evidence: `src/components/layout/AppShell.tsx`.
- Mock policy/workspace data → constants module. Evidence: `src/constants.ts`.
- i18n support → i18next with browser language detection. Evidence: `src/i18n.ts`.
- Visual workflow editing → React Flow with custom node component. Evidence: `src/components/views/ClassicView.tsx`, `src/components/nodes/WorkflowNode.tsx`.

# Contracts (list)
- None implemented (no API/CLI/events). Evidence: absence of backend handlers, `src-tauri/src/main.rs`.

# Data Model Impacts
- In-memory structures only: workspaces, policies, environments, past insights, initial nodes/edges. Evidence: `src/constants.ts`.

# Test Strategy (contract→integration→e2e→unit)
- No tests currently implemented. Evidence: `package.json`.
- Baseline recommendation: add contract tests once external interfaces exist. [NEEDS CLARIFICATION: target test framework and scope]

# Phase -1 Gates (Simplicity / Anti-Abstraction / Integration-first)
- Simplicity: UI composed directly from React components; no extra abstraction layers. Evidence: `src/components/**`.
- Anti-Abstraction: view components embed behavior and state locally. Evidence: `src/components/views/*.tsx`.
- Integration-first: not applicable due to missing integrations. [NEEDS CLARIFICATION]

# Migration Notes (if code differs)
- README references `AgenticWorkflowComposer.tsx` and `main.jsx`, but actual entry is `src/main.tsx` and AppShell/AuthShell. Evidence: `README.md`, `src/main.tsx`.

# Risks & Rollback
- Risk: UI behaviors are simulated and may be mistaken for real functionality. Evidence: `src/components/views/*.tsx`.
- Risk: missing persistence/auth backend requirements. [NEEDS CLARIFICATION]
