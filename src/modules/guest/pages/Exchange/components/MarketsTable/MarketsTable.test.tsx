import type { ExchangeMarket } from '@/types'
import { BrowserRouter } from 'react-router-dom'
import fakeData from '@/test/fakeData/fakeExchangeMarkets.json'
import { MarketsTable } from './MarketsTable'
import { getAllByRole, getByRole, render, screen } from '@testing-library/react'
import { COLUMN_HEADERS } from './constants'

const ASSETS_COUNT = 5
const fakeMarkets: ExchangeMarket[] = fakeData.slice(0, ASSETS_COUNT)

const Component = ({ markets }: { markets: ExchangeMarket[] }): JSX.Element => (
  <BrowserRouter>
    <MarketsTable markets={markets} />
  </BrowserRouter>
)

describe('MarketsTable component', () => {
  describe('When it mounts by default', () => {
    it('Should correctly render a row for every asset received by props', () => {
      render(<Component markets={fakeMarkets} />)
      const table = screen.getByRole('table', { name: /markets table/i })
      const rowGroups = getAllByRole(table, 'rowgroup')
      const { 1: tableBody } = rowGroups
      const rows = getAllByRole(tableBody, 'row')
      expect(rows.length).toBe(ASSETS_COUNT)
    })

    it('Should correctly render all column headers', () => {
      render(<Component markets={fakeMarkets} />)

      Object.keys(COLUMN_HEADERS).forEach(columnHeader => {
        expect(screen.getByRole('columnheader', { name: COLUMN_HEADERS[columnHeader] })).toBeInTheDocument()
      })
    })

    it('Should correctly render exchanges data in cells', () => {
      render(<Component markets={fakeMarkets} />)
      const table = screen.getByRole('table', { name: /markets table/i })
      const rowGroups = getAllByRole(table, 'rowgroup')
      const { 1: tableBody } = rowGroups
      const rows = getAllByRole(tableBody, 'row')

      rows.forEach((row, index) => {
        expect(
          getByRole(row, 'cell', { name: `${fakeMarkets.at(index)?.baseSymbol}/${fakeMarkets.at(index)?.quoteSymbol}` })
        ).toBeInTheDocument()
        expect(getByRole(row, 'cell', { name: String(Number(fakeMarkets.at(index)?.priceQuote)) })).toBeInTheDocument()
      })
    })

    it.only('Should correctly render formatted asset values', () => {
      const fakeMarket = {
        exchangeId: 'binance',
        rank: '4',
        baseSymbol: 'USDC',
        baseId: 'usd-coin',
        quoteSymbol: 'USDT',
        quoteId: 'tether',
        priceQuote: '0.9997000000000000',
        priceUsd: '0.9995828660898213',
        volumeUsd24Hr: '141528175.1626159212258812',
        percentExchangeVolume: '3.7966917707637790',
        tradesCount24Hr: '29508',
        updated: 1684753369194
      }
      const expectedPriceQuote = '0.9997'
      const expectedPriceUSD = '$1.00'
      const expectedVolume24hr = '$141.53m'
      const expectedPercentExchangeVolume = '3.80%'
      const expectedTradesCount24hr = '29,508'

      render(<Component markets={[fakeMarket]} />)

      expect(screen.getByRole('cell', { name: expectedPriceQuote })).toBeInTheDocument()
      expect(screen.getByRole('cell', { name: expectedPriceUSD })).toBeInTheDocument()
      expect(screen.getByRole('cell', { name: expectedVolume24hr })).toBeInTheDocument()
      expect(screen.getByRole('cell', { name: expectedPercentExchangeVolume })).toBeInTheDocument()
      expect(screen.getByRole('cell', { name: expectedTradesCount24hr })).toBeInTheDocument()
    })
  })
})
