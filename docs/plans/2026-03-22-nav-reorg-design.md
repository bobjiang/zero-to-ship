# Navigation Reorganization Design

**Date:** 2026-03-22

## Goal

Reorganize the site navigation from 6 flat top-level links to 4 top-level items, with "About" containing a dropdown submenu. Remove Forum link. Add a new `/community` page.

## New Navigation Structure

| Level 1 | Level 2 (About dropdown) |
|---------|--------------------------|
| Courses | Our Story → `/about` |
| Services | AI Daily News → `/news` |
| Events | Blog → `/blog` |
| About ▾ | Community → `/community` |

## Header (Desktop)

- Left: Logo + `Courses | Services | Events | About▾`
- "About" hover dropdown: CSS-only using Tailwind `group`/`group-hover:block`
- Dropdown: absolute-positioned white card with shadow, 4 stacked links
- Right side: Discord and Forum icon links removed

## Header (Mobile)

- Hamburger icon button (right side)
- Slide-out panel from right with all links stacked
- About sub-items shown inline (no accordion)
- Close button (X icon)
- Requires `"use client"` for toggle state

## New `/community` Page

- Simple static page at `src/app/community/page.tsx`
- Title: "Community", intro text
- 3 cards in a grid (stacked on mobile):
  - X → https://x.com/zero_to_ship
  - GitHub → https://github.com/bobjiang/zero-to-ship
  - Discord → https://discord.gg/btqaA3hzKp
- All external links open in new tabs

## Footer (3 columns)

1. **02Ship** — description
2. **Learn** — Courses, Services, Events
3. **About** — Our Story, AI Daily News, Blog, Community

Forum link removed entirely.

## Files Changed

| File | Action |
|------|--------|
| `src/components/layout/Header.tsx` | Rewrite — `"use client"`, hover dropdown, mobile hamburger |
| `src/components/layout/Footer.tsx` | Edit — 3 columns, updated links |
| `src/app/community/page.tsx` | New — community page |
