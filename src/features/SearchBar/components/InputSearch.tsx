import { type FC } from 'react'
import { SearchIcon } from './SearchIcon'
import { useSearchContext } from '../hooks/useSearchContext'

export const InputSearch: FC = () => {
  const { query, inputRef, isOpen, dispatcher } = useSearchContext()

  return (
    <div role='button'>
      <input
        type='text'
        id='query'
        ref={inputRef}
        value={query}
        onChange={e => {
          dispatcher.setQuery(e.target.value)
        }}
        onFocus={() => {
          dispatcher.openInput()
        }}
        onBlur={() => {
          query === '' && dispatcher.closeInput()
        }}
        className={`block h-10 rounded px-2 transition-all ${isOpen ? 'w-48 bg-white md:w-60' : 'w-8 bg-transparent'}`}
      />

      <label
        htmlFor='query'
        className='absolute top-0 right-0 flex h-10 w-8 items-center justify-center'
      >
        <SearchIcon />
      </label>
    </div>
  )
}
