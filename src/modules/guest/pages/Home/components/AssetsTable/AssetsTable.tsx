import { useEffect, type FC, useRef } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Th, Td, Thead, ActionButton } from '@/modules/guest/components'
import { type Asset } from '@/types'
import { formatter } from '../../../../utils/formatter'
import { COLUMN_HEADERS } from './constants'
import { useWebSocket } from '@/hooks/useWebSocket'
import { WS_URL } from '@/data/constants'
import { addAnimationClassName, reduceAssetsPrices, removeAnimationClassName } from './utils'
import { StarIcon } from '@/modules/guest/components/ui/StarIcon'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { toggleFavoriteAsset } from '@/modules/guest/slices/favoriteAssetSlice'

interface Props {
  assets: Asset[]
}

export const AssetsTable: FC<Props> = ({ assets }) => {
  const [assetsPrices, setAssetsPrices] = useState(reduceAssetsPrices(assets))
  const [order, setOrder] = useState<number>(1)
  const [filter] = useState<string>('')

  const { favoriteIds } = useAppSelector(state => state.favoriteAssets)
  const dispatch = useAppDispatch()

  const tbodyRef = useRef<HTMLTableSectionElement>(null)

  useWebSocket({
    url: `${WS_URL}/prices?assets=${assets.map(({ id }) => id).join(',')}`,
    onMessage: message => {
      const newPrices = JSON.parse(message.data)
      const tableRows = tbodyRef.current?.querySelectorAll('tr')
      tableRows?.forEach(row => {
        removeAnimationClassName(row)
      })

      setAssetsPrices(prev => {
        tableRows?.forEach(row => {
          if (row.dataset.id !== undefined && row.dataset.id in newPrices) {
            const direction = newPrices[row.dataset.id] > prev[row.dataset.id] ? 'up' : 'down'
            addAnimationClassName(row, direction)
          }
        })
        return { ...prev, ...newPrices }
      })
    }
  })

  useEffect(() => {
    setAssetsPrices(reduceAssetsPrices(assets))
  }, [assets])

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

        <Th align='center'>Fav</Th>

        <Th displayFrom='md'>&nbsp;</Th>
      </Thead>

      <tbody ref={tbodyRef}>
        {filteredAssets.map(asset => {
          return (
            <tr
              aria-rowindex={parseInt(asset.rank)}
              key={asset.name}
              className='border-b border-gray-200 transition-all hover:bg-orange-100'
              data-id={asset.id}
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

              <Td className=''>{formatter.toUSDollar({ value: Number(assetsPrices[asset.id]) })}</Td>

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

              <Td align='center'>
                <span className='inline-block'>
                  <StarIcon
                    role='button'
                    isFilled={favoriteIds.includes(asset.id)}
                    onClick={() => dispatch(toggleFavoriteAsset(asset.id))}
                  />
                </span>
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
