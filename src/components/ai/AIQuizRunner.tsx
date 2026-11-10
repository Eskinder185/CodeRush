import { useState } from 'react'
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react'
import { Button } from '../ui'
import type { AIQuiz } from '../../lib/ai/types'

interface Props {
  quiz: AIQuiz
  onComplete?: (score: number, total: number) => void
  onRestart?: () => void
}

export function AIQuizRunner({ quiz, onComplete, onRestart }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  const currentQ = quiz.questions[currentIndex]
  const total = quiz.questions.length
  const selected = selectedAnswers[currentIndex]
  const isAnswered = selected !== undefined

  const handleSelectOption = (optIndex: number) => {
    if (isAnswered) return
    const nextAnswers = { ...selectedAnswers, [currentIndex]: optIndex }
    setSelectedAnswers(nextAnswers)
  }

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setIsFinished(true)
      const correctCount = quiz.questions.reduce((acc, q, i) => {
        return acc + (selectedAnswers[i] === q.answerIndex ? 1 : 0)
      }, 0)
      onComplete?.(correctCount, total)
    }
  }

  const handleRestart = () => {
    setSelectedAnswers({})
    setCurrentIndex(0)
    setIsFinished(false)
    onRestart?.()
  }

  if (isFinished) {
    const correctCount = quiz.questions.reduce((acc, q, i) => {
      return acc + (selectedAnswers[i] === q.answerIndex ? 1 : 0)
    }, 0)
    const pct = Math.round((correctCount / total) * 100)

    return (
      <div className="panel panel-pad max-w-2xl mx-auto space-y-6 text-center">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent">
            <CheckCircle2 className="h-8 w-8" />
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-fg">Quiz Completed!</h2>
          <p className="text-sm text-fg-muted">{quiz.title}</p>
        </div>

        <div className="rounded-xl border border-line bg-surface/60 p-6 space-y-2">
          <div className="text-4xl font-extrabold text-accent">{pct}%</div>
          <p className="text-sm text-fg-subtle">
            You answered {correctCount} of {total} questions correctly.
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <Button variant="secondary" onClick={handleRestart}>
            <RotateCcw className="mr-1.5 h-4 w-4" /> Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="panel panel-pad max-w-2xl mx-auto space-y-6">
      {/* Quiz Header & Progress */}
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            {quiz.language} • {quiz.difficulty}
          </span>
          <h2 className="text-base font-bold text-fg">{quiz.title}</h2>
        </div>
        <div className="text-xs font-medium text-fg-subtle">
          Question {currentIndex + 1} of {total}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-subtle">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="space-y-4">
        <p className="text-base font-medium text-fg leading-relaxed">{currentQ.question}</p>

        {currentQ.codeSnippet && (
          <pre className="overflow-x-auto rounded-lg border border-line bg-sunken p-3 font-mono text-xs text-fg leading-relaxed">
            <code>{currentQ.codeSnippet}</code>
          </pre>
        )}

        {/* Options */}
        <div className="space-y-2.5 pt-2">
          {currentQ.options.map((option, optIdx) => {
            const isChosen = selected === optIdx
            const isCorrect = optIdx === currentQ.answerIndex

            let optionClass =
              'border-line bg-surface hover:border-line-strong hover:bg-elevated text-fg'

            if (isAnswered) {
              if (isCorrect) {
                optionClass = 'border-ok bg-ok/15 text-fg font-medium'
              } else if (isChosen) {
                optionClass = 'border-warn bg-warn/15 text-fg'
              } else {
                optionClass = 'border-line/40 bg-surface/40 text-fg-muted opacity-60'
              }
            }

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(optIdx)}
                disabled={isAnswered}
                className={`flex w-full items-start gap-3 rounded-lg border p-3.5 text-left text-sm transition duration-fast ${optionClass}`}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line-strong text-xs font-mono font-medium">
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="flex-1">{option}</span>
                {isAnswered && isCorrect && (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-ok" aria-hidden />
                )}
                {isAnswered && isChosen && !isCorrect && (
                  <XCircle className="h-4 w-4 shrink-0 text-warn" aria-hidden />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Explanation on Answer */}
      {isAnswered && (
        <div
          className={`rounded-lg border p-4 text-xs leading-relaxed ${
            selected === currentQ.answerIndex
              ? 'border-ok/30 bg-ok/10 text-fg'
              : 'border-warn/30 bg-warn/10 text-fg'
          }`}
        >
          <div className="font-semibold mb-1 flex items-center gap-1.5">
            <HelpCircle className="h-3.5 w-3.5" aria-hidden />
            {selected === currentQ.answerIndex ? 'Correct!' : 'Incorrect'}
          </div>
          <p>{currentQ.explanation}</p>
        </div>
      )}

      {/* Next Button */}
      {isAnswered && (
        <div className="flex justify-end pt-2">
          <Button variant="primary" onClick={handleNext}>
            {currentIndex < total - 1 ? 'Next Question' : 'Finish Quiz'}
            <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden />
          </Button>
        </div>
      )}
    </div>
  )
}
