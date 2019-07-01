import { renderHook } from '@testing-library/react-hooks'
import { useQueryParams } from '../useQueryParams'

declare var jsdom: any

test('gets all query params from window location search', () => {
  jsdom.reconfigure({
    url: 'http://test.com/?muppet=cookiemonster&street=sesame',
  })

  const { result } = renderHook(() => useQueryParams())

  expect(result.current).toEqual({ muppet: 'cookiemonster', street: 'sesame' })
})

test('handles query params with string array', () => {
  jsdom.reconfigure({
    url: 'http://test.com/?muppets=kermit&muppets=cookiemonster',
  })

  const { result } = renderHook(() => useQueryParams())

  expect(result.current).toEqual({ muppets: ['kermit', 'cookiemonster'] })
})

test('handles no query params', () => {
  jsdom.reconfigure({
    url: 'http://test.com',
  })

  const { result } = renderHook(() => useQueryParams())

  expect(result.current).toEqual({})
})
