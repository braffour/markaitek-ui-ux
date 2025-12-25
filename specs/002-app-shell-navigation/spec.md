# Summary
Authenticated application shell with header controls (workspace breadcrumbs, mode navigation, search, theme toggle, language selector) and mobile bottom navigation. Evidence: `src/components/layout/AppShell.tsx`.

# Users & Goals
- Authenticated users who need to switch modes and view workspace context. Evidence: `src/components/layout/AppShell.tsx`.

# Non-Goals
- No persistence of workspace selection or search behavior beyond local state. Evidence: `src/components/layout/AppShell.tsx`.

# User Stories
- As a user, I can switch between modes via top tabs or mobile nav. Evidence: `src/components/layout/AppShell.tsx`.
- As a user, I can change theme (light/dark/system) and have it persisted in localStorage. Evidence: `src/context/ThemeContext.tsx`.
- As a user, I can select a language variant. Evidence: `src/components/ui/LanguageSelector.tsx`, `src/i18n.ts`.

# Acceptance Criteria (Given/When/Then)
- Given the app shell, when I click a mode tab, then the corresponding view renders. Evidence: `src/components/layout/AppShell.tsx`.
- Given the theme toggle, when I switch themes, then the root element updates its class and localStorage persists the choice. Evidence: `src/context/ThemeContext.tsx`.
- Given the language selector, when I change language, then translated strings update across the UI. Evidence: `src/i18n.ts`, `src/components/ui/LanguageSelector.tsx`.

# Edge Cases & Errors
- No error handling for invalid localStorage theme values. Evidence: `src/context/ThemeContext.tsx`.

# Permissions & Roles
- No role-based restrictions. Evidence: `src/components/layout/AppShell.tsx`.

# Non-Functional Requirements
- Responsive header layout across breakpoints. Evidence: `src/components/layout/AppShell.tsx`.

# Observability
- None implemented.

# Open Questions [NEEDS CLARIFICATION]
- [NEEDS CLARIFICATION: Should workspace selection and search persist or sync to backend?]
