<!-- SPECKIT START -->

## Project: Elevate

Astro 6 + React 19 + TypeScript 6 monorepo with Tailwind CSS 4 and shadcn/ui.

## Architecture

```
elevate/
├── apps/web/          # Astro application (pages, routing, data fetching)
│   └── src/
│       ├── components/  # Page-specific components
│       ├── layouts/     # Astro layouts
│       ├── lib/         # App-specific utilities
│       └── pages/       # Route pages (.astro + .tsx)
├── packages/ui/        # Shared UI component library
│   └── src/
│       ├── components/  # shadcn/ui-style components
│       ├── hooks/       # Shared React hooks
│       ├── lib/         # Utilities (cn, cva configs, etc.)
│       └── styles/      # Global CSS (Tailwind entry)
```

- `packages/ui` owns all reusable UI; `apps/web` composes pages from them
- Import UI via `@workspace/ui/components/*` — no cross-package relative imports
- Components must exist in 2+ views before being elevated to `packages/ui`

## Tech Stack

| Layer           | Technology                       |
| --------------- | -------------------------------- |
| Framework       | Astro 6 + React 19               |
| Language        | TypeScript 6 (strict mode)       |
| Styling         | Tailwind CSS 4 + tw-animate-css  |
| UI Library      | shadcn/ui (via @workspace/ui)    |
| Icons           | lucide-react                     |
| Package Manager | pnpm 10.33.4                     |
| Monorepo        | Turborepo                        |
| Testing         | Vitest (workspace-level)         |
| Linting         | ESLint 10 + Prettier 3           |
| Git Hooks       | Husky + lint-staged + commitlint |

## Code Style & Conventions

- **TypeScript strict mode** — no `any`, no `@ts-ignore`, explicit return types
- **Prefer `interface`** for object shapes, `type` for unions/intersections
- **shadcn/ui patterns** — components use `cva()` for variants, `cn()` from `tailwind-merge` for class merging
- **Naming**: PascalCase for components, camelCase for functions/variables, kebab-case for files
- **File organization**: One component per file, match file name to exported component
- **Exports**: Named exports for components, `export type` for TypeScript types

## Common Commands

| Command          | Action                                   |
| ---------------- | ---------------------------------------- |
| `pnpm dev`       | Start dev servers                        |
| `pnpm build`     | Build all packages + apps                |
| `pnpm test`      | Run Vitest across workspace              |
| `pnpm lint`      | ESLint check                             |
| `pnpm typecheck` | TypeScript strict check (`tsc --noEmit`) |
| `pnpm format`    | Prettier format                          |
| `pnpm changeset` | Create a changeset for versioning        |

## Component Patterns (shadcn/ui)

Components in `packages/ui/src/components/` follow this structure:

```tsx
// file: packages/ui/src/components/button.tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@workspace/ui/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md ...",
  {
    variants: {
      variant: {
        default: "bg-primary ...",
        destructive: "...",
        outline: "...",
      },
      size: { default: "h-10 px-4 ...", sm: "...", lg: "..." },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants, type ButtonProps }
```

## Feature Workflow (Spec-kit)

All features follow: **specify → plan → tasks → implement** with review gates:

1. `speckit.specify` — Generates feature spec in `specs/{###}-name/spec.md`
2. Review spec (gate)
3. `speckit.plan` — Creates implementation plan with research, data model, contracts
4. Review plan (gate)
5. **Typecheck gate** — Run `pnpm typecheck` before proceeding
6. `speckit.tasks` — Generates task list from spec + plan
7. `speckit.implement` — Executes tasks
8. **Lint gate** — Run `pnpm lint`
9. **Build gate** — Run `pnpm build`
10. **Test gate** — Run `pnpm test`

Branch convention: `{type}/{###}-{kebab-case-description}` (e.g., `feat/001-add-auth`)

## Constraints

- `packages/ui` MUST NOT depend on any app package
- Circular dependencies are strictly forbidden
- Every dependency must justify its weight (YAGNI)
- Commit messages must follow Conventional Commits spec

<!-- SPECKIT END -->
