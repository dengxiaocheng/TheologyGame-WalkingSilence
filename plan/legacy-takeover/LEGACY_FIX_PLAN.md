# Legacy Fix Plan: 步入静默 (Walking into Silence)

## Current State Assessment

**Verdict: Game is completely unimplemented.** The project contains only:
- `js/main.js`: 2 lines (a single comment: "Game entry point")
- `README.md`: Title only
- `test.mjs`: Full Playwright test suite (functional, ready to run)
- No `index.html`, no CSS, no game logic, no assets

The legacy task file (`game11-walking-silence.md`) describes a deep reverse-RPG / interactive fiction game with 8 chapters, 12 journey stages, reverse-growth mechanics, UI decay system, 800+ narrative texts, and multiple endings.

## Repair Strategy

Given the game is **greenfield** (not broken legacy), the repair strategy is **incremental vertical-slice construction** that passes the existing test at each step.

### Phase 1: Skeleton + Test Pass (Packets E1-E2)
Create `index.html` and minimal `js/main.js` so the Playwright test passes (load, touch, game area, no errors). This establishes the CI baseline.

### Phase 2: Core Game Engine (Packets E3-E4)
Implement the game state machine, attribute system, and narrative engine. The player can walk through chapters with choices, see attributes decline, and reach an ending.

### Phase 3: UI Decay + Visual Polish (Packet E5, if budget allows)
Implement the UI peeling system — progressive degradation of UI elements as attributes drop below thresholds.

### Stop Conditions
- [ ] `test.mjs` passes (all 6 test cases)
- [ ] Player can complete a full playthrough from Chapter 1 to ending
- [ ] All 6 attributes decline over the journey
- [ ] At least 2 distinct endings are reachable
- [ ] Touch interaction works on mobile viewport (375x812)
- [ ] No JS errors on load or interaction
- [ ] Total file changes <= 4, net lines <= 500

### Scope Limitation
The full design doc specifies 800+ narrative texts, 12 journey stages, 8 chapters, complex visual effects. **This plan targets a playable vertical slice** covering:
- 3-4 chapters (out of 8)
- ~40 narrative texts (out of 800)
- Core mechanics fully functional
- 2-3 endings reachable

The manager should decide whether to continue expanding content in follow-up packets.
