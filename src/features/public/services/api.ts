import { API_URL as url } from '@/data/constants'

export const getAssets = ({ page, signal }:{ page: number, signal: AbortSignal }) => {

  const offset = page * 20

  return fetch(`${url}/assets?offset=${offset}&limit=20`, { signal })
    .then(res => { 
      if (res.status !== 200) throw new Error('Response status code not 200')
      return res.json()
    })
    .then(res => res.data)
}

export const getAssetById = ({ id, signal }:{ id: string, signal: AbortSignal }) => {
  return fetch(`${url}/assets/${id}`, { signal })
    .then(res => { 
      if (res.status !== 200) throw new Error('Response status code not 200')
      return res.json()
    })
    .then(res => res.data)
}

export const getAssetHistory = ({ id, signal }:{ id: string, signal: AbortSignal }) => {
  const now = new Date()
  const end = now.getTime()
  now.setDate(now.getDate() - 1)
  const start = now.getTime()

  return fetch(`${url}/assets/${id}/history?interval=h1&start=${start}&end=${end}`, { signal })
    .then(res => { 
      if (res.status !== 200) throw new Error('Response status code not 200')
      return res.json()
    })
    .then(res => res.data)
}

export const getMarkets = ({ id, signal }:{ id: string, signal: AbortSignal }) => {
  const limit = 10

  return fetch(`${url}/assets/${id}/markets?limit=${limit}`, { signal })
    .then(res => {
      if (res.status !== 200) throw new Error('Response status code not 200')
      return res.json()
    })
    .then(res => res.data)
}

export const getExchange = ({ id }:{ id: string }) => {
  return fetch(`${url}/exchanges/${id}`)
  .then(res => res.json())
  .then(res => res.data)
}
