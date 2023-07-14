import { rest } from 'msw'
import { setupServer } from 'msw/node'
import fakeAssets from '@/test/fakeData/fakeAssets.json'
import { API_URL } from '@/data/constants'

const handlers = [
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  rest.get(`${API_URL}/assets`, (req, res, ctx) => {
    const limit = req.url.searchParams.get('limit')

    if (limit === null) {
      throw new Error('Search param "limit" is null.')
    }

    return res(ctx.json({ data: fakeAssets.slice(0, parseInt(limit)) }), ctx.delay(150))
  })
]

export const server = setupServer(...handlers)
