# Speckit Workflow

## Workflow (source of truth)
1. `/speckit.specify` → write/update `specs/<feature>/spec.md`
2. `/speckit.plan` → derive `specs/<feature>/plan.md`
3. `/speckit.tasks` → derive `specs/<feature>/tasks.md`
4. Write tests (RED) from acceptance criteria and contracts
5. Implement code to make tests pass
6. Regenerate or update docs if behavior changes

## Readiness Rules
- A feature marked **Ready** must not contain `[NEEDS CLARIFICATION]`.
- `spec.md`, `plan.md`, and `tasks.md` must contain all required sections.
- Contract changes require corresponding contract tests.

## Drift Control
- Any PR that changes behavior must update the spec/plan/tasks first.

## Checks
Run `scripts/speckit-check.sh` to validate required sections and readiness markers.
