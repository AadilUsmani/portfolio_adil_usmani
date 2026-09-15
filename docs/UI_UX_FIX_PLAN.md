# UI/UX Remediation Plan — portfolio_adil_usmani

**Source of findings:** `docs/UI_UX_AUDIT.md` (commit `5f96327`), 9-layer audit of the default v2.1 experience.
**Target tree:** this repo, branch `main` (fast-forward from `5f96327`).
**Stack confirmed:** Next 14.2.35 · React 18 · Tailwind 3.4.17 · framer-motion 12.42.0 (`useReducedMotion` available) · npm-managed `node_modules` (no `.pnpm` store).

## 0. Guardrails

1. **No redesign.** Preserve the blueprint/mono brand language, all copy voice, and the existing component structure. Fixes are surgical.
2. **Batch + verify.** Each batch is committed separately and must pass the verification protocol (§3) before the next batch starts.
3. **No silent behaviour changes.** Where a fix is a product decision (hiding the variant switcher, muting sound by default), it is called out explicitly in §2 and logged in the commit message.
4. **Deferred work is listed, not hidden** (§4).
5. **Rollback:** every batch is a single commit on `main`, so `git revert <sha>` restores the prior state.

## 1. Token strategy (the key decision)

The audit found light-mode text tokens failing AA (§4.2): `--color-signal #ea580c` = 3.56:1, `--color-teal #0d9488` = 3.74:1, `--color-lime #16a34a` = 3.0:1.

**Naive fix rejected:** darkening `--color-signal` globally breaks the primary buttons, because `bg-signal text-ink` relies on the bright hue (`#ea580c` on `#0f172a` = 5.02:1; darkened `#b6430a` = 3.23:1 → fail).

**Chosen fix:** split the *hue* role from the *fill* role.

- `--color-<hue>` becomes **text-safe** (light mode): signal `#b6430a` (5.3:1), teal `#0f766e` (5.2:1), lime `#15803d` (4.8:1), rose `#be123c` (6.0:1), violet unchanged `#7c3aed` (6.6:1, already passes).
- New `--color-<hue>-solid` keeps today's bright value for **solid fills behind dark text**: signal-solid `#ea580c`, teal-solid `#0d9488`, lime-solid `#16a34a`, rose-solid `#e11d48`.
- Dark mode: hues already pass (`#ff8a3d` = 8.3:1), so dark values are unchanged; `*-solid` mirrors them.
- Result: all ~90 `text-<hue>` sites become AA-compliant with **zero edits**, and only the ~6 solid-fill buttons need `bg-<hue>` → `bg-<hue>-solid`.

**Blast-radius check:** translucent tints (`bg-signal/15`, `bg-teal/10`) and borders (`border-signal/50`) get slightly darker in light mode. Verified acceptable — they are decorative, and non-text contrast only improves.

## 2. Batches

### B1 — Legibility & contrast (CRITICAL §1.1, §4.2, §9.1)
| # | Change | Files |
|---|---|---|
| B1.1 | Apply the §1 token strategy: text-safe hues + new `*-solid` fills, both themes | `app/globals.css`, `tailwind.config.ts` |
| B1.2 | Fix `.text-outline`: stroke `var(--color-paper-2)` (light ≈11:1, dark ≈9:1) instead of `var(--color-line-2)` (1.3:1 / 1.9:1); add `@supports not (-webkit-text-stroke: 1px #000)` fallback that sets a real `color` so the name is never invisible | `app/globals.css` |
| B1.3 | Give the `h1` an explicit accessible name (`aria-label="Muhammad Adil Usmani"`) so AT/parsers get the full name regardless of the stroke treatment | `components/v2_1/HeroV2_1.tsx` |
| B1.4 | Repoint solid-fill buttons to `bg-<hue>-solid` so dark-on-bright text stays ≥4.5:1 | `ContactV2.tsx`, `ProjectDetailView.tsx`, `SkillsDetailView.tsx`, `VersionSwitcherTopRight.tsx`, `PdfReaderV2.tsx` |
| B1.5 | Add `scripts/contrast-check.mjs` — computes WCAG ratios for the audited pairs from the live CSS variables and exits non-zero on regression | new file, `package.json` script |

**Risk:** low (token values + 6 class swaps). **Verify:** contrast script passes; build green; localhost hero check.

