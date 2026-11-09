/**
 * Content schema for CodeRush. Content lives in src/content as typed data, separate from UI.
 * content.test.ts validates every record: required fields, unique ids, unique commands,
 * resolvable references, and safety rules.
 */

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

// ---------- Programming lessons (the original 45-lesson library) ----------

export interface CodeLesson {
  id: string
  title: string
  description: string
  difficulty: Difficulty
  code: string
  /** Estimated minutes. */
  expectedTime: number
  concepts: string[]
}

export interface LanguageTrack {
  language: string
  languageName: string
  description: string
  lessons: CodeLesson[]
}

// ---------- Command exercises ----------

export type Platform = 'linux' | 'powershell' | 'windows-cmd' | 'cisco-ios'

export const PLATFORM_LABEL: Record<Platform, string> = {
  linux: 'Linux',
  powershell: 'PowerShell',
  'windows-cmd': 'Windows Command Prompt',
  'cisco-ios': 'Cisco IOS',
}

export type CommandCategory =
  | 'fundamentals'
  | 'files'
  | 'text'
  | 'processes'
  | 'system'
  | 'packages'
  | 'services'
  | 'logs'
  | 'users'
  | 'permissions'
  | 'networking'
  | 'dns'
  | 'security'
  | 'scripting'
  | 'automation'
  | 'device'

export const CATEGORY_LABEL: Record<CommandCategory, string> = {
  fundamentals: 'Fundamentals',
  files: 'Files and directories',
  text: 'Text processing',
  processes: 'Processes',
  system: 'System information',
  packages: 'Packages',
  services: 'Services',
  logs: 'Logs and events',
  users: 'Users and groups',
  permissions: 'Permissions',
  networking: 'Networking',
  dns: 'DNS',
  security: 'Security',
  scripting: 'Scripting',
  automation: 'Automation',
  device: 'Network devices',
}

export type Safety =
  /** Only reads state. Safe to run on your own machine. */
  | 'read-only'
  /** Changes files or settings. Taught with disposable lab examples. */
  | 'changes-state'
  /** Run only in an authorized lab environment. */
  | 'lab-only'

export type PracticeType = 'type' | 'recall' | 'scenario'

export interface SyntaxPart {
  token: string
  meaning: string
}

export interface SourceRef {
  label: string
  url: string
}

export type ReviewStatus =
  /** Syntax written by the content author from the cited documentation. Not independently reviewed. */
  | 'author-checked'
  /** Needs verification before relying on it. Shown with a notice. */
  | 'needs-review'

export interface CommandExercise {
  /** Stable id, never reused: "<platform>.<slug>". */
  id: string
  command: string
  title: string
  platform: Platform
  shell: 'bash' | 'powershell' | 'cmd' | 'ios'
  category: CommandCategory
  subcategory: string
  difficulty: Difficulty
  /** What the learner will be able to do. */
  objective: string
  /** Plain-English "what it does". */
  summary: string
  /** Optional deeper explanation for advanced learners. */
  details?: string
  whenToUse: string
  /** What to look for in the output. */
  notice?: string
  syntax: SyntaxPart[]
  /** Curated, simulated output. Never presented as live results. */
  sampleOutput: string
  mistakes: string[]
  /** Command ids worth knowing first. */
  prerequisites?: string[]
  permissions: 'standard' | 'elevated'
  /** Package, version, module, or environment requirements. */
  requirements?: string
  safety: Safety
  practice: PracticeType[]
  /** Recall task: describe the goal without giving away the command. */
  recallPrompt: string
  /** Other answers accepted in recall and scenarios, written in canonical form. */
  accepted?: string[]
  related?: string[]
  /** Search aliases, for example "find ip address". */
  keywords?: string[]
  source: SourceRef
  review: ReviewStatus
}

// ---------- Scenarios ----------

export interface ChoiceOption {
  label: string
  correct: boolean
  /** Why this option is right or wrong. */
  why: string
}

export interface ScenarioStep {
  prompt: string
  kind: 'command' | 'choice'
  /** For command steps: extra accepted answers beyond those of commandIds. Matching rules live in lib/terminal. */
  accepted?: string[]
  /** For command steps: library commands that solve this step. Any of their accepted answers counts. The first is the one taught. */
  commandIds?: string[]
  hint?: string
  /** Simulated output shown after a correct command, or the evidence shown before a choice. */
  output?: string
  choices?: ChoiceOption[]
  explanation: string
}

export type ScenarioTrack = 'linux' | 'powershell' | 'networking' | 'security' | 'cisco'

export interface Scenario {
  id: string
  title: string
  track: ScenarioTrack
  platform: Platform
  difficulty: Difficulty
  summary: string
  /** The situation, written as a support ticket or alert. */
  context: string
  steps: ScenarioStep[]
  /** What the output means and what to do next. */
  wrapUp: { meaning: string; nextStep: string }
}

// ---------- Learning paths ----------

export interface QuizQuestion {
  id: string
  prompt: string
  choices: string[]
  answer: number
  explanation: string
}

export interface LearningModule {
  id: string
  title: string
  level: Difficulty
  /** "After this module you can..." */
  outcome: string
  summary: string
  /** Concept explanation paragraphs, plain English. */
  concept: string[]
  commandIds: string[]
  /** Programming lessons: "language/lessonId". */
  lessonRefs?: string[]
  quiz: QuizQuestion[]
  scenarioIds: string[]
  /** Interactive tools the module links to. */
  tools?: ('subnetting' | 'topology')[]
  optional?: boolean
}

export interface LearningPath {
  id: string
  title: string
  tagline: string
  description: string
  difficulty: Difficulty | 'mixed'
  estimatedHours: number
  objectives: string[]
  prerequisites: string[]
  /** Visual accent for cards and the journey map. */
  accent: 'sky' | 'violet' | 'emerald' | 'amber' | 'rose' | 'cyan'
  icon: 'code' | 'terminal' | 'network' | 'shield' | 'powershell' | 'router' | 'lock'
  completion: string
  modules: LearningModule[]
}
