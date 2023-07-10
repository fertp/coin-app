import { type FC, useRef } from 'react'
import { useSearchData } from '../hooks/useSearchData'
import { ResultItem } from './ResultItem'
import { useHandleKeys } from '../hooks/useHandleKeys'
import { useSearchContext } from '../hooks/useSearchContext'

export const SearchResults: FC = () => {
  const { query } = useSearchContext()

  const indexesListRef = useRef<Array<{ index: number; to: string; name: string } | undefined>>([])

  const { assets, exchanges, isLoading } = useSearchData(query)

  let index = 0
  const assetsResults = assets?.map(a => ({
    index: index++,
    to: `/coins/${a.id}`,
    name: a.name
  }))
  const exchangesResults = exchanges?.map(e => ({
    index: index++,
    to: `/exchanges/${e.exchangeId}`,
    name: e.name
  }))

  indexesListRef.current = [assetsResults, exchangesResults].flat()

  useHandleKeys(indexesListRef)

  return (
    <div className='absolute top-full left-0 mt-1 w-full border bg-white shadow shadow-[rgba(0,0,0,0.25)]'>
      {!(assets == null) && assets?.length > 0 && !isLoading && (
        <div>
          <b className='px-2 py-2 text-orange-500'>Assets:</b>

          {assetsResults?.map(a => (
            <ResultItem
              key={a.name}
              {...a}
            >
              {a.name}
            </ResultItem>
          ))}
        </div>
      )}

      {!(assets == null) && assets?.length > 0 && exchanges?.length > 0 && <hr />}

      {exchanges?.length > 0 && !isLoading && (
        <div>
          <b className='px-2 py-2 text-orange-500'>Exchanges:</b>

          {exchangesResults?.map(e => (
            <ResultItem
              key={e.name}
              {...e}
            >
              {e.name}
            </ResultItem>
          ))}
        </div>
      )}
    </div>
  )
}
