import { act, testHook } from 'react-testing-library'
import { useLocalStorage } from '../useLocalStorage'

afterEach(() => {
  localStorage.clear()
})

test('handles localstorage values', () => {
  let value
  let setValue: (value: string) => void

  testHook(() => ([value, setValue] = useLocalStorage('storedValue')))

  expect(value).toEqual('')

  act(() => {
    setValue('awesome value')
  })

  expect(value).toEqual('awesome value')
})

test('handles initial value', () => {
  let value

  testHook(() => ([value] = useLocalStorage('storedValue', 'test')))

  expect(value).toEqual('test')
})

test('handles error when setting up value', () => {
  let value
  ;(localStorage.getItem as jest.Mock).mockImplementationOnce(() => {
    throw new Error('b0rk')
  })

  testHook(() => ([value] = useLocalStorage('storedValue')))

  expect(value).toEqual('')
})
