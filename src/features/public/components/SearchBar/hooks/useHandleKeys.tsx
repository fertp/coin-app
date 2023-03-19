import { useContext, useEffect } from "react"
import { SearchContext } from "../context/searchContext"
import { useNavigate } from "react-router-dom";

interface Args {
  current: ({ index: number; to: string; name: string; } | undefined)[]
}

export const useHandleKeys = (indexesListRef: Args) => {

  const navigate = useNavigate();

  const { selected, dispatcher, inputRef } = useContext(SearchContext)

  useEffect(() => {
    const handleKeyDown = (e:KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        dispatcher.decrementSelected()
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        dispatcher.incrementSelected(indexesListRef.current.length)
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        const option = indexesListRef.current[selected]; 
        if (option?.to) {
          navigate(option.to)
          dispatcher.setSelected(-1)
          inputRef.current?.blur()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    
    return () => { window.removeEventListener('keydown', handleKeyDown); }
  }, [selected])
}
