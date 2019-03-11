import { act, testHook } from 'react-testing-library'
import { useStorage } from '../useStorage'

afterEach(() => {
  sessionStorage.clear()
})

test('handles sessionStorage values', () => {
  let value
  let setValue: (value: string) => void

  testHook(
    () =>
      ([value, setValue] = useStorage('storedValue', { store: sessionStorage }))
  )

  expect(value).toEqual('')

  act(() => {
    setValue('awesome value')
  })

  expect(value).toEqual('awesome value')
})

test('handles initial value', () => {
  let value

  testHook(
    () =>
      ([value] = useStorage('storedValue', {
        initialValue: 'test',
        store: sessionStorage,
      }))
  )

  expect(value).toEqual('test')
})

test('handles error when setting up value', () => {
  let value
  ;(sessionStorage.getItem as jest.Mock).mockImplementationOnce(() => {
    throw new Error('b0rk')
  })

  testHook(
    () => ([value] = useStorage('storedValue', { store: sessionStorage }))
  )

  expect(value).toEqual('')
})
