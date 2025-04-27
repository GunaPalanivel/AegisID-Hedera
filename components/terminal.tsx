import type React from "react"
import { forwardRef } from "react"

interface TerminalProps {
  children: React.ReactNode
}

export const Terminal = forwardRef<HTMLDivElement, TerminalProps>(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className="w-full h-[70vh] bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-y-auto font-mono text-sm text-gray-200"
    >
      {children}
    </div>
  )
})

Terminal.displayName = "Terminal"
