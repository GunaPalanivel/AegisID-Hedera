"use client"

import { useState, type KeyboardEvent } from "react"

interface CommandInputProps {
  onSubmit?: (command: string) => void
  value?: string
  readOnly?: boolean
  placeholder?: string
}

export function CommandInput({ onSubmit, value, readOnly = false, placeholder }: CommandInputProps) {
  const [command, setCommand] = useState("")

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit(command)
      setCommand("")
    }
  }

  return (
    <div className="flex items-center">
      <span className="text-green-400 mr-2">$</span>
      {readOnly ? (
        <div className="flex-1 text-white">{value}</div>
      ) : (
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-white"
          placeholder={placeholder}
          autoFocus
        />
      )}
    </div>
  )
}
