import { testHook } from 'react-testing-library'
import { useQueryParam } from '../useQueryParam'

declare var jsdom: any

test('gets query param from window location search', () => {
  let param
  jsdom.reconfigure({ url: 'http://test.com/?muppet=cookiemonster' })

  testHook(() => (param = useQueryParam('muppet')))

  expect(param).toEqual('cookiemonster')
})

test('handles query params with string array', () => {
  let param

  jsdom.reconfigure({
    url: 'http://test.com/?muppets=kermit&muppets=cookiemonster',
  })

  testHook(() => (param = useQueryParam('muppets')))

  expect(param).toEqual(['kermit', 'cookiemonster'])
})

test('handles no query params', () => {
  let param

  jsdom.reconfigure({
    url: 'http://test.com',
  })

  testHook(() => (param = useQueryParam('muppet')))

  expect(param).toEqual('')
})
