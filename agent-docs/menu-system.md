# Menu system guide

## Scope

Use this guide when working on:

- `src/pages/menu.tsx`
- `src/scripts/menu/**/*.ts`
- `src/styles/Menu.module.css`
- `src/data/menu/**/*`
- TV/menu display pages that depend on processed menu data

## Data flow

1. Raw Toast menu data lives in `src/data/menu/raw/toast-menu.json`
2. Processing happens in `src/scripts/menu/process-menu.ts`
3. Processed output is written to `src/data/menu/processed/menu.json`
4. Frontend pages consume the processed structure

## Rules

- Keep processing logic separate from display logic
- Filter non-orderable/non-visible items during processing, not in scattered UI code
- Prefer Toast image URLs directly when they are already available
- Keep types/data shapes clear and simple

## Frontend expectations

- Mobile-first responsive layout
- Lazy-load images where appropriate
- Clear placeholder/fallback behavior
- Keyboard-accessible navigation
- Avoid janky transitions or layout shift

## TV display learnings

For kiosk/TV-style displays:

- use clearly named timing constants
- support real-time/manual navigation controls when the feature already expects them
- preserve smooth, predictable transitions
- keep client-side ordering/shuffling logic explicit
- keep long-running display behavior resilient (for example, periodic reload if that is part of the design)
