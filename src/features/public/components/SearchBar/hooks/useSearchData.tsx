import { useGetAllExchangesQuery, useLazySearchAssetsByIdQuery } from "@/services/api";
import { useEffect, useRef } from "react";

export const useSearchData = (query: string) => {

  const FETCH_DELAY = 300
  const RESULTS_LIMIT = 5

  const [ fetchAssets, assetsResult ] = useLazySearchAssetsByIdQuery();
  // This is 'couse the coincap api does not allow search param in exchanges endpoint
  const exchangesResult = useGetAllExchangesQuery()

  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    clearTimeout(timer.current)

    if (query === '') return;

    timer.current = setTimeout(() => {
      fetchAssets({ query, limit: RESULTS_LIMIT });

      
    }, FETCH_DELAY)
  }, [query])

  const filteredExchanges = query ? exchangesResult.data?.data.filter(e => (
      e.exchangeId.toLowerCase().includes(query.toLowerCase()) ||
      e.name.toLowerCase().includes(query.toLowerCase())
    )).splice(0, RESULTS_LIMIT) : [];

  return {
    assets: assetsResult.data?.data,
    exchanges: filteredExchanges,
    isLoading: assetsResult.isLoading || exchangesResult.isLoading
  }
}