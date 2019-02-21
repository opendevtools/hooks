import { useState, useEffect } from 'react'

interface StorageOptions {
  initialValue?: any
  store?: Storage
}

export const useStorage = (
  key: string,
  { initialValue, store = localStorage }: StorageOptions = {}
): [string, (newValue: string) => void] => {
  const [value, setValue] = useState(() => {
    try {
      if (initialValue) {
        return initialValue
      } else {
        return store.getItem(key) || ''
      }
    } catch {
      // Try/catch because the user might be in private mode
      // JSON.stringify might also throw
      return ''
    }
  })

  useEffect(() => {
    try {
      store.setItem(key, value)
    } catch {
      // Try/catch because the user might be in private mode
      // JSON.stringify might also throw
    }
  }, [value])

  return [value, setValue]
}
