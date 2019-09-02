import { useMemo } from 'react'
import { useQueryParams } from './useQueryParams'

export const useQueryParam = (param: string) => {
  const queryParams = useQueryParams()

  return useMemo(() => queryParams[param] || '', [queryParams])
}
