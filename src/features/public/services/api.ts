import { API_URL as url } from '@/data/constants'

const getAssets = ({ page, signal }:{ page: number, signal: AbortSignal }) => {

  const offset = page * 20

  return fetch(`${url}/assets?offset=${offset}&limit=20`, { signal })
    .then(res => res.json())
    .then(res => res.data)
}

const getAsset = ({ id }:{ id: string }) => {
  return fetch(`${url}/assets/${id}`)
    .then(res => res.json())
    .then(res => res.data)
}

const getAssetHistory = ({ id }:{ id: string }) => {
  const now = new Date()
  const end = now.getTime()
  now.setDate(now.getDate() - 1)
  const start = now.getTime()

  return fetch(`${url}/assets/${id}/history?interval=h1&start=${start}&end=${end}`)
    .then(res => res.json())
    .then(res => res.data)
}

const getMarkets = ({ id }:{ id: string }) => {
  return fetch(`${url}/assets/${id}/markets?limit=5`)
    .then(res => res.json())
    .then(res => res.data)
}

const getExchange = ({ id }:{ id: string }) => {
  return fetch(`${url}/exchanges/${id}`)
  .then(res => res.json())
  .then(res => res.data)
}

export {
  getAssets,
  getAsset,
  getMarkets,
  getExchange,
  getAssetHistory
}