# Goal + Scope
Document AppShell navigation, theme, and language behaviors in the current UI.

# Architecture Overview (high-level)
- AppShell manages active tab and workspace state in local component state. Evidence: `src/components/layout/AppShell.tsx`.
- ThemeContext stores theme choice in localStorage and applies classes to `<html>`. Evidence: `src/context/ThemeContext.tsx`.
- i18n initialization uses browser language detection with i18next. Evidence: `src/i18n.ts`.

# Requirement → Decision Mapping
- Mode switching → local state `activeTab`. Evidence: `src/components/layout/AppShell.tsx`.
- Theme toggle → context provider with localStorage storage key. Evidence: `src/context/ThemeContext.tsx`.
- Language selection → shared LanguageSelector component. Evidence: `src/components/ui/LanguageSelector.tsx`.

# Contracts (list)
- None implemented. [NEEDS CLARIFICATION: define any persistence APIs if needed]

# Data Model Impacts
- Local state only: active tab, current workspace. Evidence: `src/components/layout/AppShell.tsx`.

# Test Strategy (contract→integration→e2e→unit)
- No tests implemented. Evidence: `package.json`.

# Phase -1 Gates (Simplicity / Anti-Abstraction / Integration-first)
- Simplicity: direct state in component; no router. Evidence: `src/components/layout/AppShell.tsx`.
- Anti-Abstraction: minimal wrappers around UI state. Evidence: `src/components/layout/AppShell.tsx`.
- Integration-first: not applicable without backend. [NEEDS CLARIFICATION]

# Migration Notes (if code differs)
- None.

# Risks & Rollback
- Risk: language and theme persistence are local-only, not tied to user profile. Evidence: `src/context/ThemeContext.tsx`, `src/i18n.ts`.
