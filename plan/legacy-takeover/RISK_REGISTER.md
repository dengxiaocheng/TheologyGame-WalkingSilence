# Risk Register: 步入静默

## RISK-001: Greenfield disguised as legacy
- **Likelihood**: Confirmed
- **Impact**: High — planning assumption was "fix broken legacy," reality is "build from scratch"
- **Mitigation**: Pivot strategy to incremental construction. First packet establishes CI baseline (test pass).
- **Manager Action**: Acknowledge scope shift. This is a new build, not a repair.

## RISK-002: Design scope vastly exceeds budget
- **Likelihood**: Confirmed
- **Impact**: High — design doc specifies 800+ texts, 8 chapters, 12 stages, complex visual systems. Budget allows 4 files / 500 lines.
- **Mitigation**: Execution plan targets vertical slice (4 chapters, ~40 texts, core mechanics). Full implementation requires 10-20x more budget.
- **Manager Action**: Decide whether to expand budget for full implementation or accept vertical slice as deliverable.

## RISK-003: Test may require Playwright dependency
- **Likelihood**: High
- **Impact**: Medium — `test.mjs` imports `playwright` which must be installed. If not available, tests cannot run.
- **Mitigation**: First execution packet should verify `npx playwright install chromium` works. If not, add a lighter smoke test.
- **Manager Action**: Confirm Playwright is available in the execution environment.

## RISK-004: Single JS file architecture
- **Likelihood**: Confirmed
- **Impact**: Medium — all game logic, narrative data, and rendering in one file (`js/main.js`) creates a monolith. With ~500 lines, it's manageable but not scalable for full implementation.
- **Mitigation**: Acceptable for vertical slice. If expanding, refactor into modules in follow-up packets.
- **Manager Action**: None needed for current scope.

## RISK-005: Content quality in narrative texts
- **Likelihood**: Medium
- **Impact**: Low-Medium — generated narrative texts need to match the literary tone described in the design doc (theological, poetic, progressing from precise → vague → silent).
- **Mitigation**: Use the design doc's tone guidelines as a checklist. Keep texts short and impactful rather than voluminous.
- **Manager Action**: Review narrative content quality in E3 packet before approving.

## RISK-006: CSS inline in HTML vs separate file
- **Likelihood**: Decision needed
- **Impact**: Low — putting CSS in `index.html` saves a file slot (staying within 4-file budget). Separate CSS file would be cleaner but uses a file budget slot.
- **Mitigation**: Inline CSS in HTML for now. Refactor to separate file if expanding scope.
- **Manager Action**: None needed — inline CSS is the pragmatic choice under budget constraints.

## RISK-007: No state persistence
- **Likelihood**: Confirmed
- **Impact**: Low — no save/load system. Game resets on page reload.
- **Mitigation**: Acceptable for vertical slice. Could add localStorage in follow-up.
- **Manager Action**: None needed for current scope.

---

## Items Requiring Manager Decision

1. **Scope acknowledgment**: Confirm this is greenfield construction, not legacy repair.
2. **Content scope**: Accept vertical slice (4 chapters, ~40 texts) vs. requesting full implementation (requires budget increase to ~20 files / 5000+ lines).
3. **E4 packet**: Approve or defer UI decay system (exceeds 500-line budget by ~80 lines).
4. **Playwright availability**: Confirm test environment has Playwright + Chromium installed.
