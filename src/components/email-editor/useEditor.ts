import { useState, useRef } from "react"
import { TStyle, applyStyle } from "./apply-style"

export function useEditor() {
  const [text, setText] = useState("Enter email...")
  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)

  const textRef = useRef<HTMLTextAreaElement | null>(null)

  const updateSelection = () => {
    if (!textRef.current) return
    setSelectionStart(textRef.current.selectionStart)
    setSelectionEnd(textRef.current.selectionEnd)
  }

  const applyFormat = (type: TStyle) => {
    const selectedText = text.substring(selectionStart, selectionEnd)

    if (!selectedText) return

    const beforeText = text.substring(0, selectionStart)
    const afterText = text.substring(selectionEnd)

    setText(beforeText + applyStyle(type, selectedText) + afterText)
  }

  return { text, applyFormat, updateSelection, setText, textRef }
}
