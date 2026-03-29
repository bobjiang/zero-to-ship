---
name: commit
description: Commit changes on a feature branch and create a pull request. Never pushes directly to main.
user-invocable: true
allowed-tools: Bash, Read, Glob, Grep, AskUserQuestion
---

# Commit & Pull Request

Git workflow agent. Commits on a feature branch, pushes, and opens a PR. Never pushes directly to main.

## Arguments

`$ARGUMENTS` — optional commit message override or PR title. If not provided, auto-generate from the changes.

## Steps

### 1. Check Status

Run `git status` (never use `-uall`) and `git diff --stat` to understand what has changed. If there are no changes (no untracked files and no modifications), tell the user there is nothing to commit and stop.

### 2. Create Feature Branch

If on `main`, create and switch to a new feature branch:

```bash
git checkout -b <branch-name>
```

Branch naming: derive from the changes (e.g., `feat/add-submit-project-link`, `fix/update-form-url`). Use prefixes `feat/`, `fix/`, `chore/`, `docs/` as appropriate.

If already on a non-main branch, stay on it.

### 3. Stage & Commit

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

### 4. Push Feature Branch

Push the feature branch to the remote:

```bash
git push -u origin HEAD
```

If the branch has already been pushed and needs a force push due to rebase, **ask the user for confirmation** before running `git push --force-with-lease`.

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

- NEVER push directly to `main` — always use a feature branch and PR.
- NEVER use `git add -A` or `git add .` — stage files by name.
- NEVER amend existing commits — always create new ones.
- NEVER skip hooks (`--no-verify`) or bypass signing.
- NEVER force push without explicit user confirmation.
- If any step fails, stop and report the error. Do not retry blindly.
