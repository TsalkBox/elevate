# AI Tooling Recommendations

This document lists recommended AI coding tools and MCP servers for this project.
These are suggestions — each developer chooses their own tools and config.

## Quick Start

```bash
# Install spec-kit CLI (for spec-driven development)
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.10.2

# Bootstrap AI agent integration (pick your agent)
specify init . --force --integration opencode --integration-options="--skills"
specify init . --force --integration claude
specify init . --force --integration copilot
```

## Agent Config Files

AI agent config files (`.opencode/`, `.claude/`, `.agents/`, `opencode.json`)
are **gitignored** and must not be committed to the repository.
Each developer manages their own AI configuration locally.

## MCP Servers

The following MCP servers are useful for this project:

| Server           | Purpose                                                 | Install                                       |
| ---------------- | ------------------------------------------------------- | --------------------------------------------- |
| **Next.js MCP**  | Native access to your active Next.js development server | `npx -y next-devtools-mcp@latest`             |
| **Supabase MCP** | Directly interact with your Supabase backend            | `npx -y @supabase/mcp-server-supabase@latest` |

## For OpenCode Users

1. The project includes an `opencode.json` template (gitignored).
2. Run `specify init . --force --integration opencode --integration-options="--skills"`
   to install speckit slash commands into `.opencode/commands/`.
3. Use `$speckit.*` commands for spec-driven development.

## For Claude Code Users

```bash
specify init . --force --integration claude
```

This installs speckit commands into `.claude/commands/`.
Use `/speckit.*` commands for spec-driven development.

## For GitHub Copilot Users

```bash
specify init . --force --integration copilot
```

Use `/speckit.*` commands in Copilot Chat.
