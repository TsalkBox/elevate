# Contributing

## Workflow

This project supports two development paths. Pick the one that fits your workflow.

### Path A: Spec-Driven (with AI Agent)

Uses spec-kit slash commands to generate specs, plans, and tasks before implementation.

```bash
# Install the CLI (once)
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.10.2

# In your AI agent, use slash commands in order:
#   $speckit.specify       - Create feature specification
#   $speckit.plan          - Technical implementation plan
#   $speckit.tasks         - Break down into tasks
#   $speckit.implement     - Execute implementation
```

Branch convention: `{type}/{###}-{kebab-case-description}` (e.g., `feat/001-add-auth`)

### Path B: Manual (no AI)

```bash
# Create your feature branch
git checkout -b feat/my-feature

# Make changes, then commit
git add <files>
git commit -m "feat: add my feature"
```

The CI pipeline (lint → typecheck → test → build) and pre-commit hooks (lint-staged + commitlint) enforce code quality regardless of development path.

## Branch Naming

Convention: `{type}/{optional-number}-{kebab-case-description}`

| Type       | Use Case                      |
| ---------- | ----------------------------- |
| `feat`     | New feature                   |
| `fix`      | Bug fix                       |
| `chore`    | Tooling, config, dependencies |
| `docs`     | Documentation only            |
| `refactor` | Code restructuring            |
| `test`     | Adding or fixing tests        |
| `style`    | Formatting, styling           |

Examples: `feat/001-add-auth`, `fix/nav-bar-overflow`, `chore/upgrade-deps`

## Commit Messages

Must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

body (optional)
```

Valid types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `ci`, `perf`, `build`, `revert`

## Development Cycle

```bash
pnpm install        # Install dependencies
pnpm dev            # Start dev server (apps/web)
pnpm lint           # Check linting
pnpm typecheck      # TypeScript check
pnpm test           # Run tests
pnpm build          # Production build
pnpm format         # Format all files
```

## PR Checklist

Before opening a pull request:

- [ ] `pnpm lint` passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm test` passes
- [ ] `pnpm build` passes
- [ ] Commit messages follow conventional commits
- [ ] Tests added for new functionality
- [ ] Changeset added (if affecting `@workspace/ui`)

## Project Structure

```
elevate/
├── apps/web/          # Astro application
├── packages/ui/       # Shared UI components (shadcn/ui)
├── specs/             # Feature specifications (from spec-kit)
├── .specify/          # Spec-kit templates and scripts
```
