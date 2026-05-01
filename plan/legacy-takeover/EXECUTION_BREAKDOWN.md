# Execution Breakdown: 步入静默

## Packet Ordering

Packets are ordered by dependency: each packet builds on the previous one and leaves the game in a testable state.

---

## E1: HTML Skeleton + Mobile Shell

**Purpose**: Create the game's HTML entry point so the Playwright test can load it and find a game area.

**Read Scope**: `.`, `test.mjs`
**Write Scope**: `index.html`

### Changes
- Create `index.html` with:
  - `<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover">`
  - `<div id="game">` container
  - Chapter title area
  - Narrative text area (scrollable)
  - Choice button area (buttons >= 44px height)
  - Attribute panel sidebar
  - `<script src="js/main.js">`
  - Mobile-adaptive CSS (竖屏 375-430px)
  - Basic color theme (warm starting palette)

### Acceptance Criteria
- [ ] `index.html` loads without JS errors
- [ ] Game area detected by test (div#game with dimensions)
- [ ] Touch interaction works (no crash)
- [ ] At least 1 button visible with >= 44px height
- [ ] No horizontal overflow at 375px width

### Test Command
```bash
node test.mjs .
```

### Budget
- Files modified: 1 (new: index.html)
- Estimated lines: ~120

---

## E2: Core Game State + Attribute System

**Purpose**: Implement the game engine in `js/main.js` — state machine, 6 attributes, decline mechanics.

**Read Scope**: `index.html`, `game11-walking-silence.md`
**Write Scope**: `js/main.js`

### Changes
- Implement in `js/main.js`:
  - Game state object: `{ chapter, stage, attributes, choices, ended }`
  - 6 attributes with initial values (Logic:95, Engineering:90, Rhetoric:85, Memory:80, Will:75, Perception:70)
  - Attribute decline function (per stage advancement)
  - Chapter/stage progression state machine
  - `init()` — wire up DOM elements, render initial state
  - `render()` — update all DOM elements from game state
  - Touch event handlers for choice buttons

### Acceptance Criteria
- [ ] Game initializes and shows Chapter 1 title
- [ ] Attribute panel displays all 6 attributes with starting values
- [ ] Player can tap a choice to advance
- [ ] Attributes visibly decline after advancing
- [ ] No JS errors after multiple interactions

### Test Command
```bash
node test.mjs .
```

### Budget
- Files modified: 1 (rewrite js/main.js)
- Estimated lines: ~200

---

## E3: Narrative Content + Choice System + Endings

**Purpose**: Add story content for Chapters 1-4, implement meaningful choices, add ending detection.

**Read Scope**: `js/main.js`, `game11-walking-silence.md`
**Write Scope**: `js/main.js` (expand inline data)

### Changes
- Add narrative data structure:
  - ~10 narrative texts per chapter × 4 chapters = ~40 texts
  - 2-3 choices per stage with attribute impact
  - Choices branch between "resist" and "accept" paths
- Implement choice resolution:
  - Apply attribute changes based on choice
  - Detect wrong-path spirals (resist → faster decline)
  - Detect acceptance bonuses (accept → slower decline in that attribute)
- Implement ending detection:
  - Game Over: any attribute hits 0 from resist path
  - Fear ending: Will drops to 0 while resisting
  - Silence ending: all attributes approach 0 through acceptance
- Add ending screen rendering

### Acceptance Criteria
- [ ] Player can play through Chapters 1-4
- [ ] Choices affect attribute decline rates
- [ ] "Resist" choices accelerate decline
- [ ] "Accept" choices slow decline
- [ ] At least 2 distinct endings reachable
- [ ] Ending screen displays with restart option

### Test Command
```bash
node test.mjs .
```

### Budget
- Files modified: 1 (js/main.js — append narrative data)
- Estimated lines: ~180

---

## E4 (IF BUDGET ALLOWS): UI Decay System

**Purpose**: Implement progressive UI degradation as attributes drop below thresholds.

**Read Scope**: `index.html`, `js/main.js`
**Write Scope**: `js/main.js`, `index.html`

### Changes
- Add threshold-based UI effects:
  - Logic < 20: hide detailed attribute numbers
  - Engineering < 15: disable build options
  - Rhetoric < 10: reduce NPC dialogue options
  - Memory < 20: blur the map/progress display
  - Will < 10: add screen-edge darkness effect
  - Perception < 20: shorten environment descriptions
- Add CSS transitions for gradual effects
- Update render() to check thresholds

### Acceptance Criteria
- [ ] UI elements visibly degrade as attributes drop
- [ ] Effects are gradual (CSS transitions), not instant
- [ ] Game remains playable through degradation

### Test Command
```bash
node test.mjs .
```

### Budget
- Files modified: 2 (index.html + js/main.js)
- Estimated lines: ~80

---

## Dependency Graph

```
E1 (HTML shell) → E2 (game engine) → E3 (narrative + endings) → E4 (UI decay)
```

Each packet is self-contained and leaves the game in a passing state for `test.mjs`.

## Budget Summary

| Packet | Files | Lines | Cumulative Files | Cumulative Lines |
|--------|-------|-------|------------------|------------------|
| E1     | 1     | ~120  | 1                | ~120             |
| E2     | 1     | ~200  | 2                | ~320             |
| E3     | 1     | ~180  | 2                | ~500             |
| E4     | 2     | ~80   | 2                | ~580             |

**Note**: E1-E3 stays within 500-line budget. E4 exceeds by ~80 lines. Manager should approve E4 only if budget can be relaxed. Core game (E1-E3) fits within 4-file, 500-line constraints (only 2 files actually modified).
