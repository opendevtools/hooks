import { useState, useEffect } from 'react'

export const useLocalStorage = (
  key: string,
  initialValue?: any
): [string, (newValue: string) => void] => {
  const [value, setValue] = useState(() => {
    try {
      if (initialValue) {
        return JSON.stringify(initialValue)
      } else {
        return localStorage.getItem(key) || ''
      }
    } catch {
      // Try/catch because the user might be in private mode
      // JSON.stringify might also throw
      return ''
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Try/catch because the user might be in private mode
      // JSON.stringify might also throw
    }
  }, [value])

  return [value, setValue]
}
