# Backlog

## CodeRush 3 remaining work

- Full independent syntax and output review of all 242 command exercises against current official documentation.
- Extend mission coverage to VLAN connectivity and DHCP diagnosis; add mission-specific topology changes and richer packet-flow explanations.
- Add a user-editable weekly goal and deeper review history. Current daily minutes are saved through onboarding.
- Add an accessible import comparison for command, quiz, scenario, and mission records; the current preview reports session counts and duplicates.
- Investigate the pre-existing React maximum update-depth warning in a typing UI test.
- Measure Lighthouse and Web Vitals on a deployed production build. Add Firefox, WebKit, and manual screen-reader testing.
- Decide how the remote React `main` branch and the separate unpushed local `main` project should coexist before synchronizing that worktree.

Items from the CodeRush 2.0 specification that are deferred or only partly delivered, listed honestly.

## Deferred

- **Independent technical review of command content.** All 242 commands are marked `author-checked`: written against the linked documentation but not reviewed by a second person or run on real systems. Outputs are curated illustrations.
- **Cloud sync and accounts.** Out of scope for a static site. Export and import cover moving data for now.
- **Leaderboards.** Deferred as the spec suggests. They need comparable scoring, anti-cheat, and privacy controls.
- **Lighthouse measurement.** Not run in this pass. Bundle splitting is in place (the shell is about 16 kB gzipped), but no performance score is claimed.
- **Firefox and WebKit browser tests.** Playwright runs Chromium only. Manual checks on Safari and Firefox, especially iOS keyboard behavior, are still needed.
- **Screen-reader testing with real assistive technology.** Automated axe checks pass on 10 key pages, and the typing surface announces each line. No manual NVDA, JAWS, or VoiceOver session was done.

## Partly delivered

- **Multiline command practice.** Scripts and loops exist (15 multi-statement entries), but there are no long configuration-file exercises yet.
- **Cisco IOS configuration mode.** Only show commands and saving are covered. Interface and VLAN configuration exercises would need a simulated configuration state.
- **Spec module lists.** PowerShell (27), Networking (24), Linux Networking (10), and Cybersecurity (19) match the spec's module lists. Some modules are concept and quiz only, without command exercises, because the topic has no natural command, for example OSI, NAT, or the CIA triad.
- **Typing heatmap layout.** It uses a US keyboard layout only.
- **Sound.** One simple key click and error tone. There are no sound packs.
