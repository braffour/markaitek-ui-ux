# Speckit/SDD Constitution

## Non-negotiables
1. Specs > Code
2. Executable specs (precise, testable, unambiguous)
3. No guessing → use [NEEDS CLARIFICATION]
4. Library-first: features exist as libraries first
5. CLI mandate: every library exposes a text I/O CLI; supports JSON
6. Test-first: tests before implementation; prove RED before writing code
7. Simplicity + anti-abstraction: prefer framework directly; ≤3 projects unless justified
8. Integration-first tests: real deps where practical (DB/services), contract tests mandatory
9. Change control: changes start in specs; code must not drift

## Current Violations
- Specs are not the source of truth; there is no baseline spec for the current UI/UX. Evidence: `README.md`, `src/`.
- No executable specs or acceptance-criteria-driven tests exist. Evidence: `package.json` (no test scripts).
- Behavior is implied in UI components without [NEEDS CLARIFICATION] markers. Evidence: `src/components/**`.
- No library-first structure or CLI exposure exists. Evidence: `src/`, `package.json`.
- No test-first workflow (RED-first) is documented or enforced. Evidence: `README.md`, `package.json`.
- No integration-first or contract tests exist. Evidence: absence of tests under `src/` and `package.json`.
- Spec change control is not enforced. Evidence: no Speckit workflow or checks.

## Migration Strategy
- Reconstruct Day-1 intent via `specs/000-system-baseline/` with evidence-backed claims.
- Decompose features into small vertical slices with explicit acceptance criteria and contracts.
- Introduce lightweight Speckit checks (`scripts/speckit-check.sh`) to prevent drift and missing required sections.
- Add contract placeholders for external boundaries; update as real APIs/CLI are introduced.
- Enforce spec-first changes via `specs/README.md` workflow.
