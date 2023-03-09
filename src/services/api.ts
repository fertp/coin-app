import { Asset, AssetHistory, Market } from "@/interfaces/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL as url } from '@/data/constants';
import { getHistoryParams, historyTime } from "@/features/public/utils/getHistoryParams";


export const coincapApi = createApi({
  reducerPath: 'coincapApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: url 
  }),
  tagTypes: ['Assets'],
  endpoints: (builder) => ({
    getAssets: builder.query<{ data: Asset[] }, number>({
      query: (limit) => `/assets?offset=0&limit=${limit}`,
      providesTags: ['Assets']
    }),
    getAssetById: builder.query<{ data: Asset }, string>({
      query: (id) => `/assets/${id}`,      
    }),
    getAssetHistory: builder.query<{ data: AssetHistory[] }, { id: string, time: historyTime }>({
      query: ({ id, time }) => {
        const { interval, start, end } = getHistoryParams(time)
        return `/assets/${id}/history?interval=${interval}&start=${start}&end=${end}`
      }
    }),
    getAssetMarkets: builder.query<{ data: Market[] }, { id: string, limit: number}>({
      query: ({ id, limit }) => `/assets/${id}/markets?limit=${limit}`
    })
  })
})

export const { 
  useGetAssetsQuery,
  useGetAssetByIdQuery,
  useGetAssetHistoryQuery,
  useGetAssetMarketsQuery
} = coincapApi
