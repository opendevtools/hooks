import { useState } from 'react'
import { act, testHook } from 'react-testing-library'
import { useDebounce } from '../useDebounce'

test('sets a input value after a delay', () => {
  let value
  let updateValue: (value: string) => void
  let debouncedValue

  jest.useFakeTimers()

  testHook(() => {
    ;[value, updateValue] = useState('')
    debouncedValue = useDebounce(value, 300)
  })

  expect(debouncedValue).toEqual('')

  act(() => {
    updateValue('test')
  })

  act(() => {
    jest.runAllTimers()
  })

  expect(debouncedValue).toEqual('test')
})
