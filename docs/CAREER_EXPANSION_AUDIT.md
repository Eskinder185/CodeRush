# CodeRush: Career-Ready Technical Learning Expansion Audit

## 1. Executive Summary & Baseline Counts
This audit benchmarks the current CodeRush curriculum against the technical requirements of the **Career-Ready Technical Learning Expansion (Phases 1–17)**.

### Baseline Content Counts (Verified `content.test.ts` & `src/content`)
- **Programming Languages**: 9 language tracks, 45 total lessons (5 lessons per language: Python, JavaScript, Java, C++, HTML/CSS, SQL, Bash, TypeScript, Go).
- **Command Exercises**: 262 distinct commands across 4 platforms:
  - Linux: 104 commands
  - PowerShell: 95 commands
  - Windows CMD: 28 commands
  - Cisco IOS: 35 commands
  - *Categories*: Version control (12), AI models (8), Networking (48), Security (35), Processes (24), Files (28), etc.
- **Learning Paths**: 10 paths, 120 modules, 224 quiz questions.
- **Scenarios & Missions**: 32 guided CLI scenarios + 5 synthetic incident investigation missions.
- **Practice Modes**: Speed test, Timed challenge, Accuracy training, Command practice, Syntax training, Custom practice, Recall from memory, and AI Practice Studio (BYOAI).

---

## 2. Curriculum Coverage Matrix

| Professional Skill Area | Current Status | Current Assets | Gap / Required Expansion |
| :--- | :--- | :--- | :--- |
| **Java Fundamentals & Modern Java** | Introduced (5 lessons) | `java-basics-1` to `java-advanced-1` (Syntax, arrays, classes, try/catch, inheritance) | **Missing**: Generics, Collections (`List`, `Set`, `Map`), Lambdas, Streams, `Optional`, Records, Immutability. |
| **Production Java & Tooling** | Missing (0 lessons) | None | **Missing**: Maven/Gradle build lifecycle, project structure, dependencies, packaging. |
| **Java Testing & Spring Boot** | Missing (0 lessons) | None | **Missing**: JUnit 5, Mockito, Spring Boot REST controllers, `@Service`, `@Repository`, Spring Data JPA, PostgreSQL, Dockerization, Task API Capstone. |
| **Python Automation & Systems** | Introduced (5 lessons) | `python-basics-1` to `python-advanced-1` (Variables, lists, dicts, math/datetime, OOP) | **Missing**: `pathlib`, JSON/CSV processing, `argparse` CLI tool, `requests` API client with retry/timeout, `pytest` & fixtures, synthetic log parsing & health monitor Capstone. |
| **Linux Troubleshooting & Shell** | Broad (104 commands) | Files, processes, permissions, logs (`grep`, `tail`, `journalctl`, `systemctl`) | **Missing**: Systematic troubleshooting workflows for service failure, 100% disk filling, database connection timeout, DNS failure, realistic log analysis steps. |
| **Git & GitHub Workflows** | Introduced (12 commands) | Status, diff, add, commit, branch, log, push, pull, PR create | **Missing**: Merge conflicts, rebasing, `git stash`, `git restore`, `git reflog`, GitHub CLI PR checks, interactive repository simulation. |
| **CI/CD & GitHub Actions** | Introduced (1 module) | Basic intro module in `git-github` path | **Missing**: Complete CI/CD Engineering School track: YAML structure, steps/jobs, Maven & Pytest workflows, runner matrix, pipeline failure debugger, Jenkins concepts. |
| **Containers & Infrastructure** | Introduced in text only | Conceptual references in DevOps path | **Missing**: Dockerfile syntax drills, Docker Compose multi-service configs, SQL relational queries & migrations, Terraform syntax, Kubernetes manifests (`Pod`, `Deployment`, `Service`). |

---

## 3. Structural Design for Release A & B Expansion

1. **Artifact Types Extension (`src/content/types.ts`)**:
   - Add typed learning artifacts for career exercises: `'code' | 'shell-command' | 'yaml' | 'dockerfile' | 'sql' | 'config' | 'log' | 'quiz' | 'debugging' | 'project-step'`.
2. **Career Skills Lab (`/skills` or `/career-lab`)**:
   - Organized by 6 domains: Programming & Backend, OS & Terminal, Version Control, DevOps & CI/CD, Cloud & Infrastructure, Security & Reliability.
3. **Interactive 6 Practice Modes**:
   - Mode A (Guided Typing), Mode B (Recall), Mode C (Fill Missing Code), Mode D (Debug Broken Example), Mode E (Troubleshooting Simulation), Mode F (Project Workflow Capstone).
