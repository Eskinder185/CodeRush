import { describe, expect, it } from 'vitest'
import {
  extractJSON,
  validateAIPracticeContent,
  AITypingExerciseSchema,
  AILessonSchema,
  AIQuizSchema,
  AIDebuggingExerciseSchema,
  AICompletionExerciseSchema,
} from './schema'

describe('AI Schema & Content Extraction', () => {
  it('extracts pure JSON string', () => {
    const raw = '{"type":"typing","instructions":"Type code","targetText":"let x = 1;","explanation":"var","hints":[]}'
    const parsed = extractJSON(raw) as Record<string, unknown>
    expect(parsed.type).toBe('typing')
    expect(parsed.targetText).toBe('let x = 1;')
  })

  it('extracts JSON enclosed in markdown code fences', () => {
    const raw = `Here is your requested lesson:
\`\`\`json
{
  "type": "typing",
  "instructions": "Type code",
  "targetText": "fn main() {}",
  "explanation": "main entry point",
  "hints": ["Check brackets"]
}
\`\`\`
Hope this helps!`

    const parsed = extractJSON(raw) as Record<string, unknown>
    expect(parsed.type).toBe('typing')
    expect(parsed.targetText).toBe('fn main() {}')
  })

  it('tolerates trailing commas in JSON', () => {
    const raw = `{"type": "typing", "instructions": "Type it", "targetText": "x = 1", "explanation": "test", "hints": [],}`
    const parsed = extractJSON(raw) as Record<string, unknown>
    expect(parsed.targetText).toBe('x = 1')
  })

  it('throws on empty or non-JSON response', () => {
    expect(() => extractJSON('')).toThrow(/Empty response/)
    expect(() => extractJSON('I am sorry, but I cannot fulfill that.')).toThrow(/Failed to parse/)
  })

  it('validates a correct typing exercise', () => {
    const data = {
      type: 'typing',
      instructions: 'Type this Rust function',
      targetText: 'fn add(a: i32, b: i32) -> i32 {\n    a + b\n}',
      explanation: 'Functions return expressions without semicolons.',
      hints: ['No semicolon on the last line'],
    }
    const validated = AITypingExerciseSchema.parse(data)
    expect(validated.targetText).toContain('fn add')
    expect(validated.instructions).toBe('Type this Rust function')
  })

  it('validates a complete guided lesson', () => {
    const data = {
      title: 'Rust Ownership Basics',
      language: 'Rust',
      difficulty: 'beginner',
      topic: 'Ownership',
      overview: 'Ownership is Rust\'s unique memory management feature.',
      learningObjectives: ['Understand moves', 'Understand drop'],
      exercises: [
        {
          type: 'typing',
          instructions: 'Type string creation',
          targetText: 'let s = String::from("hello");',
          explanation: 'Allocates on the heap',
          hints: ['Double colon syntax'],
        },
      ],
    }
    const validated = AILessonSchema.parse(data)
    expect(validated.learningObjectives).toHaveLength(2)
    expect(validated.exercises[0].targetText).toContain('String::from')
  })

  it('validates an interactive quiz with exactly 4 options and valid answer index', () => {
    const data = {
      title: 'Python Comprehensions Quiz',
      language: 'Python',
      difficulty: 'intermediate',
      topic: 'List Comprehensions',
      questions: [
        {
          id: 'q1',
          question: 'What is the output of [x*2 for x in [1, 2]]?',
          options: ['[1, 2]', '[2, 4]', '[2, 2]', 'Error'],
          answerIndex: 1,
          explanation: 'Each element is doubled.',
        },
      ],
    }
    const validated = AIQuizSchema.parse(data)
    expect(validated.questions[0].answerIndex).toBe(1)
    expect(validated.questions[0].options).toHaveLength(4)
  })

  it('rejects quiz questions with fewer than 4 options or invalid answerIndex', () => {
    const invalidQuiz = {
      title: 'Bad Quiz',
      language: 'Go',
      difficulty: 'beginner',
      topic: 'Go basics',
      questions: [
        {
          id: 'q1',
          question: 'Is Go compiled?',
          options: ['Yes', 'No'], // Only 2 options, requires 4
          answerIndex: 0,
          explanation: 'Go is compiled.',
        },
      ],
    }
    expect(() => AIQuizSchema.parse(invalidQuiz)).toThrow()

    const badIndex = {
      title: 'Bad Index',
      language: 'Go',
      difficulty: 'beginner',
      topic: 'Go basics',
      questions: [
        {
          id: 'q1',
          question: 'Question?',
          options: ['A', 'B', 'C', 'D'],
          answerIndex: 5, // Out of bounds (0..3)
          explanation: 'Invalid index',
        },
      ],
    }
    expect(() => AIQuizSchema.parse(badIndex)).toThrow()
  })

  it('validates a debugging exercise', () => {
    const data = {
      title: 'Fix the off-by-one error',
      language: 'TypeScript',
      difficulty: 'beginner',
      topic: 'Array indexing',
      problemDescription: 'Loop goes past array boundary.',
      buggyCode: 'for (let i = 0; i <= arr.length; i++) {}',
      expectedBehavior: 'Iterate only valid indices.',
      hints: ['Check the <= operator'],
      solutionCode: 'for (let i = 0; i < arr.length; i++) {}',
      solutionExplanation: 'Use < instead of <=.',
    }
    const validated = AIDebuggingExerciseSchema.parse(data)
    expect(validated.solutionCode).toContain('i < arr.length')
  })

  it('validates a code completion exercise', () => {
    const data = {
      title: 'Complete the closure',
      language: 'Rust',
      difficulty: 'intermediate',
      topic: 'Closures',
      prompt: 'Provide a closure adding 1',
      codePrefix: 'let add_one = ',
      expectedCompletion: '|x| x + 1',
      codeSuffix: ';\nassert_eq!(add_one(5), 6);',
      explanation: 'Rust closures use vertical bars |x| for parameters.',
    }
    const validated = AICompletionExerciseSchema.parse(data)
    expect(validated.expectedCompletion).toBe('|x| x + 1')
  })

  it('enforces maximum text length limits', () => {
    const excessiveText = 'a'.repeat(4500)
    expect(() =>
      AITypingExerciseSchema.parse({
        type: 'typing',
        instructions: 'Test',
        targetText: excessiveText,
        explanation: 'Exp',
        hints: [],
      })
    ).toThrow(/exceeds maximum length/)
  })

  it('converts practice content using validateAIPracticeContent', () => {
    const typingContent = validateAIPracticeContent('typing', {
      type: 'typing',
      instructions: 'Type this',
      targetText: 'echo "hello"',
      explanation: 'print',
      hints: [],
    })
    expect(typingContent.kind).toBe('typing')

    const quizContent = validateAIPracticeContent('quiz', {
      title: 'Quiz',
      language: 'SQL',
      difficulty: 'beginner',
      topic: 'SELECT',
      questions: [
        {
          id: 'q1',
          question: 'Which clause filters rows?',
          options: ['SELECT', 'FROM', 'WHERE', 'ORDER BY'],
          answerIndex: 2,
          explanation: 'WHERE filters rows.',
        },
      ],
    })
    expect(quizContent.kind).toBe('quiz')
  })
})
