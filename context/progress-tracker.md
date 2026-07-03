# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature 01: Design System

## Current Goal

- Move to the next feature unit (see `context/feature-specs/`).

## Completed

- 01-design-system: shadcn/ui installed and configured (`components.json`, base-nova/base-ui style). Added Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea to `components/ui/`. Installed `lucide-react`. `lib/utils.ts` created with `cn()`. Dark theme tokens from `context/ui-context.md` wired into `app/globals.css` (both the raw palette vars and the shadcn component vars); `<html>` carries a permanent `dark` class since the app has no light mode. Verified via `tsc --noEmit`, `next build`, and a browser screenshot (all-dark rendering, `body` background computed as `rgb(8, 8, 9)` matching `--bg-base`).

## In Progress

- None.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- `globals.css` did not yet contain the dark theme tokens described in `context/ui-context.md` when this feature started (fresh `create-next-app` scaffold). Resolved by transcribing the documented palette into CSS custom properties and mapping them both to shadcn's internal component variables (`--background`, `--primary`, etc.) and to project-level Tailwind utility aliases (`bg-base`, `text-copy-primary`, `border-surface-border`, `text-brand`, `bg-accent-dim`, plus `text-ai`, `text-error`/`text-success`/`text-warning` for tokens the doc didn't give explicit utility examples for) via `@theme inline`.
- shadcn CLI now defaults to a "base" (Base UI) component style rather than Radix; components use a `render` prop for composition instead of `asChild`. Went with the `base-nova` preset (Lucide + Geist) since it matches this project's icon library and fonts.

## Session Notes

- Generated components live under `components/ui/` — do not edit per `context/ai-workflow-rules.md`. Compose/restyle in app-level components instead.
- Base UI's `Input`/`Textarea` add a client-only `style={{caretColor: "transparent"}}`, which triggers a cosmetic React hydration warning in dev. It's internal to the protected `components/ui/*` files and does not affect rendering; not fixed here since it would require editing generated files.
