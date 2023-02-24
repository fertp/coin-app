import React from "react"

export interface Route {
  path: string
  to: string | null
  Element: React.FC
  name: string
}

export interface Asset {
  id:	string
  rank:	string
  symbol:	string
  name:	string
  supply:	string
  maxSupply:	string
  marketCapUsd:	string
  volumeUsd24Hr:	string
  priceUsd:	string
  changePercent24Hr:	string
  vwap24Hr:	string
  explorer:	string
}