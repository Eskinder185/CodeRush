import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface SimpleCodeDisplayProps {
  code: string
  language: string
}

const SimpleCodeDisplay = ({ code, language }: SimpleCodeDisplayProps) => {
  return (
    <div className="border border-dark-border rounded-lg overflow-hidden">
      {/* Editor Header */}
      <div className="bg-dark-card border-b border-dark-border px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm text-gray-400 font-mono">
            {language.charAt(0).toUpperCase() + language.slice(1)} • {code.split('\n').length} lines
          </span>
        </div>
      </div>

      {/* Code Display */}
      <div className="relative">
        <SyntaxHighlighter
          language={language === 'python' ? 'python' : language === 'javascript' ? 'javascript' : 'text'}
          style={vscDarkPlus}
          className="syntax-highlighter"
          showLineNumbers={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default SimpleCodeDisplay
