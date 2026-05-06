# Contributing

Thanks for helping improve the Skillet'z Cafe website.

## Start here

Before making changes, read:

- `README.md` for project setup and context
- `AGENTS.md` for contributor and AI-agent workflow rules
- `SECURITY.md` for public-repository safety expectations
- `agent-docs/` for focused repo, frontend, menu-system, and project-learning guidance

## Development workflow

1. Create or use a feature branch. Do not work directly on `master`.
2. Make source changes in `src/`, `public/`, or the relevant config/docs files.
3. Do not hand-edit `docs/` unless you are intentionally updating generated static output as part of the build/deploy workflow.
4. Run the smallest validation that matches your change.
5. Open a pull request with a short summary and the validation you ran.

`master` deploys directly to production through GitHub Pages, so merges should be deliberate and reviewed.

## Common commands

```bash
npm install
npm run dev
npm run lint
npm run format:check
npm run build
make build
```

For normal production build verification, prefer `make build` because it preserves the GitHub Pages requirements handled by the Makefile.

## Pull request checklist

Before requesting review, confirm:

- You are not on `master`.
- The diff contains no secrets, credentials, customer data, or internal-only business notes.
- Generated output changes are intentional.
- Relevant validation passed, or any blocker is clearly documented in the PR.
- The PR description explains what changed and how it was tested.

## Style expectations

- Keep changes focused and easy to review.
- Prefer centralized config/data over repeated inline values.
- Keep UI accessible: semantic HTML, keyboard support, alt text/fallbacks, and mobile-safe layouts.
- Preserve existing formatting by using the project Prettier configuration.

## Security

This repo is public. If you discover an exposed secret or security issue, follow `SECURITY.md` and notify the maintainer privately instead of posting details in a public issue or PR comment.
