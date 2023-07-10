import type { Asset, Exchange } from '@/types'
import { useLazyGetAllExchangesQuery, useLazySearchAssetsByIdQuery } from '@/services/api'
import { useEffect, useRef } from 'react'

export const useSearchData = (
  query: string
): {
  assets: Asset[]
  exchanges: Exchange[]
  isLoading: boolean
} => {
  const FETCH_DELAY = 300
  const RESULTS_LIMIT = 5

  const [fetchAssets, assetsResult] = useLazySearchAssetsByIdQuery()
  const [fetchAllExchanges, exchangesResult] = useLazyGetAllExchangesQuery()

  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    clearTimeout(timer.current)
    if (query === '') return

    timer.current = setTimeout(() => {
      void fetchAssets({ query, limit: RESULTS_LIMIT })
      if (!exchangesResult.isSuccess) {
        void fetchAllExchanges()
      }
    }, FETCH_DELAY)
  }, [query])

  const filterExchanges = (allExchanges: Exchange[]): Exchange[] => {
    return allExchanges
      .filter(
        e => e.exchangeId.toLowerCase().includes(query.toLowerCase()) || e.name.toLowerCase().includes(query.toLowerCase())
      )
      .splice(0, RESULTS_LIMIT)
  }

  return {
    assets: assetsResult.data?.data ?? [],
    exchanges: filterExchanges(exchangesResult.data?.data ?? []),
    isLoading: assetsResult.isLoading || exchangesResult.isLoading
  }
}
