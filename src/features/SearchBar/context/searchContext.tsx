import { type FC, createContext, useReducer, useRef } from 'react'
import { initialState, searchReducer } from '../reducer/searchReducer'
import type { ISearchContext, ProviderProps } from '../types'

export const SearchContext = createContext<ISearchContext | null>(null)

export const SearchProvider: FC<ProviderProps> = ({ children }) => {
  const [searchState, dispatch] = useReducer(searchReducer, initialState)

  const inputRef = useRef<HTMLInputElement>(null)

  const dispatcher = {
    openInput: () => {
      dispatch({ type: 'openInput' })
    },
    closeInput: () => {
      dispatch({ type: 'closeInput' })
    },
    setQuery: (value: string) => {
      dispatch({ type: 'setQuery', payload: { value } })
    },
    setSelected: (value: number) => {
      dispatch({ type: 'setSelected', payload: { value } })
    },
    decrementSelected: () => {
      dispatch({ type: 'decrementSelected' })
    },
    incrementSelected: (length: number) => {
      dispatch({ type: 'incrementSelected', payload: { length } })
    }
  }

  return (
    <SearchContext.Provider
      value={{
        ...searchState,
        inputRef,
        dispatcher
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
