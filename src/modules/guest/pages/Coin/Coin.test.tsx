import type { RenderResult } from '@testing-library/react'
import { vi } from 'vitest'
import { API_URL } from '@/data/constants'
import { server } from '@/test/mock/server'
import {
  act,
  getAllByRole,
  getByRole,
  getByText,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { rest } from 'msw'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Coin } from './Coin'
import { store } from '@/app/store'
import fakeData from '@/test/fakeData/fakeAssets.json'
import fakeAssetMarkets from '@/test/fakeData/fakeAssetMarkets.json'
import { Line } from 'react-chartjs-2'
import userEvent from '@testing-library/user-event'

const fakeAsset = fakeData[0]

const Component = (): JSX.Element => {
  const route = `/coins/${fakeAsset?.id}`

  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route
            path='/coins/:id'
            element={<Coin />}
          />
        </Routes>
      </MemoryRouter>
    </Provider>
  )
}

const renderByDefault = async (): Promise<RenderResult> => {
  let wrapper
  await act(async () => {
    wrapper = render(<Component />)
  })

  if (wrapper === undefined) throw new Error('Component could not be rendered')

  return wrapper
}

describe('Coin page', () => {
  describe('When the request is failed', () => {
    /**
     * Have no idea what happen with this one.
     * It keeps setted the error handler for other tests.
     * Really weird.
     */
    it('Should display an error message', async () => {
      server.use(
        rest.get(`${API_URL}/assets/:id`, (req, res, ctx) => {
          res.networkError('Failed to connect')
        })
      )

      const errorMessage = /asset not found/i
      await renderByDefault()
      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument()
      })
      server.resetHandlers()
    })
  })

  describe('When it mounts by default with a valid id param', () => {
    it('Should render correctly and display a spinner while fetching the data', async () => {
      const { container } = await renderByDefault()

      const spinner = screen.getByRole('status', { name: /loading/i })
      await waitForElementToBeRemoved(spinner)

      expect(container).toMatchSnapshot()
    })

    it('Should render correctly all asset details', async () => {
      vi.mock('react-chartjs-2')
      if ('render' in Line) {
        ;(Line.render as jest.Mock).mockImplementation((props: { 'aria-label': string }) => (
          <img
            src='canvas'
            alt={props['aria-label']}
          />
        ))
      }

      await renderByDefault()

      await waitFor(() => {
        expect(screen.getByAltText(fakeAsset.name)).toBeInTheDocument()
        const heading = screen.getByRole('heading', { level: 1 })
        expect(heading).toHaveTextContent(`${fakeAsset.name} (${fakeAsset.symbol})`)
        expect(screen.getByRole('list', { name: `${fakeAsset.name} stats` })).toBeInTheDocument()
        expect(screen.getByAltText(/last day asset history chart/i)).toBeInTheDocument()
        expect(screen.getByRole('generic', { name: /select an intervaL/i })).toBeInTheDocument()
        expect(screen.getByRole('table', { name: /markets table/i })).toBeInTheDocument()
      })
    })

    it('Should display correctly formatted asset stats', async () => {
      const expectedAssetStats = {
        rank: '101',
        price: '$15.23',
        high: '$15.53',
        low: '$15.11',
        average: '$15.34',
        change: '-0.75%'
      }

      await renderByDefault()

      const stats = screen.getByRole('list', { name: `${fakeAsset.name} stats` })

      Object.keys(expectedAssetStats).forEach(key => {
        expect(getByText(stats, expectedAssetStats[key as keyof typeof expectedAssetStats])).toBeInTheDocument()
      })
    })

    it('Should render correctly a table with all fetched asset markets', async () => {
      await renderByDefault()
      const marketsTable = screen.getByRole('table', { name: /markets table/i })
      const { 1: tableBody } = getAllByRole(marketsTable, 'rowgroup')
      const rows = getAllByRole(tableBody, 'row')
      expect(rows.length).toBe(fakeAssetMarkets.length)
    })

    describe('When user clicks on time range buttons', () => {
      it('Should render an image with corresponding time range history chart', async () => {
        await renderByDefault()
        const buttons = screen.getByRole('generic', { name: /select an interval/i })

        expect(screen.getByRole('img', { name: /last day asset history chart/i })).toBeInTheDocument()

        await userEvent.click(getByRole(buttons, 'button', { name: /last week/i }))
        expect(screen.getByRole('img', { name: /last week asset history chart/i })).toBeInTheDocument()

        await userEvent.click(getByRole(buttons, 'button', { name: /last month/i }))
        expect(screen.getByRole('img', { name: /last month asset history chart/i })).toBeInTheDocument()

        await userEvent.click(getByRole(buttons, 'button', { name: /last six months/i }))
        expect(screen.getByRole('img', { name: /last six months asset history chart/i })).toBeInTheDocument()

        await userEvent.click(getByRole(buttons, 'button', { name: /last year/i }))
        expect(screen.getByRole('img', { name: /last year asset history chart/i })).toBeInTheDocument()
        // screen.debug()
      })
    })
  })
})
