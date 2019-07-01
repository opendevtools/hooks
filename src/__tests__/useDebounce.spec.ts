import { useState } from 'react'
import { act, renderHook } from '@testing-library/react-hooks'
import { useDebounce } from '../useDebounce'

test('sets a input value after a delay', () => {
  let value: string
  let updateValue: (value: string) => void

  jest.useFakeTimers()

  const { result } = renderHook(() => {
    ;[value, updateValue] = useState('')
    return useDebounce(value, 300)
  })

  expect(result.current).toEqual('')

  act(() => {
    updateValue('test')
  })

  act(() => {
    jest.runAllTimers()
  })

  expect(result.current).toEqual('test')
})