### B2 — Trust: remove the fabricated answer (CRITICAL §6.1, §3.6)
| # | Change | Files |
|---|---|---|
| B2.1 | Delete the synthetic "deterministic execution and strict isolation protocols" fallback in the project chat `catch` block | `components/project-detail/ProjectDetailView.tsx` |
| B2.2 | Replace with an honest failure bubble (`[AGENT]` voice + plain statement that the knowledge service was unreachable) plus a working **Retry** action that re-sends the last query; mark error bubbles with a rose border | same |
| B2.3 | Track `lastQuery` + an `error` flag; disable Retry while in-flight; add `aria-live="polite"` to the transcript so failures are announced | same |
| B2.4 | Match `AssistantV2`'s honest error wording so both chat surfaces behave identically | same |

**Risk:** low. **Verify:** build + localhost; POST an invalid payload to `/api/chat` to confirm the API failure shape, then confirm the UI error path renders the bubble.

### B3 — Dead navigation & dead shortcuts (CRITICAL §3.1, §3.2, §5.2)
| # | Change | Files |
|---|---|---|
| B3.1 | Export `paperSlugs` + `productionSystems` (the 5 non-paper systems) from the data layer; drop the duplicated `PAPER_SLUGS` set in the component | `lib/dataV2.ts`, `components/v2_1/SystemsV2_1.tsx` |
| B3.2 | `goTo()` gains a DOM-existence check; add `hasSection(id)` to the shell context | `components/v2/shell-context.tsx` |
| B3.3 | Number keys `1`–`5` map to `productionSystems` (what is actually rendered) instead of `projects[0..4]` | same |
| B3.4 | `g`-prefixed map restricted to sections that exist; dead entries removed | same |
| B3.5 | Palette builds its Navigate group only from sections present in the DOM (recomputed on open) and shows counts ("5 systems · 3 papers") — addresses §8.6 | `components/v2/CommandPaletteV2.tsx` |
| B3.6 | `SystemsV2_1` consumes `activeProjectId`: stable card ids, scroll-into-view + highlight ring so `focusProject` has a visible effect | `components/v2_1/SystemsV2_1.tsx` |

**Risk:** medium (state/event wiring). **Verify:** build; localhost — palette lists exactly the 5 rendered sections (no Research/Approach), keys `1`–`5` highlight and scroll to a card.

### B4 — Contact form accessibility & error prevention (CRITICAL §4.3, §3.5, §8.3)
| # | Change | Files |
|---|---|---|
| B4.1 | Per-field `aria-invalid` + `aria-describedby` pointing at the error text (stable ids) | `components/v2/ContactV2.tsx` |
| B4.2 | `role="alert"` on the success/error panels; live region for the `POST /api/contact` status word | same |
| B4.3 | On submit, move focus to the first invalid field | same |
| B4.4 | Channel: default to unselected, validate it ("Pick a channel"), add `aria-pressed` to the toggle buttons and its own error slot | same |
| B4.5 | Honeypot: keep `tabIndex={-1}`, add `role="presentation"` so `aria-hidden` isn't applied to a node that looks focusable | same |

**Risk:** low–medium (validation flow). **Verify:** build; localhost — empty submit → focus lands on Name, errors announced; channel must be chosen.

### B5 — Focus, target sizes, motion, audio, dialog semantics (§4.4, §4.5, §4.6, §4.7, §6.3, §6.5, §9.3, §9.4)
| # | Change | Files |
|---|---|---|
| B5.1 | Global `:focus-visible { outline: 2px solid var(--color-signal); outline-offset: 2px }`; stop pairing `outline-none` with subtle border-only changes | `app/globals.css`, `ContactV2.tsx`, `ProjectDetailView.tsx`, `SkillsDetailView.tsx`, `CommandPaletteV2.tsx` |
| B5.2 | `@media (prefers-reduced-motion: reduce)`: disable keyframe animations + `scroll-behavior: auto` | `app/globals.css` |
| B5.3 | `useReveal()` helper returning reduced-motion-aware framer props; used by reveal/typewriter/boot components | `components/v2/ui.tsx`, `HeroV2_1.tsx`, `SystemsV2_1.tsx`, `SkillsV2_1.tsx`, `app/template.tsx`, `AssistantV2.tsx` |
| B5.4 | Sound becomes **opt-in**: default `enabled = false` (choice still persisted); labels become plain ("Interface sounds: on/off") | `lib/mechanicalSound.ts`, `HeroV2_1.tsx` |
| B5.5 | Target sizes: switcher buttons ≥24px, footer links padded, rail mobile icon buttons 44px | `VersionSwitcherTopRight.tsx`, `FooterV2.tsx`, `RailV2.tsx` |
| B5.6 | Dialogs: `aria-modal="true"`, focus first control on open, trap Tab, restore focus to trigger on close | `CommandPaletteV2.tsx`, `PdfReaderV2.tsx`, `AssistantV2.tsx` |
| B5.7 | Remove `section + section { content-visibility: auto; contain-intrinsic-size: 0 600px }`, which corrupts scroll metrics | `app/globals.css` |

