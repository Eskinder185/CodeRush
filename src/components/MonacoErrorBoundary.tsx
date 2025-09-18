import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class MonacoErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Monaco Editor failed to load:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="border border-dark-border rounded-lg overflow-hidden">
          <div className="bg-dark-card border-b border-dark-border px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-400 font-mono">
                Code Editor (Fallback Mode)
              </span>
            </div>
          </div>
          <div className="p-4 bg-yellow-600/10 border-b border-yellow-500/30">
            <div className="flex items-center space-x-2 text-yellow-400">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">Using fallback editor - Monaco Editor failed to load</span>
            </div>
          </div>
          {this.props.fallback}
        </div>
      )
    }

    return this.props.children
  }
}

export default MonacoErrorBoundary
