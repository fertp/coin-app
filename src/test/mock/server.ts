/* eslint-disable @typescript-eslint/promise-function-async */
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import fakeAssets from '@/test/fakeData/fakeAssets.json'
import fakeAssetHistory from '@/test/fakeData/fakeAssetHistory.json'
import fakeAssetMarkets from '@/test/fakeData/fakeAssetMarkets.json'
import fakeExchanges from '@/test/fakeData/fakeExchanges.json'
import fakeExchangeMarkets from '@/test/fakeData/fakeExchangeMarkets.json'
import { API_URL } from '@/data/constants'

const REQUEST_DELAY = 150

const handlers = [
  /** getAssets */
  rest.get(`${API_URL}/assets`, (req, res, ctx) => {
    const limit = req.url.searchParams.get('limit')

    if (limit === null) {
      throw new Error('Search param "limit" is null.')
    }

    return res(ctx.json({ data: fakeAssets.slice(0, parseInt(limit)) }), ctx.delay(REQUEST_DELAY))
  }),

  /** getAssetById */
  rest.get(`${API_URL}/assets/:id`, (req, res, ctx) => {
    const { id } = req.params
    const asset = fakeAssets.find(asset => asset.id === id)
    return res(ctx.json({ data: asset }), ctx.delay(REQUEST_DELAY))
  }),

  /** getAssetHistory */
  rest.get(`${API_URL}/assets/:id/history`, (req, res, ctx) => {
    // const { id } = req.params
    return res(ctx.json({ data: fakeAssetHistory }), ctx.delay(REQUEST_DELAY))
  }),

  /** getAssetMarkets */
  rest.get(`${API_URL}/assets/:id/markets`, (req, res, ctx) => {
    return res(ctx.json({ data: fakeAssetMarkets }), ctx.delay(REQUEST_DELAY))
  }),

  /** getExchanges */
  rest.get(`${API_URL}/exchanges`, (req, res, ctx) => {
    const limit = req.url.searchParams.get('limit')

    if (limit === null) {
      throw new Error('Search param "limit" is null.')
    }

    return res(ctx.json({ data: fakeExchanges.slice(0, parseInt(limit)) }), ctx.delay(REQUEST_DELAY))
  }),

  /** getExchangeById */
  rest.get(`${API_URL}/exchanges/:id`, (req, res, ctx) => {
    const { id } = req.params
    const exchange = fakeExchanges.find(exchange => exchange.exchangeId === id)
    return res(ctx.json({ data: exchange }), ctx.delay(REQUEST_DELAY))
  }),

  /** getExchangeMarkets */
  rest.get(`${API_URL}/markets`, (req, res, ctx) => {
    return res(ctx.json({ data: fakeExchangeMarkets }), ctx.delay(REQUEST_DELAY))
  }),

  /** ws:prices */
  /** @todo Implement mock-socket */
  rest.get('https://ws.coincap.io/prices', (_, res, ctx) => {
    res.networkError('Error')
  })
]

export const server = setupServer(...handlers)
