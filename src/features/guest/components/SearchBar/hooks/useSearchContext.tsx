import { useContext } from 'react'
import type { ISearchContext } from '../interfaces'
import { SearchContext } from '../context/searchContext'

export const useSearchContext = (): ISearchContext => {
  const context = useContext(SearchContext)
  if (Object.keys(context).length === 0) throw new Error(`useSearchContext must be used within SearchProvider`)
  return context
}
