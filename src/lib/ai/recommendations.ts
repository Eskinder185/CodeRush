import type { AIPractice, AIGenerationRequest } from './types'
import type { SessionResult } from '../../components/typing/useTypingSession'

export interface AIRecommendation {
  id: string
  title: string
  reason: string
  promptSuggestion: string
  request: AIGenerationRequest
}

const TOPIC_PROGRESSIONS: Record<string, { nextTopic: string; blurb: string }[]> = {
  rust: [
    { nextTopic: 'Borrowing and references (& and &mut)', blurb: 'ownership basics' },
    { nextTopic: 'Lifetimes and struct annotations', blurb: 'borrowing' },
    { nextTopic: 'Error handling with Result, Option, and ? operator', blurb: 'basic Rust syntax' },
    { nextTopic: 'Pattern matching and Enum variants', blurb: 'control flow' },
  ],
  python: [
    { nextTopic: 'List and dictionary comprehensions', blurb: 'loops' },
    { nextTopic: 'Generators and yield statements', blurb: 'comprehensions' },
    { nextTopic: 'Context managers and the with statement', blurb: 'file handling' },
    { nextTopic: 'Decorators and functional wrappers', blurb: 'functions' },
  ],
  go: [
    { nextTopic: 'Goroutines and unbuffered channels', blurb: 'Go basics' },
    { nextTopic: 'Select statement and channel timeouts', blurb: 'channels' },
    { nextTopic: 'Struct embedding and interfaces', blurb: 'types' },
    { nextTopic: 'Error wrapping and errors.Is/As', blurb: 'error handling' },
  ],
  typescript: [
    { nextTopic: 'Generics and type constraints', blurb: 'basic typing' },
    { nextTopic: 'Utility types: Partial, Pick, and Record', blurb: 'interfaces' },
    { nextTopic: 'Discriminated unions and exhaustive switches', blurb: 'types' },
    { nextTopic: 'Template literal types and keyof operations', blurb: 'generics' },
  ],
}

/**
 * Builds realistic recommendations based on the finished exercise and typing metrics.
 */
export function getNextRecommendations(
  practice: AIPractice,
  result?: SessionResult
): AIRecommendation[] {
  const recommendations: AIRecommendation[] = []
  const langKey = practice.language.toLowerCase().trim()

  // 1. Weakness-based typing drill if accuracy was below 95% or mistake categories identified
  if (result && result.metrics.accuracy < 96) {
    const cats = result.engine?.categoryStats || {}
    const bracketMistakes = (cats.brackets?.[1] || 0) + (cats.braces?.[1] || 0) + (cats.parentheses?.[1] || 0)
    const quoteMistakes = cats.quotes?.[1] || 0

    if (bracketMistakes >= 2) {
      recommendations.push({
        id: 'rec_brackets',
        title: `Bracket and nesting drill in ${practice.language}`,
        reason: `Your session showed ${bracketMistakes} mis-keyed brackets or braces. Building muscle memory on nesting symbols will boost your speed.`,
        promptSuggestion: `Create an intensive syntax typing drill in ${practice.language} focusing on nested brackets, braces, and closures.`,
        request: {
          language: practice.language,
          difficulty: practice.difficulty,
          practiceType: 'syntax',
          topic: `${practice.topic} - Bracket Drill`,
          userPrompt: `Focus on clean nested brackets, closures, and parentheses.`,
          length: 'short',
        },
      })
    } else if (quoteMistakes >= 2) {
      recommendations.push({
        id: 'rec_quotes',
        title: `String literal and formatting drill in ${practice.language}`,
        reason: `You encountered slight hesitation on quotes and string formatting.`,
        promptSuggestion: `Create a typing challenge in ${practice.language} heavy with string interpolation, quotes, and escaped characters.`,
        request: {
          language: practice.language,
          difficulty: practice.difficulty,
          practiceType: 'syntax',
          topic: `${practice.topic} - Strings and Quotes`,
          userPrompt: `Include multiple quotes and string templates.`,
          length: 'short',
        },
      })
    }
  }

  // 2. Next curriculum topic progression
  const knownProgressions = TOPIC_PROGRESSIONS[langKey]
  if (knownProgressions && knownProgressions.length > 0) {
    // Pick the progression that isn't the current topic
    const nextItem = knownProgressions.find(
      (p) => !practice.topic.toLowerCase().includes(p.nextTopic.toLowerCase().split(' ')[0])
    ) || knownProgressions[0]

    recommendations.push({
      id: 'rec_curriculum_next',
      title: `Next step: ${nextItem.nextTopic}`,
      reason: `Now that you have completed practice on "${practice.topic}", progressing to ${nextItem.nextTopic} reinforces your mastery of ${practice.language}.`,
      promptSuggestion: `Teach me ${nextItem.nextTopic} in ${practice.language} with a clean code snippet and typing challenge.`,
      request: {
        language: practice.language,
        difficulty: practice.difficulty === 'beginner' ? 'intermediate' : practice.difficulty,
        practiceType: practice.type,
        topic: nextItem.nextTopic,
        userPrompt: `Build on what was learned in ${practice.topic}.`,
        length: 'medium',
      },
    })
  } else {
    // Generic topic continuation for other languages (Rust, Zig, C++, Elixir, Swift, etc.)
    recommendations.push({
      id: 'rec_generic_advance',
      title: `Advanced idioms in ${practice.language}`,
      reason: `Strengthen your understanding of ${practice.topic} with edge cases and production patterns.`,
      promptSuggestion: `Create an intermediate/advanced drill on ${practice.topic} in ${practice.language} with error handling.`,
      request: {
        language: practice.language,
        difficulty: practice.difficulty === 'beginner' ? 'intermediate' : 'advanced',
        practiceType: practice.type,
        topic: `${practice.topic} - Idioms & Patterns`,
        userPrompt: `Include practical error handling and idiomatic standard library methods.`,
        length: 'medium',
      },
    })
  }

  // 3. Quiz or Debugging challenge recommendation
  if (practice.type === 'typing' || practice.type === 'syntax') {
    recommendations.push({
      id: 'rec_quiz_check',
      title: `Concept check quiz: ${practice.topic}`,
      reason: `Test whether you can predict outputs and recognize subtle gotchas for ${practice.topic}.`,
      promptSuggestion: `Create a 4-question quiz on ${practice.topic} in ${practice.language}.`,
      request: {
        language: practice.language,
        difficulty: practice.difficulty,
        practiceType: 'quiz',
        topic: practice.topic,
        userPrompt: `Test conceptual comprehension of ${practice.topic}.`,
        length: 'short',
      },
    })
  } else if (practice.type === 'quiz') {
    recommendations.push({
      id: 'rec_debug_drill',
      title: `Debugging challenge: ${practice.topic}`,
      reason: `Now apply your theoretical knowledge by finding and fixing a realistic bug.`,
      promptSuggestion: `Create a debugging challenge for ${practice.topic} in ${practice.language}.`,
      request: {
        language: practice.language,
        difficulty: practice.difficulty,
        practiceType: 'debugging',
        topic: practice.topic,
        userPrompt: `Include a realistic bug in ${practice.language}.`,
        length: 'medium',
      },
    })
  }

  return recommendations
}
