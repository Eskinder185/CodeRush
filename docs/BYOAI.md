# Bring Your Own AI (BYOAI) & AI Practice Studio

CodeRush includes a local-first **Bring Your Own AI (BYOAI)** engine and **AI Practice Studio** (`/practice/ai`).

With BYOAI, learners can connect an AI model they control and generate personalized programming exercises, technical typing challenges, interactive quizzes, debugging drills, and guided lessons in **any programming language**—from Rust and Go to Zig, Elixir, Python, TypeScript, C++, and SQL.

---

## 1. Architecture & Privacy Guarantees

- **100% Client-Side Requests**: All requests to your local or self-hosted model are initiated directly by your browser (`fetch`). CodeRush operates without any intermediary cloud servers, middleboxes, or proxy trackers.
- **Credential Isolation**: Non-sensitive settings (provider type, endpoint URL, selected model, generation parameters) are saved locally in browser storage. Authentication tokens or API keys for custom gateways are held strictly in transient browser session memory (`sessionStorage`) and are **never** included in export files or permanent local progress.
- **Opt-In**: Existing CodeRush features, tracks, and typing modes remain fully functional without connecting an AI model.

---

## 2. Supported AI Providers

### A. Ollama (Native Local Inference)

- **Default Endpoint**: `http://localhost:11434`
- **Supported Features**: Model discovery (`/api/tags`), JSON format mode, chat generation (`/api/chat`), temperature control, request cancellation (`AbortSignal`).
- **Recommended Models**:
  - `qwen2.5-coder:7b` or `qwen2.5-coder:14b` (Exceptional for code formatting and syntax)
  - `llama3.1:8b`
  - `deepseek-coder-v2:16b`
  - `mistral:7b`

#### CORS & Browser Setup for Ollama
Because CodeRush is accessed via browser (either hosted on GitHub Pages `https://eskinder185.github.io/CodeRush/` or `localhost`), Ollama must be configured to allow Cross-Origin Resource Sharing (CORS):

- **Windows (Command Prompt / PowerShell)**:
  ```powershell
  # Set system environment variable or run before starting Ollama:
  $env:OLLAMA_ORIGINS="*"
  ollama serve
  ```
  *(If Ollama runs as a background Windows tray service, open System Properties -> Environment Variables, add user variable `OLLAMA_ORIGINS` with value `*`, and restart the Ollama tray app).*
- **macOS / Linux**:
  ```bash
  OLLAMA_ORIGINS="*" ollama serve
  ```

---

### B. LM Studio (OpenAI-Compatible Local API)

- **Default Endpoint**: `http://localhost:1234/v1`
- **Supported Features**: Model discovery (`/v1/models`), chat completions (`/v1/chat/completions`), JSON response format with automatic fallback if the local model does not support native JSON mode.
- **Recommended Setup**:
  1. Open LM Studio and download any GGUF coding model (e.g., `Qwen2.5-Coder`, `Meta-Llama-3-8B-Instruct`).
  2. Navigate to the **Local Server** (double-arrow icon) tab.
  3. Toggle **Enable CORS** on.
  4. Start the server on port `1234`.

---

### C. Custom OpenAI-Compatible Endpoints

- Connect to self-hosted inference platforms such as **vLLM**, **LocalAI**, **text-generation-webui**, or **Oobabooga**.
- Supports custom endpoints (e.g. `http://localhost:8000/v1` or `https://internal-ai.corp/v1`) with optional Bearer token authentication.

---

### D. User-Operated Secure AI Gateway

- For learners who want to access remote or cloud models, CodeRush supports connecting through a user-owned HTTPS gateway (such as Cloudflare AI Gateway, an AWS Lambda/FastAPI proxy, or a local HTTPS reverse proxy).
- **Security Notice**: Never embed third-party API secret keys directly into client web apps. If using cloud models, route requests through a user-owned backend that handles authentication and rate limiting.

---

## 3. Practice Types in the Studio

| Practice Type | Description | Engine Integration |
|---|---|---|
| **Code Typing** | Real idiomatic snippets formatted cleanly for typing rhythm and muscle memory. | Native `PracticeRunner` (live WPM, accuracy, Focus Mode, keyboard shortcuts). |
| **Guided Lesson** | Conceptual overview, learning objectives, and code steps. | Explanatory UI paired with interactive code typing. |
| **Multiple-Choice Quiz** | Syntax questions, output prediction, and common edge cases. | `AIQuizRunner` with instant feedback and score summary. |
| **Debugging Challenge** | Realistically broken code with progressive hints. | `AIDebugRunner` with hint reveals, fix explanations, and solution practice. |
| **Code Completion** | Incomplete constructs where learners supply the missing logic. | Structured prompt with prefix, suffix, and expected completion. |
| **Syntax Drill** | Densely packed brackets, quotes, operators, and language idioms. | Weakness-targeted typing drill. |

---

## 4. Lesson Preview, Revisions & AI Tutor

- **Editable Target Code**: Before starting a practice session, learners can inspect the generated code in an editable preview and fine-tune lines or comments.
- **Conversational Revisions**: Ask the model to revise the active lesson on the fly (e.g. *"Make this shorter"*, *"Add inline comments"*, *"Make it more challenging"*).
- **Contextual AI Tutor Drawer**: Learners can open the AI Tutor drawer to ask questions about the current exercise (*"Explain how line 3 works"*, *"Why is this idiom preferred over a loop?"*, *"Give me a hint"*). The tutor context is strictly scoped to the active exercise.

---

## 5. My AI Practices Library

- **Local Storage**: Saved exercises are stored in the learner's browser library (`AppData.aiPractices`) up to 100 exercises.
- **Library Management**: Filter by language and difficulty, search by keyword, duplicate, rename, or delete exercises.
- **Export & Import**: Export any saved exercise as clean JSON (credentials and endpoints are strictly excluded). Import shared JSON exercises from peers or other devices.

---

## 6. Performance Recommendations

When a learner finishes an AI practice session, the system evaluates their typing performance:
- If accuracy on bracket/brace/parenthesis symbols is low, CodeRush recommends a targeted nesting drill in that language.
- Suggests natural curriculum progressions (e.g., following *Rust Ownership* with *Borrowing & References*).
- Fallback deterministic recommendations ensure suggestions work even when disconnected.

---

## 7. Security & Content Disclaimer

> [!IMPORTANT]
> **Educational Content Notice**: All exercises in the AI Practice Studio are generated dynamically by your connected model. While CodeRush enforces strict runtime schema validation, length caps, and sanitization, AI models can occasionally produce non-idiomatic or imperfect code.
>
> **Code Sandbox Safety**: CodeRush **never** executes generated programming code or shell commands on your operating system. All typing and quiz interactions remain client-side simulations.
