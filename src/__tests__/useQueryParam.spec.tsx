import * as React from 'react'
import { render } from 'react-testing-library'
import { useQueryParam } from '../useQueryParam'

declare var jsdom: any

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

test('handles no query params', () => {
  jsdom.reconfigure({
    url: 'http://test.com',
  })

  const { container } = render(<NeedsParams param="muppet" />)

  expect(container).toMatchInlineSnapshot(`
<div>
  <div />
</div>
`)
})
