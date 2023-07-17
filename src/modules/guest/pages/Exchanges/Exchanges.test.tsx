import { API_URL } from '@/data/constants'
import { server } from '@/test/mock/server'
import { rest } from 'msw'
import { Exchanges } from './Exchanges'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import {
  act,
  render,
  waitFor,
  type RenderResult,
  screen,
  waitForElementToBeRemoved,
  getAllByRole
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const Component = (): JSX.Element => (
  <Provider store={store}>
    <BrowserRouter>
      <Exchanges />
    </BrowserRouter>
  </Provider>
)

const renderByDefault = async (): Promise<RenderResult> => {
  let wrapper
  await act(async () => {
    wrapper = render(<Component />)
  })

  if (wrapper === undefined) throw new Error('Component could not be rendered')

  return wrapper
}

const renderAndClickViewMoreButton = async (): Promise<void> => {
  await act(async () => {
    render(<Component />)
  })
  await screen.findByRole('table', { name: /exchanges list/i })
  await userEvent.click(screen.getByRole('button', { name: /view more/i }))
}

describe('Exchanges page', () => {
  describe('When the request is failed', () => {
    it('Should display an error message', async () => {
      server.use(
        rest.get(`${API_URL}/exchanges`, (req, res, ctx) => {
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
      expect(screen.getByRole('button', { name: /view more/i })).toBeInTheDocument()
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

    /** @todo Fix this test */
    it('Should display the "view more" button again, when new assets have been fetched', async () => {
      await renderAndClickViewMoreButton()
      // expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument()
      await waitFor(() => {
        expect(screen.queryByRole('status', { name: /loading/i })).not.toBeInTheDocument()
      })
      expect(screen.getByRole('button', { name: /view more/i })).toBeInTheDocument()
    })

    /** @todo Fix this test */
    it('Should fetch twenty new assets, hide spinner and render new ones below the initial ones', async () => {
      await renderAndClickViewMoreButton()
      // expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument()
      await waitFor(() => {
        expect(screen.queryByRole('status', { name: /loading/i })).not.toBeInTheDocument()
      })
      const table = screen.getByRole('table', { name: /exchanges list/i })
      const rows = getAllByRole(table, 'row')
      expect(rows.length).toBe(40 + 1)
    })
  })
})
