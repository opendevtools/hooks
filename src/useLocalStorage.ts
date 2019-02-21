import { useStorage } from './useStorage'

export const useLocalStorage = (
  key: string,
  initialValue?: any
): [string, (newValue: string) => void] => useStorage(key, { initialValue })
