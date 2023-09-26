import type { RenderResult } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Exchange } from './Exchange'
import { act, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { server } from '@/test/mock/server'
import { rest } from 'msw'
import { API_URL } from '@/data/constants'
import fakeExchanges from '@/test/fakeData/fakeExchanges.json'
import { renderWithProviders } from '@/test/renderWithProviders'

const fakeExchange = fakeExchanges[0]

const Component = (): JSX.Element => {
  const route = `/exchanges/${fakeExchange?.exchangeId}`
  return (
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route
          path='exchanges/:id'
          element={<Exchange />}
        />
      </Routes>
    </MemoryRouter>
  )
}

const renderByDefault = async (): Promise<RenderResult> => {
  let wrapper
  await act(async () => {
    wrapper = renderWithProviders(<Component />)
  })

  if (wrapper === undefined) throw new Error('Component could not be rendered')

  return wrapper
}

describe('Exchange page', () => {
  describe('When the request is failed', () => {
    it('Should display an error message', async () => {
      server.use(
        rest.get(`${API_URL}/exchanges/:id`, (req, res, ctx) => {
          res.networkError('Failed to connect')
        }),

        rest.get(`${API_URL}/markets`, (req, res, ctx) => {
          res.networkError('Failed to connect')
        })
      )

      const errorMessage = /Ups, an error has ocurred!/i
      await renderByDefault()
      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument()
      })
    })
  })

  describe('When it mounts by default with a valid id param', () => {
    it('Should render correctly and display a spinner while fetching the data', async () => {
      const { container } = await renderByDefault()

      const spinner = screen.getByRole('status', { name: /loading/i })
      await waitForElementToBeRemoved(spinner)

      expect(container).toMatchSnapshot()
    })

    it('Should render correctly all exchange details', async () => {
      const expectedExchangeVolume24hs = '$454,196,241'

      await renderByDefault()

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: fakeExchange.name, level: 1 })).toBeInTheDocument()
        expect(screen.getByText(fakeExchange.rank)).toBeInTheDocument()
        expect(screen.getByText(fakeExchange.tradingPairs)).toBeInTheDocument()
        expect(screen.getByText(expectedExchangeVolume24hs)).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /website/i })).toBeInTheDocument()
        expect(screen.getByRole('table', { name: /markets table/i })).toBeInTheDocument()
      })
    })
  })
})
