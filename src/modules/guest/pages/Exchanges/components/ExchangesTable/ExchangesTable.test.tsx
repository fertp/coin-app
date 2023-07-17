import type { Exchange } from '@/types'
import fakeData from '@/test/fakeData/fakeExchanges.json'
import { getAllByRole, getByRole, render, screen } from '@testing-library/react'
import { ExchangesTable } from './ExchangesTable'
import { BrowserRouter } from 'react-router-dom'
import { COLUMN_HEADERS } from './constants'

const ASSETS_COUNT = 5
const fakeExchanges: Exchange[] = fakeData.slice(0, ASSETS_COUNT)

const Component = ({ exchanges }: { exchanges: Exchange[] }): JSX.Element => (
  <BrowserRouter>
    <ExchangesTable exchanges={exchanges} />
  </BrowserRouter>
)

describe('ExchangesTable component', () => {
  describe('When it mounts by default', () => {
    it('Should correctly render a row for every asset received by props', () => {
      render(<Component exchanges={fakeExchanges} />)
      const table = screen.getByRole('table', { name: /exchanges list/i })
      const rowGroups = getAllByRole(table, 'rowgroup')
      const { 1: tableBody } = rowGroups
      const rows = getAllByRole(tableBody, 'row')
      expect(rows.length).toBe(ASSETS_COUNT)
    })

    it('Should correctly render all column headers', () => {
      render(<Component exchanges={fakeExchanges} />)

      Object.keys(COLUMN_HEADERS).forEach(columnHeader => {
        expect(screen.getByRole('columnheader', { name: COLUMN_HEADERS[columnHeader] })).toBeInTheDocument()
      })
    })

    it('Should correctly render exchanges data in cells', () => {
      render(<Component exchanges={fakeExchanges} />)
      const table = screen.getByRole('table', { name: /exchanges list/i })
      const rowGroups = getAllByRole(table, 'rowgroup')
      const { 1: tableBody } = rowGroups
      const rows = getAllByRole(tableBody, 'row')

      rows.forEach((row, index) => {
        expect(getByRole(row, 'cell', { name: fakeExchanges.at(index)?.rank })).toBeInTheDocument()
        expect(getByRole(row, 'link', { name: fakeExchanges.at(index)?.name })).toBeInTheDocument()
        expect(getByRole(row, 'cell', { name: fakeExchanges.at(index)?.tradingPairs })).toBeInTheDocument()
      })
    })

    it('Should correctly render formatted asset values', () => {
      const fakeExchange = {
        exchangeId: 'tidex',
        name: 'Tidex',
        rank: '13',
        percentTotalVolume: '1.373122302804002776000000000000000000',
        volumeUsd: '305451597.8992625785647561',
        tradingPairs: '21',
        socket: false,
        exchangeUrl: 'https://tidex.com/',
        updated: 1689380116901
      }
      const expectedVolumeUSD = '$305.45m'
      const expectedPercentTotalVolume = '1.37%'

      render(<Component exchanges={[fakeExchange]} />)

      expect(screen.getByRole('cell', { name: expectedVolumeUSD }))
      expect(screen.getByRole('cell', { name: expectedPercentTotalVolume }))
    })

    it('Should render a button link to navigate to an exchange details page', () => {
      const exchange = fakeExchanges[0]

      render(<Component exchanges={[exchange]} />)
      screen.debug()
      const linkButton = screen.getByRole('link', { name: `Go to ${exchange.name} page` })
      expect(linkButton).toBeInTheDocument()
      expect(linkButton).toHaveAttribute('href', `/exchanges/${exchange.exchangeId}`)
    })
  })
})
