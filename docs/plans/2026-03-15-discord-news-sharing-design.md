# Discord News Sharing — Design

**Date:** 2026-03-15
**Status:** Approved

## Goal

Automatically post the top 5 AI news stories to a Discord channel each day, right after the daily news generation runs.

## Architecture

```
GitHub Action (cron 00:07 UTC)
  -> generate-news.mjs -> content/news/YYYY-MM-DD.json (commit + push)
  -> post-discord.mjs -> reads JSON -> formats top 5 -> POST to Discord webhook
```

No new dependencies. Uses Node 22 built-in `fetch()` and `fs`.

## Message Format

Single Discord rich embed:

- **Title:** "AI News — Saturday, March 15, 2026"
- **Color:** Site theme accent
- **Body:** Top 5 stories by score, each showing: score, title (hyperlinked), summary
- **Footer:** Link to full news page on 02ship.com

## Files

### New: `scripts/post-discord.mjs`

- Reads date from CLI arg or defaults to today
- Reads `content/news/{date}.json`
- Sorts items by score descending, takes top 5
- Builds Discord embed payload, POSTs to `DISCORD_WEBHOOK_URL` env var
- Exits 0 on success or failure (non-blocking — news commit already succeeded)

### Modified: `.github/workflows/daily-news.yml`

- Add step after commit:
  ```yaml
  - name: Post to Discord
    run: node scripts/post-discord.mjs
    env:
      DISCORD_WEBHOOK_URL: ${{ secrets.DISCORD_WEBHOOK_URL }}
  ```

## Setup (one-time, manual)

1. Discord: Server Settings -> Integrations -> Webhooks -> New Webhook -> copy URL
2. GitHub: repo Settings -> Secrets -> add `DISCORD_WEBHOOK_URL`

## Local Testing

```bash
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/... node scripts/post-discord.mjs 2026-03-15
```
