import { useState, useMemo } from 'react'
import queryString from 'query-string'

export const useQueryParams = (): {
  [key: string]: string | string[] | null
} => {
  const [queryParams] = useState(() => {
    const params = queryString.parse(window.location.search)
    return params || {}
  })

  return useMemo(() => queryParams, [queryParams])
}
