import { act, testHook } from 'react-testing-library'
import { useToggle } from '../useToggle'

test('toggles the state', () => {
  let isToggled
  let toggleValue: () => void

  testHook(() => ([isToggled, toggleValue] = useToggle(false)))

  expect(isToggled).toBe(false)

  act(() => {
    toggleValue()
  })

  expect(isToggled).toBe(true)
})
