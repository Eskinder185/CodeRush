# Changelog

All notable changes to the CodeRush project.

## CodeRush Latest

### Consolidated Features & Fixes
- **Unified Product & Branding**: Consolidated active codebase into single canonical repository at `C:\Users\eskew\github\CodeRush` with CodeRush branding throughout.
- **Fixed React Update Depth Warning**: Traced and eliminated React's "Maximum update depth exceeded" re-render loop in `TypingSurface.tsx` by synchronizing input directly with the typing engine.
- **Command Review History**: Added a dedicated review history dashboard and per-command review details tracking recall rates, typing best accuracy, next spaced review dates, and logged command confusions.
- **Multi-Browser Verification**: Installed and verified Playwright across Chromium, desktop Firefox, and desktop WebKit (117 total passing tests).
- **Incident Investigation Missions**: Delivered five evidence-led troubleshooting missions (DNS failure, full Linux filesystem, suspicious Windows scheduled task, DHCP lease timeout, and Cisco VLAN port misconfiguration).
- **Git & GitHub Curriculum**: Added 12 command exercises covering repository inspection, branching, staging, committing, and pull requests via GitHub CLI.
- **AI Models & LLM Curriculum**: Added 8 command exercises covering local model discovery, model cards, Ollama local inference, and Hugging Face CLI downloads.
- **Stateful Virtual Terminal**: Implemented in-memory Linux virtual filesystem supporting `cd`, `pwd`, `ls`, and `cat`.
- **Today Learning Plan**: Dynamically suggests due command reviews, detected typing weakness drills, and active journey modules based on actual saved performance.
- **Weekly Practice Goal**: Added customizable weekly practice-time target on the Progress dashboard.
- **Multi-Version Data Migration & Import Preview**: Safe migration path supporting CodeRush v1, v2, and v3 schemas with detailed pre-import impact comparison.
- **Network Topology Incidents**: Added DNS failure and VLAN incident modes illustrating packet paths and device roles.
