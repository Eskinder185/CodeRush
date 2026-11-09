# CodeRush

**Type faster. Learn deeper. Master your tools.**

CodeRush is a free, browser-based practice platform for people who work with code and command lines. It combines three things in one design system and one progress model:

- **Typing mastery**: type real code and commands with live WPM, accuracy, and mistake tracking.
- **Structured learning**: learning paths with concepts, guided lessons, quizzes, recall checks, and scenarios.
- **Practical technical skills**: a Command Lab for Linux, PowerShell, Windows networking, and Cisco IOS, with a safe simulated terminal.

Live site: <https://eskinder185.github.io/CodeRush/>

## What is included

These counts come from the content files and are enforced by `src/content/content.test.ts`.

| Content | Count |
| --- | --- |
| Programming typing lessons, preserved from 1.x | 45, in 9 languages |
| Command exercises | 242: Linux 119, PowerShell 89, Windows CMD 17, Cisco IOS 17 |
| Troubleshooting scenarios | 32: Linux 8, PowerShell 8, networking 6, Cisco 4, security 6 |
| Learning paths | 8, with 113 modules |
| Quiz questions | 210 |

Learning paths: Programming Syntax (9 modules), Linux Command Line (13), Windows PowerShell (27), Networking Fundamentals (24), Defensive Cybersecurity (19), Linux Networking (10), Linux Security (6), and Cisco IOS Essentials (5).

## Features

- **Typing practice**: Speed Test, Timed Challenge (15, 30, 60, or 120 s), Accuracy Training (wrong keys do not advance), Command Practice, Syntax Training, Custom Practice, and Recall Mode.
- **Typing engine**: net and raw WPM, accuracy that counts corrected mistakes, uncorrected and corrected errors, missing and excess characters, paste blocking, IME composition, Unicode, multiline text, forgiving or strict indentation, and an explicit Tab mechanism.
- **Focus Mode**, keyboard shortcuts, an on-screen keyboard guide, and on-screen symbol keys for phones.
- **Guided command lessons** in seven steps: Learn, Understand, Observe, Type, Recall, Apply, Review.
- **Command Lab**: platform tabs, search and filters, saved and recent commands, a free-exploration terminal, and scenario practice.
- **Interactive tools**: a subnetting trainer with generated exercises and step-by-step working, and a clickable network topology.
- **Smart mistake training**: rule-based drills built from the characters you miss, plus detection of commands you confuse.
- **Mastery** that is separate from speed. See [docs/MASTERY.md](docs/MASTERY.md).
- **Daily challenge** that is the same for everyone on a date, with personal best, history, and a gentle streak.
- **Progress dashboard** with charts drawn from recorded data, a key heatmap, achievements, history, and import and export.
- **Unified search** across commands, lessons, paths, modules, and scenarios, with synonyms.
- **Dark and light themes**, reduced-motion support, and adjustable typing settings.

## Safety

The Command Lab never executes anything. Input is compared with stored answers in `src/lib/terminal/match.ts`, and output is curated text from the content files. Sample output uses documentation-reserved addresses (RFC 5737, RFC 3849), and the content tests reject other public addresses. Security content is defensive and uses synthetic data. Commands that change state are labelled, and lessons say to practice them only on systems you are authorized to manage.

## Privacy

There are no accounts, analytics, or backend. Progress is stored in the browser's local storage and does not sync between devices. Export a file from the Progress page to back it up.

CodeRush 1.x progress (`coderush_user_stats`) is migrated automatically on first load. The old key is left in place as a backup.

## Development

Requirements: Node.js 20 or newer.

```bash
npm ci
npm run dev          # http://localhost:3000
npm run typecheck
npm run lint
npm test             # unit, content validation, and UI tests (Vitest)
npm run build        # production build to dist/, with 404.html for deep links
npm run test:e2e     # Playwright against the build served at /CodeRush/
npm run ci           # everything above, in order
```

Playwright needs Chromium once: `npx playwright install chromium`.

### Project layout

```
src/
  app/          shell: navigation, dialogs, search, settings, footer
  pages/        one lazily loaded file per route
  components/   ui primitives, typing, terminal, charts, graphics, learning
  content/      all curriculum data, separate from UI, validated by content.test.ts
    code/       the 45 programming lessons, one file per language
    commands/   command exercises by platform
    scenarios/  troubleshooting scenarios
    paths/      learning paths, modules, and quizzes
  lib/          logic with no React: typing engine, storage, mastery, search,
                recommendations, subnetting, daily challenge, terminal matching
  styles/       design tokens (CSS variables for dark and light themes)
e2e/            Playwright tests
docs/           mastery model, content guide, audit notes, backlog
```

See [docs/CONTENT.md](docs/CONTENT.md) for how to add commands, scenarios, and modules.

## Deployment

One workflow, `.github/workflows/deploy-pages.yml`, runs type checking, linting, unit tests, the build, and browser tests on every push and pull request. On `main` it uploads `dist/` and deploys with the GitHub Pages Actions. In the repository settings, Pages must use **GitHub Actions** as its source.

The site is served from `/CodeRush/`. Vite's `base` and the router's `basename` both come from that one setting in `vite.config.ts`. The build copies `index.html` to `404.html`, so deep links such as `/CodeRush/lab/command/linux.pwd` load the app.

## Contributing

Bug reports and content corrections are welcome: <https://github.com/Eskinder185/CodeRush/issues>. Each command lists its documentation source. Command syntax was written against those references by the content author and has not been independently reviewed.
