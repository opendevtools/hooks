import * as React from 'react'
import { useLocalStorage } from '../useLocalStorage'
import { render, fireEvent } from 'react-testing-library'

function Storage({ initialValue }: { initialValue?: string }) {
  const [value, setValue] = useLocalStorage('storedValue', initialValue)

  return (
    <div>
      {value ? value : 'no value ;('}
      <label htmlFor="store">Update store value</label>
      <input
        id="store"
        onChange={e => setValue(e.currentTarget.value)}
        type="text"
        value={value}
      />
    </div>
  )
}

test('handles localstorage values', () => {
  const { getByText, getByLabelText } = render(<Storage />)

  expect(getByText(/no value/i)).toBeInTheDocument()

  fireEvent.change(getByLabelText(/update store value/i), {
    target: { value: 'awesome value' },
  })

  expect(getByText(/awesome value/i)).toBeInTheDocument()
})

test('handles initial value', () => {
  const { getByText } = render(<Storage initialValue="test" />)

  expect(getByText(/test/i)).toBeInTheDocument()
})

test('handles error when setting up value', () => {
  global.JSON.stringify = jest.fn().mockImplementation(() => {
    throw new Error('b0rk')
  })

  const { getByText } = render(<Storage initialValue="test" />)

  expect(getByText(/no value/i)).toBeInTheDocument()
})
