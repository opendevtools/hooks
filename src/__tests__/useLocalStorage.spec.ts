import { act, renderHook } from '@testing-library/react-hooks'
import { useLocalStorage } from '../useLocalStorage'

afterEach(() => {
  localStorage.clear()
})

test('handles localstorage values', () => {
  const { result } = renderHook(() => useLocalStorage('storedValue'))

  expect(result.current[0]).toEqual('')

  act(() => {
    result.current[1]('awesome value')
  })

  expect(result.current[0]).toEqual('awesome value')
})

test('handles initial value', () => {
  const { result } = renderHook(() => useLocalStorage('storedValue', 'test'))

  expect(result.current[0]).toEqual('test')
})

test('handles error when setting up value', () => {
  ;(localStorage.getItem as jest.Mock).mockImplementationOnce(() => {
    throw new Error('b0rk')
  })

  const { result } = renderHook(() => useLocalStorage('storedValue'))

  expect(result.current[0]).toEqual('')
})
