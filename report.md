# Task 1 — Company Leaderboard: Approach Report

## Overview

The goal of this task was to recreate a company leaderboard page — originally built on SharePoint — as a standalone, modern React application. The original leaderboard displayed employee rankings based on contributions across Education, Public Speaking, and University Partnership categories.

## Privacy-First Data Strategy

The original leaderboard contained real employee data (names, photos, titles, scores). Screenshots of the original UI were used solely as **visual reference** to understand the layout, component structure, and interaction patterns. However, none of the real employee data was carried into the codebase:

1. **Defined TypeScript interfaces** for each component block (`ListUser`, `Activity`, `LeaderboardUser`, `CommentType`) based on the structure observed in the original UI.
2. **Built a data generation script** (`src/data/mockLeaderboardData.ts`) that produces 150 entirely synthetic mock users from those interfaces — with randomized names (English and Russian), job titles, activity histories, and scores.
3. **Used the interfaces as contracts** to build all UI components, then plugged the generated mock data in. This meant the final application contains no real employee information — all names, scores, and activities are fabricated.

Avatar images use the public `randomuser.me` API, with proper gender assignment (`/men/` vs `/women/` paths). Russian-style last names automatically receive the feminine `-a` suffix for women (e.g., Ivanov → Ivanova).

## Tech Stack & Tools

| Layer | Choice |
|-------|--------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Data | In-memory mock generation (no backend) |
| Icons | Inline SVG components |

## Component Architecture

The app is broken into focused, reusable components:

- **`Leaderboard.tsx`** — Top-level page: manages filter state, computes filtered/sorted user lists, renders the podium, list, comments, and stats.
- **`LeaderboardList.tsx`** — Renders ranked rows with expandable activity details. Each row shows rank, avatar, name, category icons with tooltips, and total score.
- **`Filters.tsx`** — Dropdowns for Year, Quarter, Category, and a search input. All state is lifted to the parent.
- **`Comments.tsx`** — Threaded comment system with add, edit, delete, reply, and like functionality. Sort by Newest/Oldest/Popular.
- **`PostStats.tsx`** — Engagement metrics bar (likes, views, save).

## Filtering Logic

Filters are applied via `useMemo` in `Leaderboard.tsx`:

- **Category** — Checks if the user has at least one activity matching the selected category.
- **Quarter** — Each activity carries a `quarter` field (Q1–Q4) derived from its month. The filter checks for matching activities.
- **Search** — Case-insensitive name matching.
- **Podium visibility** — When searching, the podium hides unless one of the current top-3 performers matches the search term. This prevents showing an irrelevant podium during targeted searches.

## Mobile Responsiveness

The final phase focused on making every component mobile-friendly without breaking the desktop layout:

- **Filters** stack vertically on mobile (`flex-col`), with full-width dropdowns and a taller search input.
- **Podium** switches from a side-by-side row to a vertical stack (1st → 2nd → 3rd), using CSS `order` to resequence without changing the data array.
- **Leaderboard rows** split into two visual rows on mobile: user info on top, activity icons + expand button below — separated by implicit spacing. The total score column is hidden on mobile.
- **Expanded activity table** becomes horizontally scrollable on mobile (`overflow-x-auto` with `min-w-[500px]`), preventing column compression.
- **Comments** have reduced reply indentation on mobile and proper edge padding.

## Key Decisions

- **No external UI library** — All components (tooltips, dropdowns, expand animations) are built from scratch using Tailwind utilities and CSS transitions, keeping the bundle small.
- **Deterministic mock data** — The seed generates data once at module load, so the leaderboard is consistent across page refreshes within a session.
- **Activity counts derived from data** — `educationCount`, `presentationCount`, and `smileCount` are computed directly from each user's activity array, guaranteeing the badge numbers always match the expanded dropdown.
