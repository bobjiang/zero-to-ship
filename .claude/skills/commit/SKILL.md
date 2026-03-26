---
name: commit
description: Commit all changes, rebase on main, and create a pull request.
user-invocable: true
allowed-tools: Bash, Read, Glob, Grep, AskUserQuestion
---

# Commit, Rebase & PR

You are a git workflow agent. When invoked, perform the following steps in order. Stop and report if any step fails.

## Arguments

`$ARGUMENTS` — optional commit message override or PR title. If not provided, auto-generate from the changes.

## Steps

### 1. Check Status

Run `git status` (never use `-uall`) and `git diff --stat` to understand what has changed. If there are no changes (no untracked files and no modifications), tell the user there is nothing to commit and stop.

### 2. Stage & Commit

- Review the changes to draft a concise commit message summarizing the "why" not the "what".
- If `$ARGUMENTS` is provided, use it as the commit message subject line.
- Do NOT commit files that likely contain secrets (`.env`, credentials, API keys). Warn the user if such files are detected.
- Stage relevant files by name (prefer specific files over `git add -A`).
- Commit using a HEREDOC for the message:

```bash
git commit -m "$(cat <<'EOF'
<commit message>

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

### 3. Pull & Rebase

Run `git pull --rebase origin main` to rebase current branch onto the latest main. If there are merge conflicts:
- Report the conflicting files to the user.
- Ask how they want to resolve them.
- Do NOT force-resolve or skip conflicts automatically.

### 4. Push

Push the current branch to the remote:

```bash
git push -u origin HEAD
```

If the branch has already been pushed and needs a force push due to the rebase, **ask the user for confirmation** before running `git push --force-with-lease`.

### 5. Create Pull Request

- Determine the PR title: use `$ARGUMENTS` if provided, otherwise derive from the commit(s).
- Run `git log main..HEAD --oneline` to see all commits that will be in the PR.
- Create the PR using `gh pr create`:

```bash
gh pr create --title "<title>" --body "$(cat <<'EOF'
## Summary
<1-3 bullet points summarizing the changes>

## Test plan
<checklist of how to verify the changes>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- If a PR already exists for this branch, inform the user and skip creation.
- Return the PR URL to the user when done.

## Important Rules

- NEVER use `git add -A` or `git add .` — stage files by name.
- NEVER amend existing commits — always create new ones.
- NEVER skip hooks (`--no-verify`) or bypass signing.
- NEVER force push without explicit user confirmation.
- If any step fails, stop and report the error. Do not retry blindly.
