import type { RenderResult } from '@testing-library/react'
import { act, getAllByRole, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { Home } from './Home'
import { rest } from 'msw'
import { API_URL } from '@/data/constants'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { server } from '@/test/mock/server'
import { renderWithProviders } from '@/test/renderWithProviders'

const Component = (): JSX.Element => (
  <BrowserRouter>
    <Home />
  </BrowserRouter>
)

const renderByDefault = async (): Promise<RenderResult> => {
  let wrapper
  await act(async () => {
    wrapper = renderWithProviders(<Component />)
  })

  if (wrapper === undefined) throw new Error('Component could not be rendered')

  return wrapper
}

const renderAndClickViewMoreButton = async (): Promise<void> => {
  await act(async () => {
    renderWithProviders(<Component />)
  })
  await screen.findByRole('table', { name: /assets list/i })
  await userEvent.click(screen.getByRole('button', { name: /view more/i }))
}

describe('Home page', () => {
  describe('When the request is failed', () => {
    it('Should display an error message', async () => {
      server.use(
        rest.get(`${API_URL}/assets`, (req, res, ctx) => {
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

  describe('When it mounts by default', () => {
    it('Should display a loading spinner while data is fetched then render correctly', async () => {
      const { container } = await renderByDefault()
      await waitForElementToBeRemoved(screen.getByRole('status', { name: /loading/i }))
      expect(container).toMatchSnapshot()
    })

    it('Should render a table with twenty asset rows', async () => {
      await renderByDefault()

      const table = await screen.findByRole('table')
      const rows = getAllByRole(table, 'row')
      expect(rows.length).toBe(20 + 1)
    })

    it('Should render a button with "view more" text', async () => {
      await renderByDefault()
      expect(await screen.findByRole('button', { name: /view more/i })).toBeInTheDocument()
    })
  })

  describe('When the user clicks on the "view more" button', () => {
    it('Should hide "view more" button', async () => {
      await renderAndClickViewMoreButton()
      expect(screen.queryByRole('button', { name: /view more/i })).not.toBeInTheDocument()
    })

    it('Should display a loading spinner', async () => {
      await renderAndClickViewMoreButton()
      expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument()
    })

    it('Should display the "view more" button again, when new assets have been fetched', async () => {
      await renderAndClickViewMoreButton()
      await waitForElementToBeRemoved(() => screen.queryByRole('status', { name: /loading/i }))
      expect(screen.getByRole('button', { name: /view more/i })).toBeInTheDocument()
    })

    /** @todo Fix this test */
    it('Should fetch twenty new assets, hide spinner and render new ones below the initial ones', async () => {
      await renderAndClickViewMoreButton()
      await waitForElementToBeRemoved(() => screen.queryByRole('status', { name: /loading/i }))
      const table = screen.getByRole('table', { name: /assets list/i })
      const rows = getAllByRole(table, 'row')
      expect(rows.length).toBe(40 + 1)
    })
  })
})
