import { describe, expect, it, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AIPracticeStudio from '../pages/AIPracticeStudio'
import { AIQuizRunner } from '../components/ai/AIQuizRunner'
import { AIDebugRunner } from '../components/ai/AIDebugRunner'
import { AIStatusBadge } from '../components/ai/AIStatusBadge'
import { ToastProvider } from '../components/ui'
import { saveAIPractice } from '../lib/ai/storage'
import type { AIQuiz, AIDebuggingExercise } from '../lib/ai/types'

describe('AI Practice Studio UI', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it('renders the AI Practice Studio header and composer', () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <AIPracticeStudio />
        </ToastProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('AI Practice Studio')).toBeInTheDocument()
    expect(screen.getByText('Exercise Composer')).toBeInTheDocument()
    expect(screen.getByText('Code Typing')).toBeInTheDocument()
    expect(screen.getByText('Generate Practice')).toBeInTheDocument()
  })

  it('switches between tabs: Create Exercise and My Library', () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <AIPracticeStudio />
        </ToastProvider>
      </MemoryRouter>
    )

    const libTab = screen.getByRole('button', { name: /My Library/i })
    fireEvent.click(libTab)

    expect(screen.getByText(/No practices in library/i)).toBeInTheDocument()

    const createTab = screen.getByRole('button', { name: /Create Exercise/i })
    fireEvent.click(createTab)

    expect(screen.getByText('Exercise Composer')).toBeInTheDocument()
  })

  it('displays saved practices in My Library', () => {
    saveAIPractice({
      id: 'saved_rust_1',
      type: 'typing',
      title: 'Rust Lifetimes Drill',
      language: 'Rust',
      difficulty: 'advanced',
      topic: 'Lifetimes',
      content: {
        kind: 'typing',
        data: {
          type: 'typing',
          instructions: 'Type lifetime annotations',
          targetText: "fn longest<'a>(x: &'a str) -> &'a str { x }",
          explanation: 'Lifetime syntax',
          hints: [],
        },
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    render(
      <MemoryRouter>
        <ToastProvider>
          <AIPracticeStudio />
        </ToastProvider>
      </MemoryRouter>
    )

    const libTab = screen.getByRole('button', { name: /My Library/i })
    fireEvent.click(libTab)

    expect(screen.getByText('Rust Lifetimes Drill')).toBeInTheDocument()
    expect(screen.getByText(/advanced/i)).toBeInTheDocument()
  })

  it('renders AIStatusBadge indicating connection state', () => {
    render(
      <AIStatusBadge
        config={{
          provider: 'ollama',
          endpoint: 'http://localhost:11434',
          model: 'llama3:latest',
        }}
        status="connected"
      />
    )

    expect(screen.getByText(/llama3:latest/i)).toBeInTheDocument()
    expect(screen.getByText(/Local/i)).toBeInTheDocument()
  })

  it('runs an interactive AI quiz with scoring and immediate feedback', () => {
    const mockQuiz: AIQuiz = {
      title: 'Python Syntax Quiz',
      language: 'Python',
      difficulty: 'beginner',
      topic: 'Syntax',
      questions: [
        {
          id: 'q1',
          question: 'What is the keyword for defining a function in Python?',
          options: ['func', 'def', 'fn', 'function'],
          answerIndex: 1, // 'def'
          explanation: 'Python uses the def keyword.',
        },
      ],
    }

    render(<AIQuizRunner quiz={mockQuiz} />)

    expect(screen.getByText('What is the keyword for defining a function in Python?')).toBeInTheDocument()

    // Click correct answer 'def'
    const correctBtn = screen.getByRole('button', { name: /def/i })
    fireEvent.click(correctBtn)

    expect(screen.getByText('Correct!')).toBeInTheDocument()
    expect(screen.getByText('Python uses the def keyword.')).toBeInTheDocument()

    // Click Finish Quiz
    const finishBtn = screen.getByRole('button', { name: /Finish Quiz/i })
    fireEvent.click(finishBtn)

    expect(screen.getByText('Quiz Completed!')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('runs an interactive debugging exercise with hints and solution disclosure', () => {
    const mockDebug: AIDebuggingExercise = {
      title: 'Fix Go Nil Map',
      language: 'Go',
      difficulty: 'intermediate',
      topic: 'Maps',
      problemDescription: 'Assignment to entry in nil map causes runtime panic.',
      buggyCode: 'var m map[string]int\nm["a"] = 1',
      expectedBehavior: 'Map is initialized before insertion.',
      hints: ['Use make() to initialize the map.'],
      solutionCode: 'm := make(map[string]int)\nm["a"] = 1',
      solutionExplanation: 'make() allocates and initializes the hash map data structure.',
    }

    render(<AIDebugRunner exercise={mockDebug} />)

    expect(screen.getByText('Fix Go Nil Map')).toBeInTheDocument()
    expect(screen.getByText(/Assignment to entry in nil map/i)).toBeInTheDocument()

    // Reveal hint
    const hintBtn = screen.getByRole('button', { name: /Reveal Hint 1/i })
    fireEvent.click(hintBtn)

    expect(screen.getByText(/Use make\(\) to initialize/i)).toBeInTheDocument()

    // Reveal solution
    const solBtn = screen.getByRole('button', { name: /Reveal Solution & Fix/i })
    fireEvent.click(solBtn)

    expect(screen.getByText(/Corrected Solution/i)).toBeInTheDocument()
    expect(screen.getByText(/make\(map\[string\]int\)/i)).toBeInTheDocument()
  })
})
