import { useContext } from 'react'
import type { ISearchContext } from '../types'
import { SearchContext } from '../context/searchContext'

export const useSearchContext = (): ISearchContext => {
  const context = useContext(SearchContext)
  if (context === null) throw new Error(`useSearchContext must be used within SearchProvider`)
  return context
}
