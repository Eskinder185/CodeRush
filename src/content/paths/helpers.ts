import type { QuizQuestion } from '../types'

/** Compact quiz question builder. `answer` is the index of the correct choice. */
export function q(id: string, prompt: string, choices: string[], answer: number, explanation: string): QuizQuestion {
  return { id, prompt, choices, answer, explanation }
}
