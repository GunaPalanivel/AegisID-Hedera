import type React from "react"

interface CommandOutputProps {
  children: React.ReactNode
}

export function CommandOutput({ children }: CommandOutputProps) {
  return <div className="mt-2 pl-4 border-l border-gray-700">{children}</div>
}
