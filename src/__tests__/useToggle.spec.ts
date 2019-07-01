import { act, renderHook } from '@testing-library/react-hooks'
import { useToggle } from '../useToggle'

test('toggles the state', () => {
  const { result } = renderHook(() => useToggle(false))

  expect(result.current[0]).toBe(false)

  act(() => {
    result.current[1]()
  })

  expect(result.current[0]).toBe(true)
})