**Risk:** medium. **Verify:** build; localhost keyboard tab sweep; reduced-motion emulation check.

### B6 — Production hygiene, CTA hierarchy, brand continuity (§5.1, §1.2, §2.2, §2.3, §2.5, §4.8, §5.6, §6.6, §7.2, §7.3, §7.4, §8.1, §9.5)
| # | Change | Files |
|---|---|---|
| B6.1 | Variant switcher renders only when `NODE_ENV !== "production"` **or** `?dev=1`; in production the same switches remain reachable via the palette (documented, so no capability is lost) | `VersionSwitcherTopRight.tsx` |
| B6.2 | Hero CTA hierarchy: CV = the single solid primary; "Inspect Systems" → outline; "Ask Assistant" → ghost | `HeroV2_1.tsx` |
| B6.3 | Hero `min-h-screen` → `min-h-[100svh]` for mobile toolbars | `HeroV2_1.tsx` |
| B6.4 | Shared `--rail-w: 232px` consumed by both the rail and the main padding | `app/globals.css`, `RailV2.tsx`, `PortfolioV2_1.tsx` |
| B6.5 | Systems grid gains `2xl:grid-cols-3`; drop redundant `lg:grid-cols-2` | `SystemsV2_1.tsx` |
| B6.6 | PDF reader: move the unsupported-browser fallback out of the `<iframe>` children so it can render | `PdfReaderV2.tsx` |
| B6.7 | Error surfaces rebuilt on blueprint tokens/mono voice; `localStorage.clear()` replaced with removal of `adil-*` keys only | `app/error.tsx`, `app/global-error.tsx` |
| B6.8 | Section numbering renumbered to match what actually renders in v2.1 | `SkillsV2_1.tsx`, `ContactV2.tsx` |
| B6.9 | Delete unreferenced `styles/globals.css`; delete `pnpm-lock.yaml` (npm-managed tree) | hygiene |
| B6.10 | Re-enable `eslint`/`typescript` build gates **only if** `tsc --noEmit` and `next lint` are clean; otherwise keep flags and document the backlog | `next.config.mjs` |

**Risk:** medium. **Verify:** production build + `next start`; curl `/` and assert the switcher markup is absent without `?dev=1`.

## 3. Verification protocol (after every batch)

1. **Static:** `npx tsc --noEmit` — long jobs run detached and log to a file (the shell caps a command at 30s).
2. **Contrast regression:** `node scripts/contrast-check.mjs` — asserts every audited pair still meets 4.5:1 (text) / 3:1 (non-text).
3. **Build:** `npm run build` detached → poll `build.log`; any new error blocks the batch.
4. **Runtime:** `npm run start` detached on `http://localhost:3000` → assert HTTP 200 + expected content for `/`, `/skills`, `/projects/<slug>`; then stop the server.
5. **Checklist** for what curl cannot see (focus order, palette filtering, `1`–`5` shake-out) — recorded in the final report.

## 4. Explicitly deferred (Phase 2) — needs product decisions

| Deferred | Why |
|---|---|
| §2.1 Collapse the two token systems (`--primary` vs `--color-*`) | Wide refactor of `components/ui/*` + config; no user-visible win until variants are consolidated. |
| §6.4 Remove v1 + v2 from the client bundle | Large deletion; the variants are a deliberate showcase — needs a decision on which ships. |
| §5.3 Mobile section navigation (bottom sheet/tabs) | New UI surface; needs a design pass and interacts with the switcher decision. |
| §5.4 / §8.3 Reduce or restructure contact channels | Content/IA decision (how many intake categories are wanted). |
| §8.4 Social-proof strip near the CV CTA | Needs agreed metrics/copy. |
| §6.2 Full SSR of the hero | Requires restructuring the `ssr:false` variant entry point; interacts with §6.4. |
## 5. Revision 2 — after adversarial plan review

A red-team review verified the plan against the code **and the compiled stylesheet**. It found real defects in both the audit and the plan. Deltas applied:

