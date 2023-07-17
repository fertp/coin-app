/* eslint-disable @typescript-eslint/promise-function-async */
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import fakeAssets from '@/test/fakeData/fakeAssets.json'
import fakeExchanges from '@/test/fakeData/fakeExchanges.json'
import fakeAssetHistory from '@/test/fakeData/fakeAssetHistory.json'
import fakeAssetMarkets from '@/test/fakeData/fakeAssetMarkets.json'
import { API_URL } from '@/data/constants'

const handlers = [
  /** getAssets */
  rest.get(`${API_URL}/assets`, (req, res, ctx) => {
    const limit = req.url.searchParams.get('limit')

    if (limit === null) {
      throw new Error('Search param "limit" is null.')
    }

    return res(ctx.json({ data: fakeAssets.slice(0, parseInt(limit)) }), ctx.delay(150))
  }),

  /** getAssetById */
  rest.get(`${API_URL}/assets/:id`, (req, res, ctx) => {
    const { id } = req.params
    const asset = fakeAssets.find(asset => asset.id === id)
    return res(ctx.json({ data: asset }), ctx.delay(150))
  }),

  /** getAssetHistory */
  rest.get(`${API_URL}/assets/:id/history`, (req, res, ctx) => {
    // const { id } = req.params
    return res(ctx.json({ data: fakeAssetHistory }), ctx.delay(150))
  }),

  /** getAssetMarkets */
  rest.get(`${API_URL}/assets/:id/markets`, (req, res, ctx) => {
    return res(ctx.json({ data: fakeAssetMarkets }), ctx.delay(150))
  }),

  /** getExchanges */
  rest.get(`${API_URL}/exchanges`, (req, res, ctx) => {
    const limit = req.url.searchParams.get('limit')

    if (limit === null) {
      throw new Error('Search param "limit" is null.')
    }

    return res(ctx.json({ data: fakeExchanges.slice(0, parseInt(limit)) }), ctx.delay(150))
  })
]

export const server = setupServer(...handlers)
