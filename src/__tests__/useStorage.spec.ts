import { act, renderHook } from '@testing-library/react-hooks'
import { useStorage } from '../useStorage'

afterEach(() => {
  sessionStorage.clear()
})

test('handles sessionStorage values', () => {
  const { result } = renderHook(() =>
    useStorage('storedValue', { store: sessionStorage })
  )

  expect(result.current[0]).toEqual('')

  act(() => {
    result.current[1]('awesome value')
  })

  expect(result.current[0]).toEqual('awesome value')
})

test('handles initial value', () => {
  const { result } = renderHook(() =>
    useStorage('storedValue', {
      initialValue: 'test',
      store: sessionStorage,
    })
  )

  expect(result.current[0]).toEqual('test')
})

test('handles error when setting up value', () => {
  ;(sessionStorage.getItem as jest.Mock).mockImplementationOnce(() => {
    throw new Error('b0rk')
  })

  const { result } = renderHook(() =>
    useStorage('storedValue', { store: sessionStorage })
  )

  expect(result.current[0]).toEqual('')
})
