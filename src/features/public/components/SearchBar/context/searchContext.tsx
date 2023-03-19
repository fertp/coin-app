import { FC, ReactNode, RefObject, createContext, useReducer, useRef } from "react";
import { SearchState, initialState, searchReducer } from "../reducer/searchReducer";

interface SearchContext extends SearchState {
  dispatcher: SearchDispatcher
  inputRef: RefObject<HTMLInputElement>
}

interface SearchDispatcher {
  openInput: () => void 
  closeInput: () => void 
  setQuery: (value: string) => void 
  setSelected: (value: number) => void
  incrementSelected: (length: number) => void
  decrementSelected: () => void
}

interface ProviderProps {
  children: ReactNode | ReactNode[]
}

export const SearchContext = createContext({} as SearchContext)

export const SearchProvider:FC<ProviderProps> = ({ children }) => {

  const [ searchState, dispatch ] = useReducer(searchReducer, initialState);

  const inputRef = useRef<HTMLInputElement>(null)

  const dispatcher = {
    openInput: () => dispatch({ type: 'openInput' }),
    closeInput: () => dispatch({ type: 'closeInput' }),
    setQuery: (value: string) => dispatch({ type: 'setQuery', payload: { value } }),
    setSelected: (value: number) => dispatch({ type: 'setSelected', payload: { value } }),
    decrementSelected: () => dispatch({ type: 'decrementSelected' }),
    incrementSelected: (length: number) => dispatch({ type: 'incrementSelected', payload: { length } })
  }

  return (
    <SearchContext.Provider value={{
      ...searchState,
      inputRef,
      dispatcher
    }}>
      { children }
    </SearchContext.Provider>
  )
}
