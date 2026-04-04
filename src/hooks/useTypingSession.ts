import { useRef, useEffect, useCallback, useState } from 'react'

/**
 * Tracks active typing time: starts on first input, pauses accumulate when `isPaused`,
 * exposes millisecond duration for metrics. `tick` bumps on an interval while active
 * so consumers can re-render WPM/clock without storing duplicate timer state.
 */
export function useTypingSession(hasInput: boolean, isPaused: boolean) {
  const startedAtRef = useRef<number | null>(null)
  const pauseStartedAtRef = useRef<number | null>(null)
  const pausedTotalMsRef = useRef(0)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!hasInput) {
      startedAtRef.current = null
      pauseStartedAtRef.current = null
      pausedTotalMsRef.current = 0
      setTick((t) => t + 1)
      return
    }
    if (startedAtRef.current === null) {
      startedAtRef.current = Date.now()
    }
  }, [hasInput])

  useEffect(() => {
    if (isPaused) {
      if (pauseStartedAtRef.current === null) {
        pauseStartedAtRef.current = Date.now()
      }
    } else if (pauseStartedAtRef.current !== null) {
      pausedTotalMsRef.current += Date.now() - pauseStartedAtRef.current
      pauseStartedAtRef.current = null
    }
  }, [isPaused])

  useEffect(() => {
    if (!hasInput || isPaused) return
    const id = window.setInterval(() => setTick((t) => t + 1), 250)
    return () => window.clearInterval(id)
  }, [hasInput, isPaused])

  const getActiveElapsedMs = useCallback(() => {
    if (startedAtRef.current === null) return 0
    const now = Date.now()
    let pauseMs = pausedTotalMsRef.current
    if (pauseStartedAtRef.current !== null) {
      pauseMs += now - pauseStartedAtRef.current
    }
    return Math.max(0, now - startedAtRef.current - pauseMs)
  }, [])

  const reset = useCallback(() => {
    startedAtRef.current = null
    pauseStartedAtRef.current = null
    pausedTotalMsRef.current = 0
    setTick((t) => t + 1)
  }, [])

  return { getActiveElapsedMs, reset, tick }
}
