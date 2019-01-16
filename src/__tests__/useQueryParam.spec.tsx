import 'jest-dom/extend-expect'
import * as React from 'react'
import { render, cleanup } from 'react-testing-library'
import { useQueryParam } from '../useQueryParam'

afterEach(cleanup)

function NeedsParams({ param }: { param: string }) {
  const queryParam = useQueryParam(param)

  return (
    <div>
      {typeof queryParam === 'string' ? queryParam : queryParam.join(',')}
    </div>
  )
}

test('gets query param from window location search', () => {
  jsdom.reconfigure({ url: 'http://test.com/?muppet=cookiemonster' })

  const { getByText } = render(<NeedsParams param="muppet" />)

  expect(getByText(/cookiemonster/i)).toBeInTheDocument()
})

test('handles query params with string array', () => {
  jsdom.reconfigure({
    url: 'http://test.com/?muppets=kermit&muppets=cookiemonster',
  })

  const { getByText } = render(<NeedsParams param="muppets" />)

  expect(getByText(/cookiemonster/i)).toBeInTheDocument()
  expect(getByText(/kermit/i)).toBeInTheDocument()
})
