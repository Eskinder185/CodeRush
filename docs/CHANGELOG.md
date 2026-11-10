# Changelog

All notable changes to the CodeRush project.

## CodeRush Latest

### Bring Your Own AI (BYOAI) & AI Practice Studio
- **Bring Your Own AI Engine**: Native adapters for local Ollama (`http://localhost:11434`), LM Studio (`http://localhost:1234/v1`), custom OpenAI-compatible inference servers, and user-owned HTTPS gateways.
- **AI Practice Studio (`/practice/ai`)**: Dedicated studio with prompt composer supporting any programming language (Rust, Go, Zig, Elixir, Python, TypeScript, C++, SQL, Bash, etc.).
- **Six Generation Modes**: Code Typing, Guided Lessons, Multiple-Choice Quizzes, Debugging Challenges, Code Completion, and Syntax Drills.
- **Runtime Schema Validation**: Zod-powered schema validation and line-ending normalization ensuring well-formed and safe generated content.
- **Existing Engine Reuse**: Directly reuses CodeRush's `PracticeRunner` for typing exercises (preserving WPM, accuracy, Focus Mode, and mistake metrics).
- **Conversational Revisions**: Interactive modification of generated exercises ("make simpler", "add comments", "harder variation").
- **Contextual AI Tutor**: Dedicated drawer for answering questions scoped strictly to the active exercise.
- **My AI Practices Library**: Local storage library with search, filtering, duplication, deletion, and secret-free JSON export/import.
- **Performance Recommendations**: Context-aware recommendations suggesting syntax drills or next curriculum topics based on session performance.
- **Local Network Access Guidance**: Clear CORS configuration documentation and diagnostics for Ollama (`OLLAMA_ORIGINS`) and LM Studio.

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
