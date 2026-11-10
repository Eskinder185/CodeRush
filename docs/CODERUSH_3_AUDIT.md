# CodeRush 3 implementation audit

Audited from React commit `371da40` on `coderush-2.0`, in an isolated local clone. The other `main` worktree was not changed.

## Baseline

The application uses React 18, TypeScript, Vite 5, Tailwind, React Router, Framer Motion, and browser localStorage. Routes are lazy loaded; curriculum is typed data in `src/content`; pure logic lives in `src/lib`; UI primitives and CSS tokens already existed. One Pages workflow (`deploy-pages.yml`) was present on `coderush-2.0`, but the current remote React `main` also contains `static.yml`, so a merge into `main` must remove it.

`npm ci`, TypeScript, ESLint, 122 unit/content/UI tests, and the production build passed. The original browser test run timed out because port 4173 was occupied by an unrelated project. A dedicated preview port resolved this. The baseline UI suite emitted a React maximum update-depth warning during one typing lesson test despite passing; this remains to investigate.

## Verified defects and fixes

| Finding | Evidence | Change |
| --- | --- | --- |
| Browser suite could not start | Preview port 4173 was occupied | Use dedicated port 4187 |
| Homepage overflowed at 320px after onboarding | Playwright responsive check | Wrap onboarding actions |
| Mission choices overflowed on narrow screens | Playwright checks at 320–390px | Allow choice text to wrap |
| A high module score could confer mastery with a 50% quiz | `moduleMastery` gate used score alone | Require 80% quiz for mastery; preserve completion |

## Existing strengths

The baseline has 45 programming lessons, 242 command exercises, 32 scenarios, eight paths with 113 modules, seven typing modes, a deterministic typing engine, real content validation, local export/import, contrast-minded design tokens, reduced-motion support, route splitting, and a safe command matcher. No curriculum was removed.

## Accessibility, responsive, and performance

Automated axe checks on key routes found no serious or critical violations. Browser tests cover widths 320, 360, 375, 390, 430, 768, 1024, 1440, and 1920px without page overflow after fixes. Screenshots were captured for home, Lab, a learning path, and Progress at phone, tablet, and desktop sizes; the phone home image was visually inspected. Manual screen-reader testing and Firefox/WebKit testing were not performed.

The production build succeeds with `/CodeRush/` as the base and a `404.html` SPA fallback. Route, asset, and deep-link tests pass locally. Lighthouse, LCP, INP, and CLS were not measured; no performance target is claimed. The command content chunk remains about 288 kB before gzip and deserves later loading analysis.

## Technical debt and selected improvements

The old scenario engine is sequential, and independent technical review of all commands is outstanding. CodeRush 3 adds five flexible evidence-led missions, local goal selection, due reviews, career routes, a stateful virtual directory, a stronger mastery gate, a versioned storage migration, and import preview. Remaining work is tracked in `BACKLOG.md`.
