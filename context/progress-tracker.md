# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature 02: Editor Chrome

## Current Goal

- Move to the next feature unit (see `context/feature-specs/`).

## Completed

- 01-design-system: shadcn/ui installed and configured (`components.json`, base-nova/base-ui style). Added Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea to `components/ui/`. Installed `lucide-react`. `lib/utils.ts` created with `cn()`. Dark theme tokens from `context/ui-context.md` wired into `app/globals.css` (both the raw palette vars and the shadcn component vars); `<html>` carries a permanent `dark` class since the app has no light mode. Verified via `tsc --noEmit`, `next build`, and a browser screenshot (all-dark rendering, `body` background computed as `rgb(8, 8, 9)` matching `--bg-base`).
- 02-editor-chrome: Added `components/editor/editor-navbar.tsx` (fixed-height 3-column top navbar, `PanelLeftOpen`/`PanelLeftClose` toggle driven by an `isSidebarOpen` prop, empty center/right sections, `bg-surface` with bottom border), `components/editor/project-sidebar.tsx` (fixed full-height floating overlay, `isOpen`/`onClose` props, slides in/out via `translate-x` transition so it never pushes page content, header with title + close button, shadcn `Tabs` for "My Projects"/"Shared" each with an empty placeholder state, full-width `New Project` button with `Plus` icon), and `components/editor/editor-dialog.tsx` (thin wrapper around `components/ui/dialog.tsx` that applies the project's `rounded-3xl` modal radius and `bg-elevated`/`border-surface-border` tokens; re-exports title/description/footer parts; no dialog instances wired up yet, per spec). Verified via `tsc --noEmit`, `eslint`, `next build`, and browser screenshots (sidebar open/closed, toggle icon swap, no layout push).

## In Progress

- None.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- Add unresolved product or implementation questions here.

- `globals.css` did not yet contain the dark theme tokens described in `context/ui-context.md` when this feature started (fresh `create-next-app` scaffold). Resolved by transcribing the documented palette into CSS custom properties and mapping them both to shadcn's internal component variables (`--background`, `--primary`, etc.) and to project-level Tailwind utility aliases (`bg-base`, `text-copy-primary`, `border-surface-border`, `text-brand`, `bg-accent-dim`, plus `text-ai`, `text-error`/`text-success`/`text-warning` for tokens the doc didn't give explicit utility examples for) via `@theme inline`.
- shadcn CLI now defaults to a "base" (Base UI) component style rather than Radix; components use a `render` prop for composition instead of `asChild`. Went with the `base-nova` preset (Lucide + Geist) since it matches this project's icon library and fonts.
- Bug found and fixed during 02-editor-chrome: the `@theme inline` block in `globals.css` defined the four background tokens as `--color-bg-base`, `--color-bg-surface`, `--color-bg-elevated`, `--color-bg-subtle`. Under Tailwind v4's naming rule (utility = `{prefix}-{name-after-"--color-"}`), that produces classes like `bg-bg-base`, not the `bg-base` documented in `context/ui-context.md` — confirmed by compiling a test page and grepping the generated CSS, where `.bg-base`/`.bg-surface`/etc. were absent while `.text-copy-primary`, `.border-surface-border`, etc. (whose var names already matched the doc) compiled fine. Renamed the four vars to `--color-base`, `--color-surface`, `--color-elevated`, `--color-subtle` so the compiled classes match the doc exactly. Re-verified with the same build+grep method.

## Session Notes

- Generated components live under `components/ui/` — do not edit per `context/ai-workflow-rules.md`. Compose/restyle in app-level components instead.
- Base UI's `Input`/`Textarea` add a client-only `style={{caretColor: "transparent"}}`, which triggers a cosmetic React hydration warning in dev. It's internal to the protected `components/ui/*` files and does not affect rendering; not fixed here since it would require editing generated files.
- 02-editor-chrome judgment calls (spec was silent on these): `ProjectSidebar` takes an `onClose` callback alongside `isOpen` since the spec requires a working close button; `EditorNavbar` takes `isSidebarOpen`/`onToggleSidebar` rather than owning its own state, since actual sidebar-open state will belong to whatever page/layout composes these two chrome pieces together (not built yet — this feature unit only covers the standalone components, no editor route/page was created). The sidebar is a full-height (`inset-y-0`) fixed overlay with a higher z-index than the navbar, so it floats above the navbar too, not just the canvas, when open. The dialog pattern lives at `components/editor/editor-dialog.tsx` (colocated with the other chrome components since the spec didn't give it a path) and only adds the project's `rounded-3xl`/token styling on top of `components/ui/dialog.tsx` — no dialog is instantiated anywhere yet.
