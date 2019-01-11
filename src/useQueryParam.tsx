import { useState } from 'react'
import queryString from 'query-string'

export const useQueryParam = (param: string) => {
  const [queryParam] = useState(() => {
    const params = queryString.parse(window.location.search)
    return params[param] || ''
  })

  return queryParam
}
