import type { ReactNode, RefObject } from 'react'
import type { SearchState } from './reducer/searchReducer'

export interface ISearchContext extends SearchState {
  dispatcher: SearchDispatcher
  inputRef: RefObject<HTMLInputElement>
}

export interface SearchDispatcher {
  openInput: () => void
  closeInput: () => void
  setQuery: (value: string) => void
  setSelected: (value: number) => void
  incrementSelected: (length: number) => void
  decrementSelected: () => void
}

export interface ProviderProps {
  children: ReactNode
}
