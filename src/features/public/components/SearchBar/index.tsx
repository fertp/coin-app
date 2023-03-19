import { FC } from "react"
import { SearchProvider } from "./context/searchContext"
import { InputSearch } from "./components/InputSearch"

export const SearchBar:FC = () => {
  return (
    <SearchProvider>
      <InputSearch />
    </SearchProvider>
  )
}