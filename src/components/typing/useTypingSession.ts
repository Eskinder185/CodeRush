import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  applyInput,
  applyTab,
  computeMetrics,
  createEngine,
  type EngineOptions,
  type EngineState,
  type InputMeta,
  type TypingMetrics,
} from '../../lib/typing/engine'
import { elapsedMs, idleTimer, pauseTimer, resumeTimer, startTimer, type TimerState } from '../../lib/typing/timer'
import { playKeySound, useSettings } from '../../lib/settings'

export type SessionStatus = 'idle' | 'running' | 'paused' | 'finished'

export interface SessionResult {
  metrics: TypingMetrics
  engine: EngineState
  durationSec: number
  wpmSeries: number[]
  timedOut: boolean
}

export interface UseTypingSessionOptions {
  target: string
  /** Seconds. 0 means untimed: the session ends when the last character is typed. */
  timeLimitSec?: number
  blockOnError?: boolean
  onFinish?: (r: SessionResult) => void
  onPasteBlocked?: () => void
}

export function useTypingSession({ target, timeLimitSec = 0, blockOnError = false, onFinish, onPasteBlocked }: UseTypingSessionOptions) {
  const settings = useSettings()
  const opts: EngineOptions = useMemo(() => ({ forgiving: !settings.strict, blockOnError }), [settings.strict, blockOnError])

  const [engine, setEngine] = useState(() => createEngine(target))
  const [status, setStatus] = useState<SessionStatus>('idle')
  const [now, setNow] = useState(() => Date.now())
  const engineRef = useRef(engine)
  const timerRef = useRef<TimerState>(idleTimer)
  const statusRef = useRef<SessionStatus>('idle')
  const seriesRef = useRef<number[]>([])
  const onFinishRef = useRef(onFinish)
  const onPasteRef = useRef(onPasteBlocked)
  onFinishRef.current = onFinish
  onPasteRef.current = onPasteBlocked

  const setStatusBoth = (s: SessionStatus) => {
    statusRef.current = s
    setStatus(s)
  }

  const reset = useCallback(() => {
    const fresh = createEngine(target)
    engineRef.current = fresh
    timerRef.current = idleTimer
    seriesRef.current = []
    setEngine(fresh)
    setStatusBoth('idle')
    setNow(Date.now())
  }, [target])

  // A new target always starts a clean session.
  useEffect(() => {
    reset()
  }, [reset])

  const finish = useCallback(
    (timedOut: boolean) => {
      if (statusRef.current === 'finished') return
      const t = Date.now()
      const limitMs = timeLimitSec * 1000
      let ms = elapsedMs(timerRef.current, t)
      if (limitMs > 0) ms = Math.min(ms, limitMs)
      timerRef.current = pauseTimer(timerRef.current, t)
      const metrics = computeMetrics(engineRef.current, ms)
      setStatusBoth('finished')
      setNow(t)
      onFinishRef.current?.({ metrics, engine: engineRef.current, durationSec: Math.round(ms / 1000), wpmSeries: seriesRef.current.slice(), timedOut })
    },
    [timeLimitSec]
  )

  // Clock: re-render a few times per second while running, sample WPM once per second.
  useEffect(() => {
    if (status !== 'running') return
    const id = window.setInterval(() => {
      const t = Date.now()
      const ms = elapsedMs(timerRef.current, t)
      const second = Math.floor(ms / 1000)
      while (seriesRef.current.length < second) {
        seriesRef.current.push(computeMetrics(engineRef.current, (seriesRef.current.length + 1) * 1000).wpm)
      }
      if (timeLimitSec > 0 && ms >= timeLimitSec * 1000) finish(true)
      else setNow(t)
    }, 200)
    return () => window.clearInterval(id)
  }, [status, timeLimitSec, finish])

  const commit = useCallback(
    (next: EngineState) => {
      const prev = engineRef.current
      if (next === prev) return
      if (next.rejectedPastes > prev.rejectedPastes) {
        engineRef.current = next
        setEngine(next)
        onPasteRef.current?.()
        return
      }
      if (next.keystrokes > prev.keystrokes) playKeySound(next.errors.length > prev.errors.length ? 'error' : 'key')
      engineRef.current = next
      setEngine(next)
      const t = Date.now()
      if (statusRef.current === 'idle' && next.keystrokes > 0) {
        timerRef.current = startTimer(timerRef.current, t)
        setStatusBoth('running')
      }
      setNow(t)
      if (next.input.length >= next.target.length && next.target.length > 0) finish(false)
    },
    [finish]
  )

  const resume = useCallback(() => {
    if (statusRef.current !== 'paused') return
    timerRef.current = resumeTimer(timerRef.current, Date.now())
    setStatusBoth('running')
  }, [])

  const pause = useCallback(() => {
    if (statusRef.current !== 'running') return
    timerRef.current = pauseTimer(timerRef.current, Date.now())
    setStatusBoth('paused')
    setNow(Date.now())
  }, [])

  const input = useCallback(
    (value: string, meta: InputMeta) => {
      if (statusRef.current === 'finished') return
      if (statusRef.current === 'paused') resume()
      commit(applyInput(engineRef.current, value, opts, meta))
    },
    [commit, opts, resume]
  )

  /** Insert one character as a keystroke, for on-screen symbol keys. */
  const typeChar = useCallback(
    (ch: string) => input(engineRef.current.input + ch, { inputType: 'insertText' }),
    [input]
  )

  /** Returns true when Tab was used to fill expected indentation. */
  const tab = useCallback((): boolean => {
    if (statusRef.current === 'finished') return false
    const next = applyTab(engineRef.current, opts)
    if (!next) return false
    if (statusRef.current === 'paused') resume()
    commit(next)
    return true
  }, [commit, opts, resume])

  const elapsed = elapsedMs(timerRef.current, now)
  const metrics = useMemo(() => computeMetrics(engine, elapsed), [engine, elapsed])
  const remainingSec = timeLimitSec > 0 ? Math.max(0, Math.ceil(timeLimitSec - elapsed / 1000)) : null

  return { engine, status, metrics, elapsedMs: elapsed, remainingSec, input, typeChar, tab, pause, resume, reset, finish: () => finish(false) }
}

export type TypingSession = ReturnType<typeof useTypingSession>
