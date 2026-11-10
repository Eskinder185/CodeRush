import { z } from 'zod'
import type {
  AITypingExercise,
  AILesson,
  AIQuiz,
  AIDebuggingExercise,
  AICompletionExercise,
  AIPracticeContent,
  AIPracticeType,
} from './types'

// Helpers
const cleanString = (max: number) =>
  z
    .string()
    .trim()
    .min(1, 'Text cannot be empty')
    .max(max, `Text exceeds maximum length of ${max} characters`)
    .transform((s) => s.replace(/\r\n/g, '\n'))

export const AITypingExerciseSchema = z.object({
  type: z.literal('typing').default('typing'),
  instructions: cleanString(500),
  targetText: cleanString(4000),
  explanation: cleanString(1500),
  hints: z.array(cleanString(300)).max(6).default([]),
})

export const AILessonExerciseSchema = z.object({
  type: z.enum(['typing', 'completion']).default('typing'),
  instructions: cleanString(500),
  targetText: cleanString(4000),
  explanation: cleanString(1500),
  hints: z.array(cleanString(300)).max(6).default([]),
})

export const AILessonSchema = z.object({
  title: cleanString(150),
  language: cleanString(60),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  topic: cleanString(150),
  overview: cleanString(2000),
  learningObjectives: z.array(cleanString(200)).min(1).max(8),
  exercises: z.array(AILessonExerciseSchema).min(1).max(10),
})

export const AIQuizQuestionSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).substring(2, 9)),
  question: cleanString(500),
  codeSnippet: z.string().optional().transform((s) => (s ? s.replace(/\r\n/g, '\n').trim() : undefined)),
  options: z.tuple([cleanString(300), cleanString(300), cleanString(300), cleanString(300)]),
  answerIndex: z.number().int().min(0).max(3),
  explanation: cleanString(1000),
})

export const AIQuizSchema = z.object({
  title: cleanString(150),
  language: cleanString(60),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  topic: cleanString(150),
  questions: z.array(AIQuizQuestionSchema).min(1).max(10),
})

export const AIDebuggingExerciseSchema = z.object({
  title: cleanString(150),
  language: cleanString(60),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  topic: cleanString(150),
  problemDescription: cleanString(2000),
  buggyCode: cleanString(4000),
  expectedBehavior: cleanString(1000),
  hints: z.array(cleanString(300)).max(6).default([]),
  solutionCode: cleanString(4000),
  solutionExplanation: cleanString(1500),
})

export const AICompletionExerciseSchema = z.object({
  title: cleanString(150),
  language: cleanString(60),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  topic: cleanString(150),
  prompt: cleanString(1000),
  codePrefix: z.string().default('').transform((s) => s.replace(/\r\n/g, '\n')),
  expectedCompletion: cleanString(2000),
  codeSuffix: z.string().default('').transform((s) => s.replace(/\r\n/g, '\n')),
  explanation: cleanString(1500),
})

/**
 * Extracts and parses JSON from raw model output.
 * Handles markdown ```json fences, trailing commas, and leading/trailing whitespace.
 */
export function extractJSON(raw: string): unknown {
  if (!raw || typeof raw !== 'string') {
    throw new Error('Empty response received from model.')
  }

  let text = raw.trim()

  // Match ```json ... ``` or ``` ... ```
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i)
  if (codeBlockMatch && codeBlockMatch[1]) {
    text = codeBlockMatch[1].trim()
  } else {
    // If there's extra conversational prefix/suffix, find first { and last }
    const firstBrace = text.indexOf('{')
    const lastBrace = text.lastIndexOf('}')
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      text = text.substring(firstBrace, lastBrace + 1)
    }
  }

  // Remove possible trailing commas before closing braces/brackets
  const sanitized = text
    .replace(/,\s*([}\]])/g, '$1')

  try {
    return JSON.parse(sanitized)
  } catch (err) {
    const preview = raw.length > 200 ? raw.slice(0, 200) + '...' : raw
    throw new Error(`Failed to parse model output as JSON: ${(err as Error).message}. Response preview: ${preview}`)
  }
}

/**
 * Validates and converts raw JSON into typed AIPracticeContent based on practice type.
 */
export function validateAIPracticeContent(
  practiceType: AIPracticeType,
  rawJson: unknown
): AIPracticeContent {
  switch (practiceType) {
    case 'typing':
    case 'syntax':
    case 'command': {
      // Allow lesson format if model returned a lesson structure, otherwise parse typing exercise
      if (typeof rawJson === 'object' && rawJson !== null && 'exercises' in rawJson) {
        const lesson = AILessonSchema.parse(rawJson) as AILesson
        return { kind: 'lesson', data: lesson }
      }
      const typing = AITypingExerciseSchema.parse(rawJson) as AITypingExercise
      return { kind: 'typing', data: typing }
    }
    case 'lesson': {
      const lesson = AILessonSchema.parse(rawJson) as AILesson
      return { kind: 'lesson', data: lesson }
    }
    case 'quiz': {
      const quiz = AIQuizSchema.parse(rawJson) as AIQuiz
      return { kind: 'quiz', data: quiz }
    }
    case 'debugging': {
      const debug = AIDebuggingExerciseSchema.parse(rawJson) as AIDebuggingExercise
      return { kind: 'debugging', data: debug }
    }
    case 'completion': {
      const comp = AICompletionExerciseSchema.parse(rawJson) as AICompletionExercise
      return { kind: 'completion', data: comp }
    }
    default: {
      throw new Error(`Unsupported practice type: ${practiceType}`)
    }
  }
}
