# AGENTS.md - Multi-agent contributor guide for skilletz.cafe

This repository is used by humans and multiple AI coding tools (OpenClaw, Codex, Claude Code, Cursor, and others). These instructions are editor-agnostic on purpose.

## ⚠️ Public repository safety

This repo is public. Never commit:

- API keys, tokens, or secrets
- Passwords or credentials
- Private business information that should not be public
- Customer data
- Internal-only URLs, endpoints, or operational notes

If sensitive data is committed, notify the maintainer immediately. Force-pushing does not make exposed data safe again.

## Deployment model

- Production is hosted on GitHub Pages at <https://skilletz.cafe>
- `docs/` is the built static output
- Any push to `master` deploys production
- There is no staging environment in this repo

### Golden rules

> Never push directly to `master` without explicit maintainer approval.
> Never merge a PR or run `make deploy` without explicit maintainer approval in the same conversation. A request to implement, fix, add, or prepare a change is approval to open a PR only; it is not approval to merge or deploy.

## Required workflow

1. Create a feature branch
2. Make source changes in `src/` (and other source/config files)
3. Test locally
4. Build before handing off for review
5. Open a PR
6. Stop and wait for explicit maintainer approval before merging or deploying
7. Merge to `master` or run `make deploy` only after that explicit approval

## Source of truth

- Edit `src/`, not `docs/`
- Treat `docs/` as generated output
- If business data/config changes, prefer centralized config files over repeating values inline

## Commands

```bash
npm run dev      # local development server
npm run lint     # lint checks
make build       # production build into docs/
make deploy      # production deploy: build docs/, commit them, and push to origin master
```

## Before you commit

- Confirm you are not on `master`
- Review the diff for secrets and accidental public disclosure
- Run the smallest relevant validation for the files you changed
- If source files changed, verify the project still builds

## Before you push

- `npm run lint`
- `make build`
- Confirm changes belong in source files, not accidental edits to generated output only
- Confirm the branch is intended for PR review, not direct production deploy

## Before you merge or deploy

- Confirm the maintainer explicitly approved the merge or deploy in the current conversation
- Do not infer merge/deploy approval from a request to implement, test, fix, add, or open a PR
- If approval is unclear, ask once and wait
- Rollbacks require explicit rollback authorization; rollback permission does not authorize unrelated merges/deploys

## Project guidance index

- `CONTRIBUTING.md` — human contributor workflow and PR checklist
- `SECURITY.md` — public-repository security policy and incident expectations
- `agent-docs/repository.md` — repository structure, deployment, config, and git expectations
- `agent-docs/frontend.md` — TypeScript, React, CSS, accessibility, and testing guidance
- `agent-docs/menu-system.md` — menu data pipeline and menu/TV-specific patterns
- `agent-docs/learnings.md` — project-specific lessons and pitfalls worth preserving

## Default engineering expectations

- Keep components focused and single-purpose
- Prefer semantic naming over reusing near-matching components/styles
- Keep data processing separate from presentation
- Preserve accessibility: keyboard access, contrast, semantic HTML, alt/fallback states
- Build mobile-first and verify layouts at narrow widths
- Add comments only when they explain non-obvious decisions or workarounds

## Repository-specific reminders

- External links should use `target="_blank"` where that is the project convention
- Typography should use the project font utilities/config rather than ad hoc font-family declarations
- Missing images must degrade gracefully without hiding content
- Avoid horizontal overflow on mobile

## Deleting old editor-specific rules

This repository intentionally moved away from `.cursor/**` as the source of truth for agent guidance. If you find stale editor-specific rules, migrate any still-useful content into `AGENTS.md` or `agent-docs/*.md` instead of creating another tool-specific ruleset.
