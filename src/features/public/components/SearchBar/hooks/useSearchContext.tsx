import { useContext } from "react"
import { SearchContext } from "../context/searchContext"

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!Object.keys(context).length) throw new Error(`useSearchContext must be used within SearchProvider`)
  return context;
}