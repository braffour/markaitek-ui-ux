# Gaps & Ambiguities

## Unclear Behavior
- Auth backend/provider is unspecified; UI only. Evidence: `src/components/auth/*`.
- Workflow persistence/execution behavior is unspecified. Evidence: `src/components/views/ClassicView.tsx`, `src/components/execution/ExecutionPanel.tsx`.
- Governance/policy enforcement rules are not implemented. Evidence: `src/components/views/YoloView.tsx`.

## Contradictions
- README references `AgenticWorkflowComposer.tsx` and `main.jsx`, but code uses `AppShell` and `src/main.tsx`. Evidence: `README.md`, `src/main.tsx`.

## Security/Performance Unknowns
- No authentication, authorization, or data handling policies are defined. Evidence: `src/components/auth/*`.
- No performance requirements or telemetry are defined. Evidence: absence of monitoring configuration.

## Options
- [NEEDS CLARIFICATION] Decide backend services for auth, workflow execution, and storage.
- [NEEDS CLARIFICATION] Decide contracts for policy enforcement and audit logging.
