# CodeRush Backlog

## Completed Engineering Work

- [x] Fixed React "Maximum update depth exceeded" cycle in `TypingSurface.tsx` without weakening tests.
- [x] Implemented rich command review history with recall/typing metrics, next review schedule, and command confusion analysis.
- [x] Safely consolidated project into canonical folder `C:\Users\eskew\github\CodeRush` with full recovery backup of Angular/Spring/Python work in `C:\Users\eskew\github\CodeRush-angular-spring-backup`.
- [x] Expanded automated e2e browser test suite across Chromium, Firefox, and WebKit (117 total passing tests).
- [x] Unified product identity and consolidated documentation under CodeRush.

## Deferred Features (Out of Current Scope)

- **Cloud sync and user accounts**: CodeRush is intentionally designed as a zero-setup, local-first web application where user data never leaves the browser. Export and import cover data migration.
- **Server-side public leaderboards**: Requires remote authentication, server-side judging, anti-cheat validation, and user privacy compliance, which conflicts with client-only static hosting.
- **Real command execution / live container sandboxes**: Terminal exercises are deliberately simulated in client-side TypeScript so no real shell commands or API queries execute on the user's host.
- **Long configuration-file exercises**: Multiline scripts and loops are supported (15 multi-statement exercises), but extended multi-file editing is deferred.
- **Alternative keyboard hardware layouts for heatmap**: Current visual keyboard heatmap renders standard US QWERTY.

## Future Exploration Opportunities

- Additional investigation missions (e.g. TLS certificate expiration, Kubernetes pod restart loops).
- Cisco IOS configuration mode simulation beyond show and save commands.
- Sound effect custom packs (currently simple key click and error tones).
