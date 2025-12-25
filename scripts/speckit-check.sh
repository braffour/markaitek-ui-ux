#!/usr/bin/env bash
set -euo pipefail

status=0

require_headings() {
  local file="$1"
  shift
  local heading
  for heading in "$@"; do
    if ! rg -q "^# ${heading}$" "$file"; then
      echo "Missing heading '${heading}' in $file" >&2
      status=1
    fi
  done
}

check_specs() {
  local file
  while IFS= read -r file; do
    require_headings "$file" \
      "Summary" \
      "Users & Goals" \
      "Non-Goals" \
      "User Stories" \
      "Acceptance Criteria (Given/When/Then)" \
      "Edge Cases & Errors" \
      "Permissions & Roles" \
      "Non-Functional Requirements" \
      "Observability" \
      "Open Questions [NEEDS CLARIFICATION]"
  done < <(rg --files -g 'specs/**/spec.md')
}

check_plans() {
  local file
  while IFS= read -r file; do
    require_headings "$file" \
      "Goal + Scope" \
      "Architecture Overview (high-level)" \
      "Requirement → Decision Mapping" \
      "Contracts (list)" \
      "Data Model Impacts" \
      "Test Strategy (contract→integration→e2e→unit)" \
      "Phase -1 Gates (Simplicity / Anti-Abstraction / Integration-first)" \
      "Migration Notes (if code differs)" \
      "Risks & Rollback"
  done < <(rg --files -g 'specs/**/plan.md')
}

check_tasks() {
  local file
  while IFS= read -r file; do
    require_headings "$file" \
      "Task List (with IDs)" \
      "Parallel Groups [P]" \
      "Definition of Done per task" \
      "Test Plan Links" \
      "Contract Links"
  done < <(rg --files -g 'specs/**/tasks.md')
}

check_specs
check_plans
check_tasks

if [ "$status" -ne 0 ]; then
  exit 1
fi

