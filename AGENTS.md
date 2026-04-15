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

### Golden rule

> Never push directly to `master` without explicit maintainer approval.

## Required workflow

1. Create a feature branch
2. Make source changes in `src/` (and other source/config files)
3. Test locally
4. Build before handing off for review
5. Open a PR
6. Merge to `master` only after approval

## Source of truth

- Edit `src/`, not `docs/`
- Treat `docs/` as generated output
- If business data/config changes, prefer centralized config files over repeating values inline

## Commands

```bash
npm run dev      # local development server
npm run lint     # lint checks
make build       # production build into docs/
make deploy      # build and stage deploy output
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

## Project guidance index

- `docs/agents/repository.md` — repository structure, deployment, config, and git expectations
- `docs/agents/frontend.md` — TypeScript, React, CSS, accessibility, and testing guidance
- `docs/agents/menu-system.md` — menu data pipeline and menu/TV-specific patterns
- `docs/agents/learnings.md` — project-specific lessons and pitfalls worth preserving

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

This repository intentionally moved away from `.cursor/**` as the source of truth for agent guidance. If you find stale editor-specific rules, migrate any still-useful content into `AGENTS.md` or `docs/agents/*.md` instead of creating another tool-specific ruleset.
