# CodeRush 3 architecture

The app remains a static React/TypeScript site. `src/App.tsx` lazily loads route pages under Vite's `/CodeRush/` base. Content remains typed data in `src/content`; the new mission records are in `src/content/missions.ts`. Local algorithms live in `src/lib` and do not call remote APIs.

`src/lib/onboarding.ts` validates preferences in a separate versioned local key. `src/lib/journeys.ts` maps career stages to existing path IDs. `src/lib/review.ts` derives due items from recorded command mastery and last-practiced dates; it does not change the established mastery weights. `src/lib/missions.ts` scores evidence independently of order.

Progress uses `src/lib/storage/schema.ts`, `migrate.ts`, and `store.ts`. Version 3 adds mission results under `coderush:data:v3`. Loading falls back to version 2 and version 1 keys, validates every record, writes the migrated version, and leaves older keys intact. Exports include the version number; imports validate before displaying a preview. Existing session IDs are deduplicated on merge.

The Command Lab still matches curated commands and prints fixed sample output. Git/GitHub and AI-model exercises are authored under `src/content/commands` and collected into two paths under `src/content/paths/git-ai.ts`; they use the simulated Bash terminal and link to official CLI references. Linux file navigation uses a small in-memory virtual filesystem in `src/lib/terminal/simulator.ts`. Missions allow only listed commands and fixed synthetic evidence. Neither path sends learner input to an operating system or service. The topology component accepts a simulated incident mode and changes its highlighted connection and packet-path explanation.

Deployment is intended from remote React `main` through the single Pages workflow, after all checks pass. The other local `main` worktree is a separate, unpushed line of development.
