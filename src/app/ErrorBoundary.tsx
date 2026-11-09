import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface State {
  error?: Error
}

/** Catches render errors so one broken view never blanks the whole app. Saved progress is untouched. */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = {}

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('CodeRush render error', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="page flex min-h-[60vh] items-center justify-center" role="alert">
        <div className="max-w-md text-center">
          <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-warn" aria-hidden />
          <h1 className="text-h2">Something went wrong on this page</h1>
          <p className="mt-3 text-fg-subtle">Your saved progress is safe in this browser. Reloading usually fixes it.</p>
          <button type="button" onClick={() => window.location.reload()} className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-accent px-4 font-medium text-accent-fg">
            <RefreshCw className="h-4 w-4" aria-hidden /> Reload
          </button>
        </div>
      </div>
    )
  }
}
