import { testHook } from 'react-testing-library'
import { useQueryParams } from '../useQueryParams'

declare var jsdom: any

test('gets all query params from window location search', () => {
  let param
  jsdom.reconfigure({
    url: 'http://test.com/?muppet=cookiemonster&street=sesame',
  })

  testHook(() => (param = useQueryParams()))

  expect(param).toEqual({ muppet: 'cookiemonster', street: 'sesame' })
})

test('handles query params with string array', () => {
  let param

  jsdom.reconfigure({
    url: 'http://test.com/?muppets=kermit&muppets=cookiemonster',
  })

  testHook(() => (param = useQueryParams()))

  expect(param).toEqual({ muppets: ['kermit', 'cookiemonster'] })
})

test('handles no query params', () => {
  let param

  jsdom.reconfigure({
    url: 'http://test.com',
  })

  testHook(() => (param = useQueryParams()))

  expect(param).toEqual({})
})
