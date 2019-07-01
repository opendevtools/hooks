import { renderHook } from '@testing-library/react-hooks'
import { useQueryParam } from '../useQueryParam'

declare var jsdom: any

test('gets query param from window location search', () => {
  jsdom.reconfigure({ url: 'http://test.com/?muppet=cookiemonster' })

  const { result } = renderHook(() => useQueryParam('muppet'))

  expect(result.current).toEqual('cookiemonster')
})

test('handles query params with string array', () => {
  jsdom.reconfigure({
    url: 'http://test.com/?muppets=kermit&muppets=cookiemonster',
  })

  const { result } = renderHook(() => useQueryParam('muppets'))

  expect(result.current).toEqual(['kermit', 'cookiemonster'])
})

test('handles no query params', () => {
  jsdom.reconfigure({
    url: 'http://test.com',
  })

  const { result } = renderHook(() => useQueryParam('muppet'))

  expect(result.current).toEqual('')
})
