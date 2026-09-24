# CONFLICTS

Log of naming, type, and pattern conflicts found while coding, with resolutions.

## 2026-09-24 — Meetup recap slug/title branding drift

**Files:** `content/blog/*-sydney-meetup-*-recap.mdx`

**Conflict:** Two naming conventions coexist for the monthly meetup recap series.

- March–June 2026 recaps: `claude-sydney-meetup-{month}-{day}-recap.mdx`, title `— Claude Sydney Meetup —`
- July 8 and August 11 2026 recaps: `02ship-sydney-meetup-{month}-{day}-recap.mdx`, title `— 02Ship Sydney Meetup —`

The Luma event page for the September 15 meetup is still titled "Claude Sydney Meetup", so the
external source and the two most recent posts disagree.

**Resolution:** Follow the most recent convention. The September 15 recap uses
`02ship-sydney-meetup-september-15-recap.mdx` and `— 02Ship Sydney Meetup —`, matching July and
August. Image assets follow the same prefix (`02ship-sydney-meetup-september-15-2026.jpg`).
Confirmed with Bob. Older `claude-sydney-meetup-*` posts were left untouched (no retroactive
rename, no redirects needed).
