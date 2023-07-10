import { type FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SearchProvider } from './context/searchContext'
import { InputSearch } from './components/InputSearch'
import { SearchResults } from './components/ResultsList'
import { useSearchContext } from './hooks/useSearchContext'
import useOnClickOutside from '../../hooks/useOnClickOutside'

export const SearchBar: FC = () => {
  return (
    <SearchProvider>
      <Child />
    </SearchProvider>
  )
}

const Child: FC = () => {
  const { query, dispatcher } = useSearchContext()

  const ref = useOnClickOutside(() => {
    dispatcher.closeInput()
  })

  const location = useLocation()

  useEffect(() => {
    dispatcher.closeInput()
  }, [location])

  return (
    <div
      ref={ref}
      className='relative'
    >
      <InputSearch />

      {query !== '' && <SearchResults />}
    </div>
  )
}
