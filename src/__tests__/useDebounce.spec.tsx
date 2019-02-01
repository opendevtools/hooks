import 'jest-dom/extend-expect'
import * as React from 'react'
import { cleanup, fireEvent, render } from 'react-testing-library'
import { useDebounce } from '../useDebounce'

afterEach(cleanup)

function Debounced() {
  const [inputValue, setInputValue] = React.useState('')
  const debouncedValue = useDebounce(inputValue, 300)

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  return (
    <div>
      <label htmlFor="test-input">Best field ever</label>
      <input id="test-input" onChange={handleChange} value={debouncedValue} />
      {debouncedValue}
    </div>
  )
}

test('sets a input value after a delay', () => {
  jest.useFakeTimers()

  const { getByLabelText, getByText, queryByText } = render(<Debounced />)

  expect(queryByText(/awesome search query/i)).not.toBeInTheDocument()

  fireEvent.change(getByLabelText(/best field ever/i), {
    target: {
      value: 'awesome search query',
    },
  })

  jest.runAllTimers()

  expect(getByText(/awesome search query/i)).toBeInTheDocument()
})
