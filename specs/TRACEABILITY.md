# Traceability Matrix

## Feature → Acceptance Criteria → Code
- 001-authentication-ui
  - Login/Register/Forgot/Verify navigation → `src/components/auth/AuthShell.tsx`
  - Auth success transitions → `src/components/auth/AuthShell.tsx`, `src/main.tsx`
- 002-app-shell-navigation
  - Mode switching → `src/components/layout/AppShell.tsx`
  - Theme persistence → `src/context/ThemeContext.tsx`
  - Language selection → `src/i18n.ts`, `src/components/ui/LanguageSelector.tsx`
- 003-advisor-mode
  - Intent selection + chat UI → `src/components/views/AdvisorView.tsx`
- 004-yolo-mode
  - Intent input + simulated transcript → `src/components/views/YoloView.tsx`
  - Governance inputs → `src/components/views/YoloView.tsx`
- 005-classic-workflow-builder
  - Drag/drop nodes → `src/components/views/ClassicView.tsx`, `src/components/layout/LibrarySidebar.tsx`
  - Connect edges → `src/components/views/ClassicView.tsx`
  - Node inspector → `src/components/views/ClassicView.tsx`
- 006-lucky-mode
  - Intent input + insights list → `src/components/views/LuckyView.tsx`, `src/constants.ts`
- 007-execution-panel-ui
  - Run/Debug/History tabs → `src/components/execution/ExecutionPanel.tsx`, `src/components/execution/ExecutionTabs.tsx`
  - Simulated steps/status → `src/components/execution/ExecutionPanel.tsx`

## Contracts → Tests → Handlers
- No external contracts implemented. Evidence: `specs/000-system-baseline/contracts/README.md`.
