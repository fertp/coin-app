import type React from 'react'

export interface Route {
  path: string
  to: string | null
  Element: React.FC
  name: string
}

export interface Asset {
  id: string
  rank: string
  symbol: string
  name: string
  supply: string
  maxSupply: string
  marketCapUsd: string
  volumeUsd24Hr: string
  priceUsd: string
  changePercent24Hr: string
  vwap24Hr: string
  explorer: string
}

export interface AssetHistory {
  circulatingSupply: string
  date: string
  priceUsd: string
  time: number
}

export interface AssetMarket {
  eId: string
  baseSymbol: string
  exchangeId: string
  priceUsd: string
  quoteId: string
  quoteSymbol: string
  volumePercent: string
  volumeUsd24Hr: string
}

export interface ExchangeMarket {
  baseId: string
  baseSymbol: string
  exchangeId: string
  percentExchangeVolume: string
  priceQuote: string
  priceUsd: string
  quoteId: string
  quoteSymbol: string
  rank: string
  tradesCount24Hr: string
  updated: number
  volumeUsd24Hr: string
}

export interface Exchange {
  exchangeId: string
  exchangeUrl: string
  name: string
  percentTotalVolume: string
  rank: string
  socket: boolean
  tradingPairs: string
  updated: number
  volumeUsd: string
}
