import { useQueryParams } from './useQueryParams'

export const useQueryParam = (param: string) => {
  const queryParams = useQueryParams()

  return queryParams[param] || ''
}
