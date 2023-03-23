import { FC } from "react"
import { SearchIcon } from "./SearchIcon"
import { useSearchContext } from "../hooks/useSearchContext"


export const InputSearch:FC = () => {

  const { query, inputRef, isOpen, dispatcher } = useSearchContext()
  
  return (
    <div role="button">
      <input 
        type="text"
        id="query"
        ref={inputRef}
        value={query}
        onChange={(e) => dispatcher.setQuery(e.target.value) }
        onFocus={() => dispatcher.openInput()}
        onBlur={() => { query === '' && dispatcher.closeInput() }}
        className={`block px-2 h-10 rounded transition-all ${ isOpen ? 'w-48 md:w-60 bg-white' : 'w-8 bg-transparent' }`}
      />

      <label htmlFor="query" className="absolute top-0 right-0 w-8 h-10 flex justify-center items-center">
        <SearchIcon />
      </label>      
    </div>
  )
}
