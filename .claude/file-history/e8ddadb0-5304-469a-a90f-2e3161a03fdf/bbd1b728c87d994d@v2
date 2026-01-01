# Plan: Document GitHub Workflow in Context Network

## Goal
Document the GitHub-based workflow rules into the context network so they become part of the project's working process.

## What Needs Documenting

The user specified these GitHub workflow rules:
1. **Branch-based development** - Work in branches, merge via PRs
2. **Polls for decisions** - Community decisions go up as GitHub polls
3. **Issues for work items** - Tasks for later sessions go as GitHub issues
4. **Discussions for announcements** - Use discussions for announcements
5. **gh CLI** - Use the logged-in gh CLI for all GitHub activity

## Current State

- `context/foundation/workflow.md` already covers:
  - Conceptual AI+human collaboration model
  - Participation channels (Polls, General, Ideas discussions)
  - Decision flow at high level

- **Missing**: The technical GitHub mechanics for how work gets done

## Implementation Plan

### Step 1: Create GitHub Workflow Document
**File**: `context/foundation/github-workflow.md`

Contents:
- Branch workflow (feature branches → PRs → main)
- When to create GitHub Issues (work items for later)
- When to create GitHub Polls (community decisions)
- When to use GitHub Discussions (announcements, async discussion)
- gh CLI as the standard tool

### Step 2: Update Discovery Navigation
**File**: `context/discovery.md`

Add the new document to the Foundation section navigation.

### Step 3: Cross-link from Workflow
**File**: `context/foundation/workflow.md`

Add a link to the new GitHub workflow doc in the Relationship Network section.

### Step 4: Update Status
**File**: `context/meta/status.md`

Record this documentation addition.

## Files to Modify

| File | Action |
|------|--------|
| `context/foundation/github-workflow.md` | CREATE |
| `context/discovery.md` | EDIT - add navigation link |
| `context/foundation/workflow.md` | EDIT - add cross-reference |
| `context/meta/status.md` | EDIT - update status |

## New Document Structure

```markdown
# GitHub Workflow

## Branch Strategy
- All work happens in feature branches
- PRs required to merge to main
- Branch naming conventions

## GitHub Issues
- When to create issues
- How to label/organize

## GitHub Discussions
- Polls: Community votes on story decisions
- General: Narrative discussion
- Ideas: Suggestions and problem flagging
- Announcements: Project updates

## Using the gh CLI
- Standard tool for GitHub operations
- Common commands reference
```
