/**
 * Core types for Bring Your Own AI (BYOAI) and AI Practice Studio.
 */

export type AIProviderType = 'ollama' | 'lmstudio' | 'custom-openai' | 'gateway'

export type AIConnectionStatus =
  | 'not-configured'
  | 'connecting'
  | 'connected'
  | 'model-unavailable'
  | 'permission-required'
  | 'cors-blocked'
  | 'auth-required'
  | 'connection-failed'

export interface AIProviderConfig {
  provider: AIProviderType
  endpoint: string
  model: string
  displayName?: string
  temperature?: number
  timeoutMs?: number
  /**
   * Optional authentication token for custom/gateway endpoints.
   * Stored strictly in-memory or transient session; NEVER exported or logged.
   */
  apiKey?: string
}

export type AIPracticeType =
  | 'typing'
  | 'lesson'
  | 'quiz'
  | 'debugging'
  | 'completion'
  | 'syntax'
  | 'command'

export type AIDifficulty = 'beginner' | 'intermediate' | 'advanced'

export type AIExerciseLength = 'short' | 'medium' | 'long'

export interface AITypingExercise {
  type: 'typing'
  instructions: string
  targetText: string
  explanation: string
  hints: string[]
}

export interface AILessonExercise {
  type: 'typing' | 'completion'
  instructions: string
  targetText: string
  explanation: string
  hints: string[]
}

export interface AILesson {
  title: string
  language: string
  difficulty: AIDifficulty
  topic: string
  overview: string
  learningObjectives: string[]
  exercises: AILessonExercise[]
}

export interface AIQuizQuestion {
  id: string
  question: string
  codeSnippet?: string
  options: [string, string, string, string]
  answerIndex: number // 0..3
  explanation: string
}

export interface AIQuiz {
  title: string
  language: string
  difficulty: AIDifficulty
  topic: string
  questions: AIQuizQuestion[]
}

export interface AIDebuggingExercise {
  title: string
  language: string
  difficulty: AIDifficulty
  topic: string
  problemDescription: string
  buggyCode: string
  expectedBehavior: string
  hints: string[]
  solutionCode: string
  solutionExplanation: string
}

export interface AICompletionExercise {
  title: string
  language: string
  difficulty: AIDifficulty
  topic: string
  prompt: string
  codePrefix: string
  expectedCompletion: string
  codeSuffix: string
  explanation: string
}

export type AIPracticeContent =
  | { kind: 'typing'; data: AITypingExercise }
  | { kind: 'lesson'; data: AILesson }
  | { kind: 'quiz'; data: AIQuiz }
  | { kind: 'debugging'; data: AIDebuggingExercise }
  | { kind: 'completion'; data: AICompletionExercise }

export interface AIPractice {
  id: string
  type: AIPracticeType
  title: string
  language: string
  difficulty: AIDifficulty
  topic: string
  content: AIPracticeContent
  userPrompt?: string
  modelUsed?: string
  providerUsed?: AIProviderType
  createdAt: string
  updatedAt: string
}

export interface AIGenerationRequest {
  language: string
  difficulty: AIDifficulty
  practiceType: AIPracticeType
  topic: string
  userPrompt?: string
  length: AIExerciseLength
}

export interface AITutorMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface AIConnectionTestResult {
  ok: boolean
  status: AIConnectionStatus
  models: string[]
  latencyMs?: number
  error?: string
  troubleshooting?: string
}
