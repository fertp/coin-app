import type { Asset } from '@/types'
import fakeData from '@/test/fakeData/fakeAssets.json'
import { getAllByRole, getByRole, render, screen } from '@testing-library/react'
import { AssetsTable } from './AssetsTable'
import { BrowserRouter } from 'react-router-dom'
import { COLUMN_HEADERS } from './constants'
import userEvent from '@testing-library/user-event'

const ASSETS_COUNT = 5
const fakeAssets: Asset[] = fakeData.slice(0, ASSETS_COUNT)

const Component = ({ assets }: { assets: Asset[] }): JSX.Element => (
  <BrowserRouter>
    <AssetsTable assets={assets} />
  </BrowserRouter>
)

describe('AssetsTable component', () => {
  describe('When it mounts by default', () => {
    it('Should correctly render a row for every asset received by props', () => {
      render(<Component assets={fakeAssets} />)
      const table = screen.getByRole('table', { name: /assets list/i })
      const rowGroups = getAllByRole(table, 'rowgroup')
      const { 1: tableBody } = rowGroups
      const rows = getAllByRole(tableBody, 'row')
      expect(rows.length).toBe(ASSETS_COUNT)
    })

    it('Should correctly render all column headers', () => {
      render(<Component assets={fakeAssets} />)
      expect(screen.getByText(COLUMN_HEADERS.RANK, { exact: false })).toBeInTheDocument()
      expect(screen.getByRole('columnheader', { name: COLUMN_HEADERS.NAME })).toBeInTheDocument()
      expect(screen.getByRole('columnheader', { name: COLUMN_HEADERS.PRICE })).toBeInTheDocument()
      expect(screen.getByRole('columnheader', { name: COLUMN_HEADERS.MARKET_CAP })).toBeInTheDocument()
      expect(screen.getByText(COLUMN_HEADERS.CHANGE, { exact: false })).toBeInTheDocument()
    })

    it('Should correctly render asset data in cells', () => {
      render(<Component assets={fakeAssets} />)
      const table = screen.getByRole('table', { name: /assets list/i })
      const rowGroups = getAllByRole(table, 'rowgroup')
      const { 1: tableBody } = rowGroups
      const rows = getAllByRole(tableBody, 'row')

      rows.forEach((row, index) => {
        expect(getByRole(row, 'cell', { name: fakeAssets.at(index)?.rank })).toBeInTheDocument()
        expect(getByRole(row, 'link', { name: fakeAssets.at(index)?.name })).toBeInTheDocument()
      })
    })

    it('Should correctly render formatted asset values', () => {
      const expectedPrice = '$15.23'
      const expectedMarketCap = '$233.50m'
      const expectedchangePercent = '-0.75%'

      render(<Component assets={[fakeAssets[0]]} />)

      expect(screen.getByRole('cell', { name: expectedPrice }))
      expect(screen.getByRole('cell', { name: expectedMarketCap }))
      expect(screen.getByRole('cell', { name: expectedchangePercent }))
    })

    it('Should render a button to change assets order', () => {
      const buttonText = /sort assets ascendent/i
      render(<Component assets={fakeAssets} />)
      expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument()
    })

    describe('When the user clicks on the sort button', () => {
      it('Should invert the order of the assets', async () => {
        render(<Component assets={fakeAssets} />)
        const table = screen.getByRole('table', { name: /assets list/i })
        const rowGroups = getAllByRole(table, 'rowgroup')
        const { 1: tableBody } = rowGroups
        const rows = getAllByRole(tableBody, 'row')

        const assetRanks = rows.map((row, index) => screen.getByRole('cell', { name: fakeAssets.at(index)?.rank }))

        await userEvent.click(screen.getByRole('button', { name: /sort assets ascendent/i }))

        const reversedRows = getAllByRole(tableBody, 'row')

        reversedRows.forEach((row, index) => {
          const reversedRanks = assetRanks.map(rankElement => rankElement.textContent).reverse()
          expect(getByRole(row, 'cell', { name: reversedRanks[index] ?? '' })).toBeInTheDocument()
        })
      })
    })
  })
})
