# Bug Inventory: 步入静默

## Severity Classification
- **P0 Critical**: Game cannot start or run at all
- **P1 High**: Core gameplay broken; player cannot progress
- **P2 Medium**: Feature partially working or degraded
- **P3 Low**: Cosmetic or non-blocking issue

---

## P0 — Critical (Game Cannot Run)

### BUG-001: Missing index.html
- **Description**: No `index.html` exists. The test expects `file://<dir>/index.html`. The game cannot be opened in any browser.
- **Reproducibility**: 100% — file simply does not exist
- **Likely Owner**: Execution Packet E1
- **Test Evidence**: `test.mjs` line 27 — `page.goto` will throw timeout/filenotfound
- **Fix**: Create `index.html` with proper viewport meta, game container, and script loading

### BUG-002: Empty main.js
- **Description**: `js/main.js` contains only a comment line. No game logic exists.
- **Reproducibility**: 100%
- **Likely Owner**: Execution Packet E1-E4
- **Test Evidence**: Game area detection (line 31-37) will find nothing
- **Fix**: Implement game initialization, rendering, and interaction

## P1 — High (Core Gameplay Missing)

### BUG-003: No game state machine
- **Description**: No chapter/stage progression system. Player cannot start or advance through the story.
- **Reproducibility**: N/A (feature absent)
- **Likely Owner**: Execution Packet E3
- **Test Evidence**: After touch interaction, no state change observable

### BUG-004: No attribute system
- **Description**: The 6 core attributes (Logic, Engineering, Rhetoric, Memory, Will, Perception) are not implemented. Reverse-growth mechanic absent.
- **Reproducibility**: N/A
- **Likely Owner**: Execution Packet E3
- **Test Evidence**: No attribute panel visible in UI

### BUG-005: No narrative/choice system
- **Description**: No text display or choice buttons. Player cannot read story or make decisions.
- **Reproducibility**: N/A
- **Likely Owner**: Execution Packet E3-E4
- **Test Evidence**: No interactive elements found (line 53-68)

### BUG-006: No ending system
- **Description**: No win/lose conditions, no ending detection, no end screen.
- **Reproducibility**: N/A
- **Likely Owner**: Execution Packet E4

## P2 — Medium (Features Incomplete)

### BUG-007: No UI decay system
- **Description**: The progressive UI peeling mechanic (attributes dropping below thresholds causing UI degradation) is not implemented.
- **Reproducibility**: N/A
- **Likely Owner**: Execution Packet E5 (if budget allows)
- **Test Evidence**: N/A — cosmetic/feature gap

### BUG-008: No visual theme progression
- **Description**: Color scheme should shift from warm → cool → gray → white as journey progresses. Not implemented.
- **Reproducibility**: N/A
- **Likely Owner**: Execution Packet E5 (if budget allows)

### BUG-009: Minimal narrative content
- **Description**: Design calls for ~800 narrative texts. Current implementation has 0. Even the vertical slice will have only ~40.
- **Reproducibility**: N/A — content gap
- **Likely Owner**: Follow-up packets beyond current scope
- **Note**: Manager decision needed on content scope

## P3 — Low

### BUG-010: README.md is minimal
- **Description**: README contains only the game title, no setup/run instructions.
- **Reproducibility**: N/A
- **Likely Owner**: Out of scope — write scope is `plan/legacy-takeover/`

---

## Summary

| Severity | Count | Blocking? |
|----------|-------|-----------|
| P0       | 2     | Yes — game cannot run |
| P1       | 4     | Yes — no gameplay |
| P2       | 3     | No — but core experience incomplete |
| P3       | 1     | No |

**Total blocking bugs: 6 (P0+P1)**
**All bugs are "feature absent" rather than "feature broken" — this is a greenfield implementation disguised as legacy takeover.**
