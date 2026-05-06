# Security Policy

## Public repository notice

This is a public repository for the Skillet'z Cafe website. Everything committed here should be safe to publish on the public internet.

Do not commit:

- API keys, tokens, passwords, or credentials
- `.env` files or local configuration containing secrets
- Customer data or private messages
- Internal-only business information, URLs, or operational notes
- Screenshots, logs, or build artifacts that expose sensitive data

## Reporting a vulnerability or exposed secret

If you find a vulnerability or accidentally expose sensitive data:

1. Stop and notify the repository maintainer immediately.
2. Do not open a public issue containing the secret or exploit details.
3. Do not assume a force-push fully removes the data. Once pushed to GitHub, the data may have been copied, cached, or forked.
4. Rotate any exposed credential through the owning service before relying on the repository history cleanup.

For non-sensitive security hardening, open a normal pull request with a concise explanation and validation steps.

## Dependency and supply-chain changes

Dependency changes should be intentional and reviewed. For package updates:

- Prefer the smallest change that solves the problem.
- Keep `package-lock.json` in sync with `package.json`.
- Run the relevant validation command before handoff, usually `npm run lint` and `npm run build`.
- Explain why the dependency is needed if adding something new.

## Local development secrets

If local development ever needs credentials, keep them outside git-tracked files. Use local environment variables or ignored `.env*` files, and never include real values in examples or documentation.
