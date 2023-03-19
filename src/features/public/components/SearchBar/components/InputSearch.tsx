import { FC, useContext, useEffect } from "react"
import { SearchIcon } from "./SearchIcon"
import { SearchResults } from "./SearchResults"
import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { useLocation } from "react-router-dom"
import { SearchContext } from "../context/searchContext"


export const InputSearch:FC = () => {

  const { inputRef, isOpen, query, dispatcher } = useContext(SearchContext);

  const location = useLocation()
  
  useEffect(() => dispatcher.closeInput() , [location])

  const ref = useOnClickOutside(() => dispatcher.closeInput())
  
  return (
    <div 
      role="button" 
      ref={ref}
      className="relative"
    >
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

      { query && <SearchResults /> }
    </div>
  )
}