| ID | Amendment |
|---|---|
| A1 | **`tailwind.config.ts:77-80` maps `teal/violet/rose/lime` to literal hex of the *dark* values, not `var(--color-*)`.** Token edits alone would fix only the ~55 `text-signal` sites and leave ~37 failing (`text-teal` 1.78:1, `text-lime` 1.77:1, `text-rose` 2.22:1, `text-violet` 2.35:1). **All hue tokens must be repointed to CSS vars first**, then given explicit per-theme values. |
| A2 | Text-safe values confirmed by independent recomputation: light signal `#b6430a` 5.29:1, signal-2 `#c2410c` 4.95:1, teal `#0f766e` 5.23:1, lime `#15803d` 4.79:1, rose `#be123c` 6.0:1, violet `#7c3aed` 5.45:1 (already passing — leave it). Bright `*-solid` fills keep `text-ink` ≥4.5:1. |
| A3 | `--color-signal-2` also needs a text-safe value (used as text at `ContactV2.tsx:120,237`, `RailV2.tsx:142` → 2.68:1 today). |
| A4 | **Drop B4.5** — the honeypot already passes axe; adding `role="presentation"` alongside `tabIndex`/`aria-hidden` creates a `presentation-role-conflict`. |
| A5 | **Drop the `useSearchParams` `?dev=1` design** (Next 14 build error without a Suspense boundary). Gate on `process.env.NODE_ENV !== "production"` at render; if a URL escape hatch is wanted, read `window.location.search` inside an effect only. Also: the palette has **no v2 entry**, and neither `/skills` nor `/projects/[slug]` mount the palette. |
| A6 | **B6.8 must not renumber `ContactV2`/`AssistantV2` in place** — both are shared with v2 via `PortfolioV2.tsx`, so literal `05` edits break v2's sequence. Use an `index` prop instead. |
| A7 | **Counts corrected: 7 projects, 3 papers → 4 rendered systems.** Keys become `1`–`4`; palette hint `CommandPaletteV2.tsx:305` ("`1`–`5` systems") must change; derive paper slugs from the slug set, not `papers[].projectId` (dangling). |
| A8 | `content-visibility` rule: **measure before removing**, then justify with a scroll-height delta rather than assertion. |
| A9 | Focus work must also cover `AssistantV2.tsx:221`; note `focus:outline-none` utilities beat a base-layer `:focus-visible`, so the utilities themselves need changing; decide explicitly about `components/ui/*` (they pair `outline-none` with a ring). |
| A10 | Dialogs: trap **Tab only**. Never intercept Escape (`shell-context.tsx:99-104` owns it). Palette + PDF reader are modal; the assistant drawer is deliberately non-modal. |
| A11 | `HeroV2_1.tsx:23` `useState(true)` → `false` to avoid the "SFX: ON → MUTED" first-paint flip. |
| A12 | **Drop the `next lint` half of B6.10** — this package has no eslint dependency or config; keep `tsc --noEmit` as the gate. |
| A13 | **New item B5.9:** restructure `HeroV2_1.tsx:409,419-428,462-471` (audit §4.1 CRITICAL — nested interactive content, keyboard-unreachable Repo). It was missing from the batch list. Also add explicit deferral rows for every unbatched audit item (§2.6, §3.3, §3.4, §3.7, §4.9, §5.5, §6.7, §6.8, §7.1, §7.5, §8.2, §8.5, §9.2, §9.6) and decide the ~20 hardcoded hex accents (`HeroV2_1.tsx` `#38bdf8/#a78bfa/#2dd4bf`, data-layer `accent` values) that no token change can reach. |
| A14 | **Verification replaced.** `page.tsx` mounts every variant with `ssr:false`, so `/` HTML contains no section markup and curl assertions would be vacuous. New protocol: compiled-CSS greps + `chrome --headless=new --dump-dom` (hydrated DOM) + `--screenshot` in both themes + axe-style attribute assertions on `/skills` (which *is* SSR'd). |
| A15 | Hygiene adds: dead `.timeline-line`, unused `Tag` import in `SystemsV2_1.tsx:7`, unmounted `ResearchV2_1.tsx`/`ApproachV2_1.tsx`. `styles/globals.css` deletion confirmed safe (`.text-balance` is emitted by Tailwind itself). `pnpm-lock.yaml` deletion is **deploy-affecting**, not pure hygiene — flagged, not bundled silently. |

**Revised verification protocol**
1. `node scripts/contrast-check.mjs` — also asserts every hue in `tailwind.config.ts` is `var(...)`-backed (guards the exact A1 defect).
2. `npx tsc --noEmit` detached → log.
3. `npm run build` detached → log; failure blocks.
4. `npm run start` on `localhost:3000` → `chrome --headless=new --dump-dom` for `/`, `/skills`, `/projects/lexical-graph-hybrid-rag`; assert HTTP 200, assert `h1[aria-label]`, assert no `VERSION:` in the production DOM.
5. `--screenshot` of the hero in light and dark, inspected visually.
6. Grep the compiled CSS to prove the new token values actually reached the bundle.