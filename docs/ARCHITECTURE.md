# CodeRush Architecture

CodeRush is a client-side single-page application built with React 18, TypeScript, and Vite. It runs as a local-first static web application hosted on GitHub Pages under the `/CodeRush/` base path.

## Design Philosophy

- **Local-first and private**: All learner progress, preferences, settings, and session metrics remain on the learner's device in browser `localStorage`. No accounts, analytics, cookies, or remote server dependencies exist.
- **Pure simulation**: Every command line interface (Linux Bash, Windows PowerShell, Windows Command Prompt, Cisco IOS) is a safe simulation running entirely within client-side JavaScript. Learner input is never executed in an actual shell, and no network API requests are made.
- **Typed curriculum**: All educational content (programming lessons, commands, scenarios, learning paths, quizzes, missions) is defined as strictly typed data structures in `src/content/` and validated by automated tests (`src/content/content.test.ts`).
- **Responsive and accessible**: Layouts adapt fluidly from mobile (320px) to large desktop (1920px). Focus management, ARIA landmarks, live regions, contrast ratios, and keyboard shortcuts ensure accessibility.

## System Components

```
CodeRush Client Application
├── Application Shell (src/App.tsx, src/app/)
│   ├── Navigation, Route Fallbacks, Error Boundary
│   ├── UI Context & Settings (Theme, Font Size, Caret Style)
│   └── Search Panel with Synonym Matching
│
├── Pages (src/pages/)
│   ├── Home, Today (Daily Plan), Journeys, Learn (Paths & Modules)
│   ├── Practice (Typing Runner), Recall Mode, Languages
│   ├── CommandLab (Terminal, Exercises, Scenarios), Missions
│   ├── Tools (Subnetting Calculator, Network Topology Explorer)
│   └── Progress (Mastery, History, Command Reviews, Import/Export)
│
├── Content Layer (src/content/)
│   ├── code/        45 programming lessons across 9 languages
│   ├── commands/    262 CLI exercises with syntax, safety, and sample output
│   ├── paths/       10 structured learning paths containing 120 modules
│   ├── scenarios/   32 troubleshooting scenarios with multiple steps
│   └── missions.ts  5 synthetic incident investigation missions
│
├── Core Engines & Pure Logic (src/lib/)
│   ├── typing/      Deterministic typing engine, WPM calculation, timers
│   ├── terminal/    Safe matcher, tokenizer, in-memory virtual filesystem
│   ├── mastery.ts   Multi-factor mastery algorithm (Typing 30%, Recall 40%, Days 30%)
│   ├── review.ts    Spaced review scheduler, command review history, today's plan
│   ├── missions.ts  Evidence-led mission scoring and verification
│   ├── journeys.ts  Career route mapping and milestone tracking
│   ├── onboarding.ts Skippable learning preferences
│   └── storage/     Schema, multi-version migration (v1, v2, v3), and export/import
│
└── Design System (src/components/ui/, src/styles/)
    ├── Semantic UI components: Button, Tag, Dialog, ProgressBar, Stat
    ├── Typing components: PracticeRunner, TypingSurface, VirtualKeyboard
    └── Theme variables: dark and light mode palette with strict contrast
```

## Storage Architecture and Portability

1. **Active Storage (`coderush:data:v3`)**:
   - Version 3 schema stores sessions, command mastery details, quiz scores, scenario results, daily challenge completions, incident missions, command confusions, favorites, and subnetting practice.
   - Storage state is managed via an in-memory cached reactive store using React's `useSyncExternalStore`.
2. **Backward Compatibility & Migrations**:
   - `loadFromStrings()` automatically checks for legacy keys: `coderush_user_stats` (v1) and `coderush:data:v2` (v2).
   - Migrates older data into the v3 structure without deleting or altering legacy keys, keeping user data safe.
3. **Data Import & Export**:
   - Full JSON export allows backing up or transferring progress between devices.
   - Import parser inspects and validates incoming files, identifies duplicate IDs, calculates projected metrics, and offers both `merge` (preserving personal bests) and `replace` modes with an interactive preview.
