import { useState } from 'react'
import queryString from 'query-string'

export const useQueryParams = (): {
  [key: string]: string | string[] | undefined
} => {
  const [queryParams] = useState(() => {
    const params = queryString.parse(window.location.search)
    return params || {}
  })

  return queryParams
}
