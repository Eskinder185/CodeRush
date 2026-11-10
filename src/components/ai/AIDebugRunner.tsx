import { useState } from 'react'
import { Bug, CheckCircle2, Lightbulb, Eye, Keyboard } from 'lucide-react'
import { Button } from '../ui'
import type { AIDebuggingExercise } from '../../lib/ai/types'

interface Props {
  exercise: AIDebuggingExercise
  onPracticeSolution?: () => void
}

export function AIDebugRunner({ exercise, onPracticeSolution }: Props) {
  const [revealedHints, setRevealedHints] = useState<number>(0)
  const [showSolution, setShowSolution] = useState(false)

  const handleRevealNextHint = () => {
    if (revealedHints < exercise.hints.length) {
      setRevealedHints(revealedHints + 1)
    }
  }

  return (
    <div className="panel panel-pad max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-warn/20 text-warn">
            <Bug className="h-4 w-4" aria-hidden />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              {exercise.language} Debugging • {exercise.difficulty}
            </span>
            <h2 className="text-base font-bold text-fg">{exercise.title}</h2>
          </div>
        </div>
      </div>

      {/* Problem Description */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
          Problem Description
        </h3>
        <p className="text-sm text-fg leading-relaxed bg-surface/50 rounded-lg p-3 border border-line">
          {exercise.problemDescription}
        </p>
      </div>

      {/* Expected Behavior */}
      <div className="space-y-1.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
          Expected Behavior
        </h3>
        <div className="text-xs text-ok font-mono bg-ok/10 border border-ok/20 rounded-md p-2.5">
          {exercise.expectedBehavior}
        </div>
      </div>

      {/* Buggy Code */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-warn flex items-center gap-1.5">
            <Bug className="h-3.5 w-3.5" aria-hidden /> Buggy Code
          </h3>
          <span className="text-xs text-fg-subtle">Find the issue in this snippet</span>
        </div>
        <pre className="overflow-x-auto rounded-lg border border-line bg-sunken p-4 font-mono text-xs text-fg leading-relaxed">
          <code>{exercise.buggyCode}</code>
        </pre>
      </div>

      {/* Hints (Progressive disclosure) */}
      {exercise.hints && exercise.hints.length > 0 && (
        <div className="space-y-2 border-t border-line pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-fg flex items-center gap-1.5">
              <Lightbulb className="h-3.5 w-3.5 text-accent" aria-hidden /> Hints ({revealedHints}/{exercise.hints.length})
            </span>
            {revealedHints < exercise.hints.length && (
              <Button size="sm" variant="ghost" onClick={handleRevealNextHint}>
                Reveal Hint {revealedHints + 1}
              </Button>
            )}
          </div>

          {revealedHints > 0 && (
            <div className="space-y-2">
              {exercise.hints.slice(0, revealedHints).map((hint, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-accent/30 bg-accent/10 p-3 text-xs text-fg"
                >
                  <span className="font-semibold text-accent mr-1.5">Hint {idx + 1}:</span>
                  {hint}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Solution Disclosure */}
      <div className="border-t border-line pt-4 space-y-3">
        {!showSolution ? (
          <div className="flex items-center justify-between">
            <span className="text-xs text-fg-muted">Ready to check your solution?</span>
            <Button variant="secondary" size="sm" onClick={() => setShowSolution(true)}>
              <Eye className="mr-1.5 h-3.5 w-3.5" /> Reveal Solution & Fix
            </Button>
          </div>
        ) : (
          <div className="space-y-3 rounded-xl border border-ok/30 bg-ok/5 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-ok flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" aria-hidden /> Corrected Solution
              </span>
              {onPracticeSolution && (
                <Button size="sm" variant="primary" onClick={onPracticeSolution}>
                  <Keyboard className="mr-1.5 h-3.5 w-3.5" /> Type Fixed Code
                </Button>
              )}
            </div>

            <pre className="overflow-x-auto rounded-lg border border-ok/30 bg-sunken p-3 font-mono text-xs text-fg leading-relaxed">
              <code>{exercise.solutionCode}</code>
            </pre>

            <div className="text-xs text-fg leading-relaxed pt-1">
              <span className="font-semibold text-ok mr-1">Why this works:</span>
              {exercise.solutionExplanation}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
