import 'jest-dom/extend-expect'
import * as React from 'react'
import { render, cleanup } from 'react-testing-library'
import { useQueryParams } from '../useQueryParams'

afterEach(cleanup)

function NeedsParams({ param }: { param: string }) {
  const queryParam = useQueryParams(param)

  return <div>{queryParam}</div>
}

test('gets query param from window location search', () => {
  jsdom.reconfigure({ url: 'http://test.com/?muppet=cookiemonster' })

  const { getByText } = render(<NeedsParams param="muppet" />)

  expect(getByText(/cookiemonster/i)).toBeInTheDocument()
})
