# CodeRush 3 test results

Run on Windows from the isolated React branch.

| Check | Result |
| --- | --- |
| `npm ci` | Passed |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed |
| `npm test` | 137 passed after GitHub and AI curriculum additions; existing React update-depth warning remains in one typing UI test |
| `npm run build` | Passed; `dist/404.html` generated |
| `npm run test:e2e` | 39 passed, including weekly goal, VLAN mission, GitHub and AI paths, and topology incident flow |
| `npm run ci` | Passed in full: typecheck, lint, 137 unit/content/UI tests, build, and 39 Chromium tests |

The suite still logs a pre-existing React update-depth warning in the typing UI test. The test passes, and the browser typing flow passes.

Playwright runs Chromium against the production build at `/CodeRush/`. It covers deep links, asset loading, keyboard flows, nine viewport widths, screenshots, and axe accessibility checks. Firefox, WebKit, manual screen-reader checks, and Lighthouse were not run. The public site has not been updated by this branch.
