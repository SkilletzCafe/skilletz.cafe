# Repository guide

## Repo shape

- `src/` — source code and content
- `public/` — static assets
- `docs/` — generated site output for GitHub Pages
- `src/config/` — site/business configuration when applicable

## Source vs generated output

Make changes in `src/` and related source/config files.

Do not hand-edit `docs/` unless you are intentionally fixing generated output as part of the deploy/build workflow. In normal work, `docs/` should be produced by `make build` or `make deploy`.

## Deployment behavior

- `master` is production
- GitHub Pages serves the generated `docs/` directory
- `docs/.nojekyll` is required for GitHub Pages to serve Next.js output correctly
- `make deploy` is a production deploy command: it builds `docs/`, commits the generated output, and pushes to `origin master`
- Do not merge to `master` or run `make deploy` without explicit maintainer approval in the same conversation
- Treat implementation/fix requests as approval to prepare a PR only, not approval to ship production changes

## Key config files

These files define project behavior and should be updated deliberately:

- `.editorconfig`
- `.prettierrc`
- `.eslintrc`
- `tsconfig.json`
- `next.config.mjs`
- `package.json`
- `Makefile`
- `.vscode/` and `skilletz.cafe.code-workspace` for editor convenience only
- `.husky/` for git hooks

When changing configuration, keep docs concise and avoid duplicating file contents into multiple places.

## Git expectations

- Branch for all non-trivial work
- Open a PR for review
- Keep commits focused
- Review generated output before shipping it
- Stop at the PR until Jonathan/maintainer explicitly approves merge/deploy

## Public-repo security

Never put secrets, internal-only operational notes, or sensitive customer/business data in tracked files, examples, comments, tests, or screenshots.

Use `SECURITY.md` as the source of truth for reporting exposed secrets, security concerns, and dependency/supply-chain expectations.

## Contributing workflow

Use `CONTRIBUTING.md` as the human-readable workflow and PR checklist. Keep this agent guide focused on repository-specific implementation details rather than duplicating the full contributor guide.
