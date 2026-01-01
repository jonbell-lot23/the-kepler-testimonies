# Planned Fiction Skills

Skills identified as gaps in the current cluster. These extend the diagnostic and tooling coverage beyond what exists.

## Implemented Skills

### worldbuilding ✓
**Status:** Implemented
**Location:** `skills/fiction/worldbuilding/`
**Scripts:** cascade.ts, institution.ts, belief.ts
**Purpose:** Diagnoses world-level problems (States W1-W7.5)

### conlang ✓
**Status:** Implemented
**Location:** `skills/fiction/conlang/`
**Scripts:** phonology.ts, words.ts
**Data:** phoneme-frequencies.json, syllable-templates.json
**Purpose:** Generates phonologically consistent constructed languages
**States:** L1-L5 (language-specific diagnostics)
**Integration:** Extends worldbuilding W7/W7.5, references Evolutionary Language Framework

### genre-conventions ✓
**Status:** Implemented
**Location:** `skills/fiction/genre-conventions/`
**Scripts:** genre-elements.ts, genre-check.ts, genre-blend.ts
**Data:** genre-elements.json (all 11 elemental genres)
**Purpose:** Diagnose genre problems and generate genre-specific elements
**States:** G1-G8 (genre-specific diagnostics)
**Integration:** Connects to story-sense states, handoff to cliche-transcendence for G6

### dialogue ✓
**Status:** Implemented
**Location:** `skills/fiction/dialogue/`
**Scripts:** voice-check.ts, dialogue-audit.ts
**Purpose:** Diagnose flat dialogue, same-voice characters, lack of subtext
**States:** D1-D6 (dialogue-specific diagnostics)
**Integration:** Connects to story-sense State 5.5, handoff to character-arc for voice identity issues

### endings ✓
**Status:** Implemented
**Location:** `skills/fiction/endings/`
**Scripts:** ending-check.ts, setup-payoff.ts
**Purpose:** Diagnose weak endings, rushed resolutions, arbitrary conclusions
**States:** E1-E6 (ending-specific diagnostics)
**Integration:** Connects to story-sense State 5.75, handoff to character-arc for transformation completion

### prose-style ✓
**Status:** Implemented
**Location:** `skills/fiction/prose-style/`
**Scripts:** prose-check.ts, rhythm.ts
**Purpose:** Diagnose sentence-level issues after structure is solid
**States:** P1-P6 (prose-specific diagnostics)
**Integration:** Connects to story-sense State 5.9, handoff to revision for systematic polish

### revision ✓
**Status:** Implemented
**Location:** `skills/fiction/revision/`
**Scripts:** revision-audit.ts
**Purpose:** Guide the edit pass after drafting
**States:** R1-R6 (revision-specific diagnostics)
**Integration:** Connects to story-sense State 6, coordinates all other diagnostic skills

### sensitivity-check ✓
**Status:** Implemented
**Location:** `skills/fiction/sensitivity-check/`
**Scripts:** sensitivity-audit.ts, representation-map.ts
**Purpose:** Evaluate representation and flag potential harm concerns
**States:** S1-S6 (sensitivity evaluation states)
**Mode:** Evaluative (flags concerns, suggests alternatives)
**Integration:** Standalone, supplements all other skills with representation awareness

---

## Diagnostic Skills

**All planned diagnostic skills are now implemented.**

The complete diagnostic skill set covers:
- Story-level: story-sense (core), character-arc, cliche-transcendence
- World-level: worldbuilding, conlang
- Scene-level: scene-sequencing
- Genre-level: genre-conventions
- Dialogue-level: dialogue
- Ending-level: endings
- Prose-level: prose-style
- Meta-level: revision

---

## Application Skills

### sensitivity-check ✓
**Status:** Implemented (see Implemented Skills above)

### shared-world ✓
**Status:** Implemented
**Location:** `skills/fiction/shared-world/`
**Scripts:** init-world.ts, add-entry.ts, check-conflicts.ts, build-index.ts
**Templates:** entry.md, discovery.md, index.md, style-guide.md
**Purpose:** Wiki-style world bible for collaborative fiction
**Mode:** Maintains canonical reference, tracks canon status, coordinates contributors
**Integration:** Blends context-network patterns with worldbuilding, uses wiki-style cross-referencing

### game-facilitator ✓
**Status:** Implemented
**Location:** `skills/fiction/game-facilitator/`
**Scripts:** npc-generator.ts, complication-generator.ts, session-notes.ts
**Purpose:** Narrative RPG game master for collaborative storytelling
**Mode:** Real-time facilitation, scene management, NPC portrayal, content generation
**Integration:** Uses story-sense (narrative), scene-sequencing (pacing), worldbuilding (consistency), character-arc (NPCs), dialogue (voice)

### world-fates ✓
**Status:** Implemented
**Location:** `skills/fiction/world-fates/`
**Scripts:** fate-pressure.ts, fate-roll.ts, fate-choice.ts, propose-shift.ts, exposure-log.ts
**Data:** fate-tracking.json, shift-types.json, fate-choices.json
**Purpose:** Manage long-term fate and fortune across a shared world
**Mode:** Meta-campaign level - operates above game-facilitator to turn the wheel of fortune
**Features:**
- Three-tier exit system (voluntary NPC, fate-offered choice, fate-forced roll)
- Weighted probability based on power, tenure, vulnerabilities, protections
- Probabilistic death/fall that feels like real fate, not arbitrary
- Hybrid mode: generates proposals for human approval
**Integration:** Coordinates with shared-world (world bible), game-facilitator (session boundaries), character-arc (transformation states)

---

## All Planned Skills Complete

All diagnostic and application skills from the original plan have been implemented.

---

## Build Order Recommendation

### Diagnostic Skills (Complete)

1. ~~**worldbuilding**~~ ✓ Done
2. ~~**conlang**~~ ✓ Done (added as complement to worldbuilding)
3. ~~**genre-conventions**~~ ✓ Done (full 11-genre coverage)
4. ~~**dialogue**~~ ✓ Done (States D1-D6, voice-check + dialogue-audit)
5. ~~**endings**~~ ✓ Done (States E1-E6, ending-check + setup-payoff)
6. ~~**prose-style**~~ ✓ Done (States P1-P6, prose-check + rhythm)
7. ~~**revision**~~ ✓ Done (States R1-R6, revision-audit)

### Application Skills (Complete)

1. ~~**sensitivity-check**~~ ✓ Done (States S1-S6, sensitivity-audit + representation-map)
2. ~~**shared-world**~~ ✓ Done (wiki-style world bible with context-network patterns)
3. ~~**game-facilitator**~~ ✓ Done (real-time narrative RPG facilitation)
4. ~~**world-fates**~~ ✓ Done (meta-campaign fate management with three-tier exit system)
