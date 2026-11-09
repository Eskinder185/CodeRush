# CodeRush 1.x audit (baseline for 2.0)

Audited at commit `5fdcb5f`, which is the current `origin/main` and the deployed site.

## Baseline results

| Check | Result |
| --- | --- |
| `npm run build` (`tsc && vite build`) | **Failed.** `LanguagePractice.tsx(275)`: `Timeout` is not assignable to `number`. |
| `vite build` alone | Passed. One 453 kB JavaScript chunk. |
| `npm run lint` | **Failed to run.** `.eslintrc.cjs` extended `@typescript-eslint/recommended` instead of `plugin:@typescript-eslint/recommended`. |
| Tests | None existed. |

## Bugs found and fixed

| Area | Bug | Fix |
| --- | --- | --- |
| Progress | Per-language "total lessons" was the number of attempts, not lessons available. | The denominator now comes from the lesson library. |
| Progress | Any attempt that reached the end counted as a completed lesson, even with wrong characters. | Lessons pass only on an exact match. Migrated 1.x rows pass only when `mistakes` was 0. |
| Buttons | "Request a language" (Languages), "Contact support" and "Join community" (FAQ), and two About buttons had no action. | Replaced with working links to the repository issue tracker and real pages. |
| Claims | About and FAQ claimed Rust and "many more" languages, and "thousands of developers". | Removed. Counts are now computed from content. |
| Free practice | `PracticeMode` always typed the first lesson of a language and offered no options. | Replaced by Typing Practice with seven modes and settings. |
| Mistakes | `symbolsMissed` was always saved as an empty array. | The engine records per-character and per-category attempts and errors. |
| Mobile | The overlay textarea forwarded wheel events, had no composition handling, and offered no way to type symbols on phones. | IME composition is handled, symbol keys are added, and input is a focus-preserving hidden textarea. |
| Deployment | `public/404.html` carried another product's name ("AstraFocusNexus"), and a `?/` redirect script in `App.tsx` was dead code. | Removed. The build copies the app shell to `404.html`. |
| Routing | The router basename was hardcoded as `/CodeRush` separately from Vite's `base`. | Both derive from Vite's `base`. |
| Dead code | `CodeEditor`, `SimpleCodeEditor`, `SimpleCodeDisplay`, `MonacoErrorBoundary`, `LanguagePractice`, `ThemeSwitcher`, and `ParticleBackground` were unused. Monaco and react-syntax-highlighter were bundled but unused. | Removed with their dependencies. |

The spec also mentioned a second workflow, `static.yml`. It does not exist at this commit; only `deploy-pages.yml` was present. That workflow is replaced by the single test-and-deploy workflow.

## Note on repository history

The local `main` branch carries three unpushed commits that replace this app with an Angular, Spring Boot, and Python interview platform. CodeRush 2.0 was built on the branch `coderush-2.0` from `5fdcb5f`, so that work is untouched. Merging the two lines of history is a separate decision for the repository owner.
