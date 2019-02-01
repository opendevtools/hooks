import * as React from 'react'
import { fireEvent, render } from 'react-testing-library'
import { useToggle } from '../useToggle'

function Toggle({ initialValue }: { initialValue: boolean }) {
  const [isToggled, toggleValue] = useToggle(initialValue)

  return (
    <div>
      {isToggled ? 'true' : 'false'}
      <button onClick={toggleValue}>Toggle</button>
    </div>
  )
}

test('toggles the state', () => {
  const { getByText } = render(<Toggle initialValue={false} />)

  expect(getByText(/false/i)).toBeInTheDocument()

  fireEvent.click(getByText(/toggle/i))

  expect(getByText(/true/i)).toBeInTheDocument()
})
