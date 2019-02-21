import { useStorage } from './useStorage'

export const useLocalStorage = (
  key: string,
  initialValue?: any
): [string, (newValue: string) => void] => {
  const [value, setValue] = useStorage(key, { initialValue })

  return [value, setValue]
}
