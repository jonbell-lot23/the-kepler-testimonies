# Plan: Initialize Context Network for The Kepler Testimonies

## Overview

Create a context network for this collaborative fiction project following the pattern in `inbox/context-network-guide.md`. The project is minimal right now (just README.md), so this is a clean initialization.

## What We Know

From README.md:
- **Project**: The Kepler Testimonies - experimental collaborative fiction
- **Premise**: "500 testimonies from a vanished ship. 488 are ordinary. 12 are impossible. All are true."
- **Model**: AI (Claude Opus + fiction skills) drafts; humans vote on decisions
- **Origin**: Started from a Threads poll choosing between 3 pitches
- **Status**: Premise selected, next steps TBD
- **Participation**: Via GitHub Discussions (Polls, General, Ideas)

## Files to Create

### 1. Discovery File (root)
**`.context-network.md`** - Entry point pointing to context network location

### 2. Context Network Structure (`context/`)

```
context/
├── discovery.md              # Navigation hub for the network
├── foundation/
│   ├── project.md            # Project definition and goals
│   ├── premise.md            # The winning premise details
│   └── workflow.md           # How AI+human collaboration works
├── story/
│   └── index.md              # Story development hub (currently minimal)
├── community/
│   └── index.md              # Community participation info
├── decisions/
│   └── index.md              # Decision record hub
│   └── 001-premise-selection.md  # First decision: premise vote
├── planning/
│   └── index.md              # Planning hub for next steps
└── meta/
    └── status.md             # Current project state
```

## Content Sources

All content will be extracted from existing README.md:
- Project definition from the header and description
- Premise from the vote results
- Workflow from "How This Works" section
- First decision record from the origin/voting story
- Status from current state

## Notes

- The fiction skills referenced in CLAUDE.md are available via the `.claude/plugins/` system already installed.

## Additional Tasks

### Update CLAUDE.md
Replace the current CLAUDE.md (from Operating Frameworks) with project-specific instructions for The Kepler Testimonies covering:
- Project overview (collaborative fiction)
- Context network usage
- Fiction skills available
- Workflow (AI drafts, humans vote)

### Archive inbox
Move `inbox/context-network-guide.md` to `archive/reference/` after implementation.

## Implementation Order

1. Create `.context-network.md` discovery file
2. Create `context/discovery.md` navigation hub
3. Create foundation documents (project, premise, workflow)
4. Create story index (placeholder for future development)
5. Create community index
6. Create decisions index + first decision record
7. Create planning index
8. Create meta/status.md with current state
9. Create project-specific CLAUDE.md
10. Move inbox guide to archive folder
