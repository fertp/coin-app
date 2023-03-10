import { Asset, AssetHistory, AssetMarket, Exchange, ExchangeMarket } from "@/interfaces/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL as url } from '@/data/constants';
import { getHistoryParams, timeRange } from "@/features/public/pages/Coin/utils/timeRange";


export const coincapApi = createApi({
  reducerPath: 'coincapApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: url 
  }),
  tagTypes: ['Assets', 'Exchanges'],
  endpoints: (builder) => ({
    getAssets: builder.query<{ data: Asset[] }, number>({
      query: (limit) => `/assets?offset=0&limit=${limit}`,
      providesTags: ['Assets']
    }),


    getAssetById: builder.query<{ data: Asset }, string>({
      query: (id) => `/assets/${id}`,      
    }),

    getAssetHistory: builder.query<{ data: AssetHistory[] }, { id: string, timeRange: timeRange }>({
      query: ({ id, timeRange }) => {
        const { interval, start, end } = getHistoryParams(timeRange)
        return `/assets/${id}/history?interval=${interval}&start=${start}&end=${end}`
      }
    }),

    getAssetMarkets: builder.query<{ data: AssetMarket[] }, { id: string, limit: number}>({
      query: ({ id, limit }) => `/assets/${id}/markets?limit=${limit}`
    }),

    getExchanges: builder.query<{ data: Exchange[] }, number>({
      query: (limit) => `/exchanges?offset=0&limit=${limit}`,
      providesTags: ['Exchanges']
    }),

    getExcahngeById: builder.query<{ data: Exchange }, string>({
      query: (id) => `/exchanges/${id}`
    }),

    getExchangeMarkets: builder.query<{ data: ExchangeMarket[] }, string>({
      query: (id) => `/markets?exchangeId=${id}&offset=0&limit=20`
    })
  })
})

export const { 
  useGetAssetsQuery,
  useGetAssetByIdQuery,
  useGetAssetHistoryQuery,
  useGetAssetMarketsQuery,
  useGetExchangesQuery,
  useGetExcahngeByIdQuery,
  useGetExchangeMarketsQuery
} = coincapApi
