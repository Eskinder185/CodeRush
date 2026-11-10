# CodeRush Features

CodeRush combines keyboard muscle memory training with comprehensive computer science, networking, and command-line systems education.

## Core Capabilities

### 1. Typing Mastery
- **Seven practice modes**: Speed Test, Timed Challenge (15, 30, 60, 120s), Accuracy Training (error blocks advance), Command Practice, Syntax Training, Custom Practice, and Recall Mode.
- **Deterministic typing engine**: Live calculation of net WPM, raw WPM, accuracy %, uncorrected mistakes, corrected errors, missing characters, and excess characters.
- **Technical input support**:
  - Full multiline code support with indentation handling.
  - Smart Tab key handling: indentation completion when expected, normal focus navigation otherwise.
  - Anti-paste enforcement to ensure genuine muscle-memory acquisition.
  - Native IME composition support for international keyboard inputs.
  - Mobile symbol bar and on-screen keyboard guide.
  - Focus Mode for distraction-free typing.

### 2. Comprehensive Curriculum
- **45 Programming Lessons** across nine languages:
  - Python, JavaScript, TypeScript, HTML/CSS, C++, Go, Java, Bash, and SQL.
  - Beginner, intermediate, and advanced syntax patterns.
  - Passes awarded only on exact character match.
- **262 Command Exercises**:
  - Linux and cross-platform CLI tools (139 commands)
  - Windows PowerShell (89 cmdlets)
  - Windows Command Prompt (17 commands)
  - Cisco IOS (17 configuration and show commands)
  - Sourced CLI exercises for Git, GitHub CLI (`gh`), Ollama local LLMs, and Hugging Face CLI (`hf`).
- **10 Learning Paths & 120 Modules**:
  - Programming Syntax, Linux Command Line, Windows PowerShell, Networking Fundamentals, Defensive Cybersecurity, Linux Networking, Linux Security, Cisco IOS Essentials, Git and GitHub, and AI Models and LLMs.
  - 224 quiz questions with verified explanations and references.
- **32 Troubleshooting Scenarios**:
  - Real-world multi-step diagnosis exercises with command matching and branching choices.
- **5 Investigation Missions**:
  - Evidence-led troubleshooting: *The internet is down* (DNS), *A slow Linux server* (disk/log overflow), *Suspicious Windows activity* (process/network correlation), *A workstation has no address* (DHCP lease failure), and *Devices on the wrong VLAN* (Cisco switch port assignment).
  - Inspect evidence in any order, choose diagnoses, apply resolutions, run verification, and record scores.

### 3. Career Journeys and Onboarding
- **Skippable 3-question onboarding**: Set a career goal, experience level, and daily study target (5, 10, 15, or 20 minutes) saved in local browser storage.
- **Five Career Journeys**:
  - Software Developer
  - Cybersecurity / SOC Analyst
  - Network Support Engineer
  - Cloud & DevOps Engineer
  - Linux System Administrator
- **Today Learning Plan**: Dynamically suggests due command reviews, detected typing weakness drills, and active journey modules based on actual saved performance.

### 4. Spaced Command Review & Mastery
- **Multi-factor Mastery Scoring (0–100)**:
  - Typing Accuracy: 30% (best accuracy on perfect runs)
  - Recall Memory: 40% (successful recalls from memory)
  - Repetition: 30% (successes across distinct days)
- **Automated Spaced Review Scheduling**:
  - Adapts review intervals (1, 3, 7, 14 days) based on mastery score and latest recall outcome.
- **Command Review History**:
  - Tracks what was reviewed, typing accuracy, recall success rates, when practiced, next review dates, and logged command confusions.

### 5. Interactive Simulation Tools
- **Stateful Virtual Linux Terminal**:
  - In-memory simulated filesystem with `cd`, `pwd`, `ls`, and `cat`.
  - Up/Down command history navigation.
  - Clear labeling that all terminal commands are simulated and never run on the host.
- **IPv4 Subnetting Practice**:
  - Interactive calculator and drill generator for subnet masks, network addresses, broadcast addresses, and host ranges with step-by-step working.
- **Network Topology Explorer**:
  - Interactive SVG diagram of a multi-VLAN branch office (Staff, Servers, Guest).
  - Normal, DNS failure, and Wrong-VLAN incident modes illustrating packet paths.

### 6. Bring Your Own AI (BYOAI) & AI Practice Studio
- **Local Model Adapters**:
  - Direct native integration with local Ollama (`http://localhost:11434`) and LM Studio (`http://localhost:1234/v1`).
  - Support for custom self-hosted OpenAI-compatible inference servers and private HTTPS gateways.
- **Dynamic Content Generation**:
  - Generate exercises in any programming language (Rust, Go, Zig, Elixir, Python, TypeScript, C++, SQL, Bash, etc.).
  - 6 exercise modes: Code Typing, Guided Lessons, Multiple-Choice Quizzes, Debugging Challenges, Code Completion, and Syntax Drills.
  - Strict runtime schema validation (Zod) enforcing size limits, line ending normalization, and structured output.
- **Conversational Revisions & Contextual AI Tutor**:
  - Edit code before typing or request conversational revisions ("make simpler", "add comments").
  - Contextual AI Tutor drawer for answering questions scoped strictly to the active exercise.
- **My AI Practices Library**:
  - Local library with search, language filters, duplication, renaming, and export/import (credentials strictly excluded).
- **Adaptive Performance Recommendations**:
  - Evaluates typing metrics and mistake patterns to suggest next steps (e.g. bracket drills or curriculum progressions).
- For complete architecture and CORS guides, see [docs/BYOAI.md](BYOAI.md).
