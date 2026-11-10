# CodeRush 3 test results

Run on Windows from the isolated React branch.

| Check | Result |
| --- | --- |
| `npm ci` | Passed |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed |
| `npm test` | 134 passed after mission/storage additions; existing React update-depth warning remains in one typing UI test |
| `npm run build` | Passed; `dist/404.html` generated |
| `npm run test:e2e` | 35 passed after the narrow-screen mission layout fix |
| `npm run ci` | Passed in full: typecheck, lint, 134 unit/content/UI tests, build, and 35 Chromium tests |

Playwright runs Chromium against the production build at `/CodeRush/`. It covers deep links, asset loading, keyboard flows, nine viewport widths, screenshots, and axe accessibility checks. Firefox, WebKit, manual screen-reader checks, and Lighthouse were not run. The public site has not been updated by this branch.
