import type { Asset, Exchange } from '@/interfaces/interfaces'
import { useGetAllExchangesQuery, useLazySearchAssetsByIdQuery } from '@/services/api'
import { useEffect, useRef, useState } from 'react'

export const useSearchData = (
  query: string
): {
  assets: Asset[]
  exchanges: Exchange[]
  isLoading: boolean
} => {
  const FETCH_DELAY = 300
  const RESULTS_LIMIT = 5

  // This is 'couse the coincap api does not allow search param in exchanges endpoint
  const [filteredExchanges, setFilteredExchanges] = useState<Exchange[]>([])
  const exchangesResult = useGetAllExchangesQuery()

  const [fetchAssets, assetsResult] = useLazySearchAssetsByIdQuery()

  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    clearTimeout(timer.current)
    if (query === '') return

    timer.current = setTimeout(() => {
      void fetchAssets({ query, limit: RESULTS_LIMIT })
      setFilteredExchanges(filterExchanges())
    }, FETCH_DELAY)
  }, [query])

  const filterExchanges = (): Exchange[] => {
    return query !== '' && exchangesResult.isSuccess
      ? exchangesResult.data?.data
          .filter(
            e => e.exchangeId.toLowerCase().includes(query.toLowerCase()) || e.name.toLowerCase().includes(query.toLowerCase())
          )
          .splice(0, RESULTS_LIMIT)
      : []
  }

  return {
    assets: assetsResult.data?.data ?? [],
    exchanges: filteredExchanges,
    isLoading: assetsResult.isLoading || exchangesResult.isLoading
  }
}
