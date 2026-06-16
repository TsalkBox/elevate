# Elevate Constitution

## I. TypeScript Strict Mode

All source code MUST pass `tsc --noEmit` without errors. Both `apps/web` and `packages/ui` must typecheck independently. Rules:

- `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization` all ON
- `@ts-ignore` / `@ts-expect-error` forbidden
- `as any` forbidden — use proper types or generics
- Prefer `interface` over `type` for object shapes; `type` for unions, intersections, and aliases
- Exports must have explicit type annotations

## II. Component-First Architecture

Every UI element starts as a component in `packages/ui/src/components/`. Rules:

- Components MUST be independently usable, composable, and testable via their props interface
- Each component file exports a single primary component (named export) plus a `*Variants` config (via `cva`)
- `packages/ui` owns all reusable UI; `apps/web` owns page composition, routing, and data fetching
- A component must exist in at least 2 different views before being elevated to `packages/ui` (YAGNI — prevent premature generalization)
- `apps/web` imports UI via `@workspace/ui/components/*` — no relative imports across package boundaries

## III. Monorepo Discipline

The repository follows a strict `apps/` + `packages/` boundary.

- `packages/*` — zero-runtime-dependency-OR-shared-library code. No app-specific logic.
- `apps/*` — deployable applications. Compose packages, own the router, own data layer.
- Circular dependencies between workspaces strictly forbidden
- Dependency rule: `apps/web → packages/ui → (nothing internal)`. Packages MUST NOT depend on apps.
- All package exports MUST be declared in the `exports` field of `package.json`

## IV. Conventional Commits

Every commit MUST follow the Conventional Commits specification, enforced by commitlint + husky.

```
feat:     New feature (→ minor version bump via changeset)
fix:      Bug fix (→ patch version bump)
chore:    Tooling, CI, config changes
refactor: Code change that is neither feat nor fix
docs:     Documentation only
test:     Adding or correcting tests
style:    Formatting, whitespace (no logic change)
```

- Scope is optional but encouraged: `feat(auth): add login flow`
- Breaking changes MUST add `!` after type/scope: `feat!:` or `feat(api)!:`
- Body MUST explain WHY, not WHAT

## V. Simplicity (YAGNI)

Do not add patterns, abstractions, or dependencies "just in case."

- Start with the simplest thing that works — no repository pattern, no service layer, no custom hooks until duplication actually emerges
- Extract a pattern only after 3+ repetitions in unrelated contexts
- Every dependency must justify its weight: prefer built-in / framework-native solutions over libraries
- If a feature can be built with `< 50 lines` of straightforward code, do not abstract it
- If you need to explain the pattern in a comment, the pattern is too complex — simplify

## Testing (Soft Gate — recommended, not enforced)

Tests are strongly encouraged but not gated. Guidelines:

- Use Vitest (project-wide via `vitest.workspace.ts`)
- Co-locate tests with source: `src/component/component.test.tsx`
- Write tests for: public API of packages, complex business logic, component interaction patterns
- PRs with test coverage on new logic are prioritized in review

## Branch Convention

All feature branches follow the pattern:

```
{type}/{###}-{kebab-case-description}
```

Examples: `feat/001-add-auth`, `fix/002-fix-login-redirect`, `chore/003-update-deps`

- `{type}` matches Conventional Commits types: feat, fix, chore, refactor, docs, test
- `{###}` is a sequential number assigned via spec-kit
- `{description}` is short kebab-case summary

## Governance

- This constitution supersedes any ad-hoc practices
- Amendments require documentation, approval, and a migration plan
- All PRs must verify constitution compliance
- Complexity (patterns, abstractions) must be justified in PR description when flagged
- Use `.specify/memory/constitution.md` as the single source of truth for architectural rules

**Version**: 1.0.0 | **Ratified**: 2026-06-16 | **Last Amended**: 2026-06-16
