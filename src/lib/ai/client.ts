import { createAdapter } from './adapters'
import { getSystemPrompt, getUserPrompt, getRevisionPrompt, getTutorSystemPrompt } from './prompts'
import { extractJSON, validateAIPracticeContent } from './schema'
import type {
  AIProviderConfig,
  AIGenerationRequest,
  AIPracticeContent,
  AIPractice,
  AIConnectionTestResult,
  AITutorMessage,
} from './types'

export async function testAIConnection(config: AIProviderConfig): Promise<AIConnectionTestResult> {
  const adapter = createAdapter(config)
  return adapter.testConnection()
}

export async function discoverModels(config: AIProviderConfig): Promise<string[]> {
  const adapter = createAdapter(config)
  return adapter.listModels()
}

export async function generateAIPractice(
  config: AIProviderConfig,
  req: AIGenerationRequest,
  signal?: AbortSignal
): Promise<AIPractice> {
  if (!config.model) {
    throw new Error('No AI model selected. Please select a model in AI Settings.')
  }

  const adapter = createAdapter(config)
  const systemPrompt = getSystemPrompt(req.practiceType)
  const userPrompt = getUserPrompt(req)

  const rawOutput = await adapter.generateChat(
    config.model,
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    {
      temperature: config.temperature ?? 0.3,
      formatJson: true,
      signal,
    }
  )

  const parsedJson = extractJSON(rawOutput)
  const validatedContent = validateAIPracticeContent(req.practiceType, parsedJson)

  // Derive title from validated content
  let title = `${req.language} ${req.topic}`
  if ('title' in validatedContent.data && validatedContent.data.title) {
    title = validatedContent.data.title
  } else if ('instructions' in validatedContent.data && validatedContent.data.instructions) {
    title = `${req.language}: ${validatedContent.data.instructions.slice(0, 40)}...`
  }

  const now = new Date().toISOString()
  return {
    id: `ai_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type: req.practiceType,
    title,
    language: req.language,
    difficulty: req.difficulty,
    topic: req.topic,
    content: validatedContent,
    userPrompt: req.userPrompt,
    modelUsed: config.model,
    providerUsed: config.provider,
    createdAt: now,
    updatedAt: now,
  }
}

export async function reviseAIPractice(
  config: AIProviderConfig,
  currentPractice: AIPractice,
  userInstruction: string,
  signal?: AbortSignal
): Promise<AIPractice> {
  if (!config.model) {
    throw new Error('No AI model selected. Please select a model in AI Settings.')
  }

  const adapter = createAdapter(config)
  const systemPrompt = getSystemPrompt(currentPractice.type)
  const currentJsonStr = JSON.stringify(currentPractice.content.data, null, 2)
  const revisionPrompt = getRevisionPrompt(currentJsonStr, userInstruction)

  const rawOutput = await adapter.generateChat(
    config.model,
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: revisionPrompt },
    ],
    {
      temperature: config.temperature ?? 0.3,
      formatJson: true,
      signal,
    }
  )

  const parsedJson = extractJSON(rawOutput)
  const validatedContent = validateAIPracticeContent(currentPractice.type, parsedJson)

  let title = currentPractice.title
  if ('title' in validatedContent.data && validatedContent.data.title) {
    title = validatedContent.data.title
  }

  return {
    ...currentPractice,
    title,
    content: validatedContent,
    updatedAt: new Date().toISOString(),
  }
}

export async function askAITutor(
  config: AIProviderConfig,
  language: string,
  topic: string,
  exerciseContext: string,
  history: AITutorMessage[],
  newUserMessage: string,
  signal?: AbortSignal
): Promise<string> {
  if (!config.model) {
    throw new Error('No AI model selected. Please select a model in AI Settings.')
  }

  const adapter = createAdapter(config)
  const systemPrompt = getTutorSystemPrompt(language, topic, exerciseContext)

  // Bound context: keep last 6 turns (3 exchanges)
  const recentHistory = history.slice(-6).map((m) => ({
    role: m.role,
    content: m.content,
  }))

  const messages = [
    { role: 'system', content: systemPrompt },
    ...recentHistory,
    { role: 'user', content: newUserMessage },
  ]

  return adapter.generateChat(config.model, messages, {
    temperature: 0.5,
    formatJson: false,
    signal,
  })
}

/**
 * Extracts target text suitable for PracticeRunner from any practice content.
 */
export function getTypingTargetText(content: AIPracticeContent): string {
  switch (content.kind) {
    case 'typing':
      return content.data.targetText
    case 'lesson': {
      // Concatenate exercises or take the first exercise
      if (content.data.exercises.length > 0) {
        return content.data.exercises.map((e) => e.targetText).join('\n\n')
      }
      return '// Empty lesson'
    }
    case 'debugging':
      // The learner practices typing the corrected solution!
      return content.data.solutionCode
    case 'completion':
      return `${content.data.codePrefix}${content.data.expectedCompletion}${content.data.codeSuffix}`
    case 'quiz':
      // Quizzes are practiced through the quiz runner, but if opened in typing mode, display questions
      return content.data.questions
        .map((q, i) => `// Question ${i + 1}: ${q.question}\n// Answer: ${q.options[q.answerIndex]}`)
        .join('\n\n')
  }
}
