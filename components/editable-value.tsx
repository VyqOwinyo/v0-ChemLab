"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface EditableValueProps {
  value: string | number
  onSave: (value: string) => void
  prefix?: string
  className?: string
  inputClassName?: string
}

export function EditableValue({ value, onSave, prefix = "", className = "", inputClassName = "" }: EditableValueProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Format the initial value by removing the prefix if it exists
  const formattedValue =
    typeof value === "string" ? (value.startsWith(prefix) ? value.substring(prefix.length) : value) : value.toString()

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleClick = () => {
    setEditValue(formattedValue)
    setIsEditing(true)
  }

  const handleBlur = () => {
    handleSave()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      setIsEditing(false)
    }
  }

  const handleSave = () => {
    // Validate that the input is a valid number
    if (editValue.trim() !== "" && !isNaN(Number(editValue.replace(/,/g, "")))) {
      onSave(editValue)
    }
    setIsEditing(false)
  }

  return (
    <div className={cn("relative group cursor-pointer", className)}>
      {isEditing ? (
        <div className="flex items-center">
          {prefix && <span className="text-current">{prefix}</span>}
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={cn("bg-transparent border-b-2 border-primary outline-none px-1 w-full", inputClassName)}
            aria-label="Edit value"
          />
        </div>
      ) : (
        <div onClick={handleClick} className="flex items-center">
          <span>
            {prefix}
            {formattedValue}
          </span>
          <span className="invisible group-hover:visible ml-2 text-sm text-muted-foreground">(Click to edit)</span>
        </div>
      )}
    </div>
  )
}
