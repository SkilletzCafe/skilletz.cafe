# AGENTS.md - AI Agent Guidelines for Skillet'z Cafe Website

## ⚠️ This is a PUBLIC Repository

This repository is publicly visible on the internet. **Never commit:**

- API keys, tokens, or secrets
- Passwords or credentials
- Private business information
- Customer data
- Internal URLs or endpoints

If you accidentally commit sensitive data, alert the maintainer immediately. The data is already exposed - a force push doesn't remove it from GitHub's servers or anyone who cloned/forked.

---

## 🚀 Deployment Architecture

### How It Works

1. **GitHub Pages** hosts the production site at [skilletz.cafe](https://skilletz.cafe)
2. The `docs/` directory contains the static build output
3. **Any push to `master` automatically deploys to production**
4. There is no staging environment - master IS production

### The Golden Rule

> **Never push directly to `master` without explicit approval.**

Changes pushed to master go live immediately. This includes:

- Source code changes (`src/`)
- Build artifacts (`docs/`)
- Configuration files

---

## 🔄 Deployment Workflow

### For Testing/Development

1. Create a feature branch: `git checkout -b feature/my-change`
2. Make changes to source files in `src/`
3. Test locally with `npm run dev`
4. Build with `make build` to verify the build succeeds
5. **Do NOT push to master** - create a PR for review

### For Production Deployment

1. Get explicit approval from the maintainer
2. Merge the approved PR to master
3. GitHub Pages automatically deploys the `docs/` folder

### Build Commands

```bash
npm run dev      # Local development server
make build       # Production build (outputs to docs/)
npm run lint     # Check for errors
```

---

## 🛡️ Security Guidelines

### DO ✅

- Use environment variables for any secrets (local dev only)
- Keep sensitive config in `.env` files (gitignored)
- Review diffs before committing
- Ask before making external-facing changes

### DON'T ❌

- Commit `.env` files or any secrets
- Hardcode API keys, tokens, or passwords
- Include internal business data in code or comments
- Push directly to master without approval
- Create scripts that scan for sensitive strings (anti-pattern - the script itself exposes what you're trying to hide)

### Anti-Pattern Warning

Never create scripts that contain lists of sensitive strings to scrub or detect. By including the sensitive values in the script, you've already exposed them. If you need to scan for secrets, use external tools like `git-secrets` or `trufflehog` that use pattern matching, not literal values.

---

## 📁 Repository Structure

```
skilletz.cafe/
├── src/                  # Source code (React/Next.js)
│   ├── pages/           # Page components
│   ├── components/      # Reusable components
│   ├── config/          # Site configuration
│   └── styles/          # CSS modules
├── docs/                 # Built static site (auto-generated)
├── public/              # Static assets
└── package.json         # Dependencies
```

### Key Files

- `src/config/business.ts` - Business info (hours, address, etc.)
- `src/pages/index.tsx` - Homepage
- `Makefile` - Build automation

---

## 🤖 AI Agent Checklist

Before making any changes:

1. [ ] Is this a public repo? (Yes - don't include secrets)
2. [ ] Am I on a feature branch? (Don't work on master)
3. [ ] Do I have explicit approval to deploy?
4. [ ] Have I reviewed the diff for sensitive data?

Before pushing:

1. [ ] Run `npm run lint` - no errors?
2. [ ] Run `make build` - build succeeds?
3. [ ] Is this going to master? (If yes, STOP - create a PR instead)

---

## 📞 Contact

For questions about deployment or access, contact the repository maintainer.
