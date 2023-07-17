import { type FC } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Th, Td, Thead, ActionButton } from '@/modules/guest/components'
import { type Asset } from '@/types'
import { formatter } from '../../../../utils/formatter'
import { COLUMN_HEADERS } from './constants'

interface Props {
  assets: Asset[]
}

export const AssetsTable: FC<Props> = ({ assets }) => {
  const [order, setOrder] = useState<number>(1)
  const [filter] = useState<string>('')

  // TODO: Trigger a request to find assets
  // TODO: Debounce it
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFilter(e.target.value)
  // }

  const changeSortOrder = (): void => {
    setOrder(prev => prev * -1)
  }

  const filterAssets = (): Asset[] => {
    const altOrder = order * -1

    const localAssets = assets
      .filter(a => a.symbol.toLowerCase().includes(filter.toLowerCase()) || a.name.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => {
        if (parseInt(a.rank) > parseInt(b.rank)) {
          return order
        }

        return altOrder
      })

    return localAssets
  }

  const filteredAssets = filterAssets()

  return (
    <Table ariaLabel='Assets list'>
      <colgroup>
        <col />
        <col className='min-w-fit' />
        <col />
        <col />
        <col />
        <col />
        <col />
      </colgroup>

      <Thead>
        <Th
          align='center'
          displayFrom='md'
        >
          <span
            onClick={changeSortOrder}
            role='button'
            aria-label={`Sort assets ${order === 1 ? 'ascendent' : 'descendent'}`}
          >
            <span className='underline'>{COLUMN_HEADERS.RANK}</span>
            &nbsp;
            {order === 1 ? '👆🏾' : '👇🏾'}
          </span>
        </Th>

        <Th align='left'>{COLUMN_HEADERS.NAME}</Th>

        <Th>{COLUMN_HEADERS.PRICE}</Th>

        <Th displayFrom='md'>{COLUMN_HEADERS.MARKET_CAP}</Th>

        <Th>
          <span className='hidden sm:inline'>{COLUMN_HEADERS.CHANGE}&nbsp;</span>
          <span>(24Hr)</span>
        </Th>

        <Th displayFrom='md'>
          {/* <input
            value={filter}
            onChange={handleInputChange}
            className="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
            id="filter"
            placeholder="Search..."
            type="text"
          /> */}
          &nbsp;
        </Th>
      </Thead>

      <tbody>
        {filteredAssets.map(asset => {
          return (
            <tr
              aria-rowindex={parseInt(asset.rank)}
              key={asset.name}
              className='border-b border-gray-200 hover:bg-orange-100'
            >
              <Td
                align='center'
                displayFrom='md'
              >
                {asset.rank}
              </Td>

              <Td align='left'>
                <img
                  className='inline-block h-7 w-7 align-middle sm:h-6 sm:w-6'
                  src={`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`}
                  alt={asset.name}
                />

                <div className='ml-2 inline-block align-middle'>
                  <Link
                    className='inline-block text-orange-600 hover:underline'
                    to={`/coins/${asset.id}`}
                  >
                    {asset.name}
                  </Link>
                  <small className='block text-gray-500'>{asset.symbol}</small>
                </div>
              </Td>

              <Td className=''>{formatter.toUSDollar({ value: Number(asset.priceUsd) })}</Td>

              <Td displayFrom='md'>
                {formatter.toCompactUSDollar({
                  value: Number(asset.marketCapUsd)
                })}
              </Td>

              <Td className={Number(asset.changePercent24Hr) < 0 ? 'text-red-600' : 'text-green-600'}>
                {formatter.toPercentage({
                  value: Number(asset.changePercent24Hr)
                })}
              </Td>

              <Td displayFrom='md'>
                <ActionButton
                  to={`/coins/${asset.id}`}
                  aria-label={`Go to ${asset.name} page`}
                >
                  <span>Details</span>
                </ActionButton>
              </Td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

/**
 * @todo Create DetailRow component to show below onclick on asset row
 * */