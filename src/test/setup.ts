import '@testing-library/jest-dom'
import { fetch, Headers, Request, Response } from 'cross-fetch'
import { server } from './mock/server'

global.fetch = fetch
global.Headers = Headers
global.Request = Request
global.Response = Response

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
