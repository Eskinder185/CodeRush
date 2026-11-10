import type { Difficulty } from '../content/types'

export type CareerDomainId =
  | 'backend'
  | 'systems'
  | 'vcs'
  | 'devops'
  | 'cloud'
  | 'security'

export type PracticeModeKind =
  | 'type' // Mode A: Guided Typing
  | 'recall' // Mode B: Recall from Memory
  | 'fill' // Mode C: Fill in Missing Code
  | 'debug' // Mode D: Debug the Broken Example
  | 'troubleshoot' // Mode E: Troubleshooting Simulation
  | 'capstone' // Mode F: Project Workflow Capstone

export interface CareerSkillExercise {
  id: string
  title: string
  domain: CareerDomainId
  mode: PracticeModeKind
  difficulty: Difficulty
  targetRole: string
  summary: string
  instructions: string
  codeSnippet: string
  solution: string
  hints?: string[]
  explanation: string
  verificationPattern?: RegExp | string
}

export interface CareerTrack {
  id: CareerDomainId
  title: string
  tagline: string
  roles: string[]
  description: string
  accent: 'sky' | 'emerald' | 'violet' | 'amber' | 'rose' | 'cyan'
  exercises: CareerSkillExercise[]
}

export const CAREER_TRACKS: CareerTrack[] = [
  {
    id: 'backend',
    title: 'Programming & Backend Engineering',
    tagline: 'Java, Spring Boot, Python, SQL, REST APIs, and automated testing.',
    roles: ['Backend Software Engineer', 'Java Developer', 'API Platform Engineer'],
    accent: 'sky',
    description: 'Master real production architecture: type-safe Java records, Spring Boot REST controllers, JPA data access, Python data processing, and JUnit/Pytest automated validation.',
    exercises: [
      {
        id: 'java-fill-controller',
        title: 'Spring Boot REST Controller Mapping',
        domain: 'backend',
        mode: 'fill',
        difficulty: 'intermediate',
        targetRole: 'Backend Engineer',
        summary: 'Annotate a controller endpoint to handle incoming GET requests and return HTTP 200.',
        instructions: 'Fill in the missing Spring Boot annotation for a GET request handler.',
        codeSnippet: `@RestController\n@RequestMapping("/api/tasks")\npublic class TaskController {\n    ___(value = "/{id}")\n    public ResponseEntity<Task> getTask(@PathVariable Long id) {\n        return ResponseEntity.ok(new Task(id, "Audit Code"));\n    }\n}`,
        solution: '@GetMapping',
        hints: ['Spring Web provides shortcut annotations for HTTP methods such as @GetMapping, @PostMapping, etc.'],
        explanation: '@GetMapping maps HTTP GET requests onto specific handler methods in Spring controllers.',
        verificationPattern: /^@GetMapping$/i,
      },
      {
        id: 'java-debug-nullpointer',
        title: 'Defensive Null Handling with Optional',
        domain: 'backend',
        mode: 'debug',
        difficulty: 'intermediate',
        targetRole: 'Java Backend Developer',
        summary: 'Fix a dangerous NullPointerException by returning an Optional wrapper.',
        instructions: 'Replace the bare null return with a safe empty Optional wrapper.',
        codeSnippet: `public Optional<String> findUserEmail(Long id) {\n    User user = database.find(id);\n    if (user == null) {\n        return null; // BUG: causes NullPointerException in caller\n    }\n    return Optional.of(user.getEmail());\n}`,
        solution: 'return Optional.empty();',
        hints: ['Never return null for an Optional return type; use Optional.empty().'],
        explanation: 'Returning null when the contract promises Optional defeats the entire purpose of null-safety.',
        verificationPattern: /return\s+Optional\.empty\(\);?/,
      },
      {
        id: 'sql-fill-inner-join',
        title: 'Relational SQL Join Query',
        domain: 'backend',
        mode: 'fill',
        difficulty: 'beginner',
        targetRole: 'Database Developer',
        summary: 'Link users and orders using standard relational JOIN syntax.',
        instructions: 'Complete the SQL clause to join the orders table on customer ID.',
        codeSnippet: `SELECT u.email, o.total_amount\nFROM users u\n___ orders o ON u.id = o.user_id\nWHERE o.status = 'PAID';`,
        solution: 'INNER JOIN',
        hints: ['An inner join returns only rows where a match exists in both joined tables.'],
        explanation: 'INNER JOIN correlates matching records between users and orders.',
        verificationPattern: /^INNER\s+JOIN$/i,
      },
    ],
  },
  {
    id: 'systems',
    title: 'Operating Systems & Terminal Mastery',
    tagline: 'Linux, Bash, SSH, PowerShell, and systems troubleshooting.',
    roles: ['Linux Systems Administrator', 'IT Support Specialist', 'Site Reliability Engineer'],
    accent: 'emerald',
    description: 'Diagnose crashed system daemons, track down storage exhaustion in /var/log, inspect listening TCP ports with ss, and automate administration scripts.',
    exercises: [
      {
        id: 'linux-troubleshoot-port',
        title: 'Diagnose Address In Use Conflict',
        domain: 'systems',
        mode: 'troubleshoot',
        difficulty: 'intermediate',
        targetRole: 'Systems Administrator',
        summary: 'Identify which process is already occupying TCP port 8080.',
        instructions: 'Type the command to inspect listening TCP sockets with process names and numerical ports.',
        codeSnippet: `# Service failed: "java.net.BindException: Address already in use: 8080"\n# Diagnose listening sockets:`,
        solution: 'ss -tlpn',
        hints: ['The ss tool replaces netstat. Use -t (tcp), -l (listen), -p (process), -n (numeric).'],
        explanation: 'ss -tlpn reveals the process ID and program name currently bound to listening TCP ports.',
        verificationPattern: /^ss\s+-tlpn$/i,
      },
      {
        id: 'bash-debug-quoting',
        title: 'Bash Whitespace Quoting Bug',
        domain: 'systems',
        mode: 'debug',
        difficulty: 'intermediate',
        targetRole: 'Linux Automation Engineer',
        summary: 'Prevent word splitting on file paths containing spaces.',
        instructions: 'Fix the unquoted variable so file names with spaces do not break.',
        codeSnippet: `for file in *.txt; do\n    # BUG: fails on "Quarterly Report.txt"\n    process_file $file\ndone`,
        solution: 'process_file "$file"',
        hints: ['Double-quote variable expansions in Bash to preserve filenames as a single argument.'],
        explanation: 'Unquoted $file undergoes word-splitting, breaking arguments with spaces into multiple tokens.',
        verificationPattern: /process_file\s+"\$file"/,
      },
    ],
  },
  {
    id: 'vcs',
    title: 'Version Control & Collaboration',
    tagline: 'Git, GitHub, branches, code reviews, and recovery workflows.',
    roles: ['Software Engineer', 'Technical Lead', 'Open Source Maintainer'],
    accent: 'violet',
    description: 'Navigate complex real-world branch topologies, safely shelve work with git stash, resolve merge conflicts, undo public mistakes with git revert, and automate reviews with gh CLI.',
    exercises: [
      {
        id: 'git-recall-unstage',
        title: 'Unstage Without Overwriting Disk Changes',
        domain: 'vcs',
        mode: 'recall',
        difficulty: 'intermediate',
        targetRole: 'Software Developer',
        summary: 'Remove an accidentally staged configuration file from the index.',
        instructions: 'Type the command to unstage secrets.env without losing local disk changes.',
        codeSnippet: `# Accidentally ran: git add secrets.env\n# Unstage without modifying file on disk:`,
        solution: 'git restore --staged secrets.env',
        hints: ['Modern Git uses "git restore --staged <file>" to reset the staging area.'],
        explanation: 'git restore --staged restores the index from HEAD while leaving disk edits intact.',
        verificationPattern: /^git\s+restore\s+--staged\s+secrets\.env$/i,
      },
      {
        id: 'git-debug-revert',
        title: 'Safe Public Rollback',
        domain: 'vcs',
        mode: 'debug',
        difficulty: 'intermediate',
        targetRole: 'DevOps / Release Lead',
        summary: 'Undo a bad pushed commit without destructive history rewriting.',
        instructions: 'Provide the safe command to invert HEAD on a shared public branch.',
        codeSnippet: `# Danger: git reset --hard destroys shared public history\n# Provide safe commit inversion:`,
        solution: 'git revert --no-edit HEAD',
        hints: ['git revert creates a new commit that applies the exact inverse changes.'],
        explanation: 'git revert is collaborative and non-destructive for shared remotes.',
        verificationPattern: /^git\s+revert\s+(--no-edit\s+HEAD|HEAD\s+--no-edit)$/i,
      },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & CI/CD Engineering',
    tagline: 'GitHub Actions, YAML workflows, Docker, Compose, and automated pipelines.',
    roles: ['DevOps Engineer', 'Release Engineer', 'Platform Architect'],
    accent: 'cyan',
    description: 'Author battle-tested CI/CD workflows, manage multi-stage Docker builds, orchestrate dependent services with Docker Compose, and debug failing pipelines.',
    exercises: [
      {
        id: 'actions-fill-needs',
        title: 'Job Dependency Declaration in GitHub Actions',
        domain: 'devops',
        mode: 'fill',
        difficulty: 'intermediate',
        targetRole: 'DevOps Engineer',
        summary: 'Ensure the deploy job only runs after the test job passes.',
        instructions: 'Fill in the YAML key that establishes prerequisite job execution.',
        codeSnippet: `jobs:\n  test:\n    runs-on: ubuntu-latest\n    steps: [{ run: npm test }]\n  deploy:\n    ___: test\n    runs-on: ubuntu-latest\n    steps: [{ run: ./deploy.sh }]`,
        solution: 'needs',
        hints: ['GitHub Actions uses the "needs" keyword to create directed acyclic job graphs.'],
        explanation: 'The "needs" key makes job execution sequential and conditional on prior job success.',
        verificationPattern: /^needs$/i,
      },
      {
        id: 'docker-fill-expose',
        title: 'Dockerfile Port Documentation',
        domain: 'devops',
        mode: 'fill',
        difficulty: 'beginner',
        targetRole: 'Cloud Engineer',
        summary: 'Document the listening container port inside a Dockerfile.',
        instructions: 'Fill in the Dockerfile instruction to expose TCP port 8080.',
        codeSnippet: `FROM eclipse-temurin:21-jre-alpine\nWORKDIR /app\nCOPY target/app.jar app.jar\n___ 8080\nENTRYPOINT ["java", "-jar", "app.jar"]`,
        solution: 'EXPOSE',
        hints: ['The EXPOSE instruction informs Docker that the container listens on specified ports.'],
        explanation: 'EXPOSE documents the network port intended for container port forwarding.',
        verificationPattern: /^EXPOSE$/i,
      },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure as Code',
    tagline: 'AWS CLI, Terraform, Kubernetes manifests, and cloud automation.',
    roles: ['Cloud Engineer', 'Infrastructure Architect', 'Kubernetes Administrator'],
    accent: 'amber',
    description: 'Build reproducible cloud platforms with declarative Terraform configurations, plan verification, and containerized Kubernetes pod lifecycle management.',
    exercises: [
      {
        id: 'k8s-fill-replicas',
        title: 'Kubernetes Deployment Pod Scale',
        domain: 'cloud',
        mode: 'fill',
        difficulty: 'intermediate',
        targetRole: 'Kubernetes Administrator',
        summary: 'Configure a Deployment to maintain 3 replicated pods.',
        instructions: 'Fill in the spec field that controls the desired number of pod instances.',
        codeSnippet: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: task-api\nspec:\n  ___: 3\n  selector:\n    matchLabels:\n      app: task-api`,
        solution: 'replicas',
        hints: ['The "replicas" field specifies how many identical pod instances the ReplicaSet should run.'],
        explanation: 'The Kubernetes controller reconciles running pods to equal the replicas target.',
        verificationPattern: /^replicas$/i,
      },
      {
        id: 'tf-recall-plan',
        title: 'Safe Terraform Execution Plan',
        domain: 'cloud',
        mode: 'recall',
        difficulty: 'intermediate',
        targetRole: 'Cloud Infrastructure Engineer',
        summary: 'Create and save an execution plan without applying changes immediately.',
        instructions: 'Type the command to plan changes and save them into tfplan.binary.',
        codeSnippet: `# Review before apply:\n# Save deterministic plan to tfplan.binary:`,
        solution: 'terraform plan -out=tfplan.binary',
        hints: ['Use "terraform plan -out=<filename>" to preserve the evaluated infrastructure graph.'],
        explanation: 'Saving the plan prevents race conditions where cloud state shifts between preview and apply.',
        verificationPattern: /^terraform\s+plan\s+-out=tfplan\.binary$/i,
      },
    ],
  },
  {
    id: 'security',
    title: 'Security & Reliability Engineering',
    tagline: 'Defensive triage, incident analysis, least privilege, and observability.',
    roles: ['Security Analyst (SOC)', 'Site Reliability Engineer (SRE)', 'DevSecOps Specialist'],
    accent: 'rose',
    description: 'Investigate synthetic security incidents, audit firewall rules, inspect priority system logs, enforce least-privilege CI tokens, and practice defensive triage.',
    exercises: [
      {
        id: 'sec-recall-journal-err',
        title: 'Isolate Priority Error Logs',
        domain: 'security',
        mode: 'recall',
        difficulty: 'intermediate',
        targetRole: 'SOC Analyst / Incident Responder',
        summary: 'Filter systemd journal for emergency and error events during an active incident.',
        instructions: 'Type the journalctl command to show the 25 newest entries with priority error through emergency.',
        codeSnippet: `# Server is unresponsive; inspect top severity kernel/daemon errors:`,
        solution: 'journalctl -p err..emerg -n 25 --no-pager',
        hints: ['Use -p err..emerg for priority range and -n 25 --no-pager for quick inspection.'],
        explanation: 'Filtering priority eliminates noise and immediately surfaces root-cause system crashes.',
        verificationPattern: /^journalctl\s+-p\s+err\.\.emerg\s+-n\s+25\s+--no-pager$/i,
      },
    ],
  },
]

export function getCareerTrack(id: CareerDomainId): CareerTrack | undefined {
  return CAREER_TRACKS.find((t) => t.id === id)
}

export function getAllCareerExercises(): CareerSkillExercise[] {
  return CAREER_TRACKS.flatMap((t) => t.exercises)
}
