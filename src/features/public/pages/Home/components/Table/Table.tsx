import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { ActionButton } from './ActionButton'
import { Th, Td } from '@/features/public/components'
import { Asset } from '@/interfaces/interfaces'
import { formatter } from '@/features/utils/formatter'

interface Props {
  assets: Asset[]
}


export const Table:FC<Props> = ({ assets }) => {

  const [order, setOrder] = useState<number>(1)
  const [filter, setFilter] = useState<string>('')

  // TODO: Trigger a request to find assets
  // TODO: Debounce it
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setFilter(e.target.value)
  }

  const changeSortOrder = () => {
    setOrder( prev => prev * -1 )
  }

  const filterAssets = () => {

    const altOrder = order * -1

    const localAssets = assets.filter(a => 
        a.symbol.toLowerCase().includes(filter.toLowerCase()) ||
        a.name.toLowerCase().includes(filter.toLowerCase())
      )
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
    <table className='w-full'>
      <colgroup>
        <col />
        <col className='min-w-fit' />
        <col />
        <col />
        <col />
        <col />
        <col />
      </colgroup>

      <thead>
        <tr className="bg-gray-100 border-b-2 border-gray-200">
          <Th align='center' className='hidden md:table-cell'>
            <span 
              onClick={changeSortOrder}
              role='button'
              >
              <span className="underline">Rank</span>
              &nbsp;
              { order === 1 ? '👆🏾' : '👇🏾' }
            </span>
          </Th>

          <Th align='left'>Name</Th>

          <Th className=''>Price</Th>

          <Th className='hidden md:table-cell'>Market Cap</Th>

          <Th>
            <span className='hidden sm:inline'>Change&nbsp;</span>
            <span>(24Hr)</span>
          </Th>

          <Th className="hidden md:table-cell">
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
        </tr>
      </thead>

      <tbody>
        {
          filteredAssets.map(asset => {
            return (
              <tr
                key={asset.name}
                className="border-b border-gray-200 hover:bg-orange-100"
              >
                <Td align='center' className='hidden md:table-cell'>
                  { asset.rank }
                </Td>

                <Td align='left'>
                  <img 
                    className="inline-block w-7 h-7 sm:w-6 sm:h-6 align-middle"
                    src={`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`} 
                    alt={asset.name}
                  />

                  <div className="inline-block align-middle ml-2">
                    <Link
                      className="block hover:underline text-orange-600"
                      to={ `coins/${asset.id}` }
                    >
                      { asset.name }
                    </Link>
                    <small className="block text-gray-500">
                      { asset.symbol }
                    </small>
                  </div>
                </Td>

                <Td className=''>
                  { formatter.toUSDollar({ value: Number(asset.priceUsd )}) }
                </Td>

                <Td className='hidden md:table-cell'>
                  { formatter.toCompactUSDollar({ value: Number(asset.marketCapUsd) }) }
                </Td>

                <Td className={ Number(asset.changePercent24Hr) < 0 ? 'text-red-600' : 'text-green-600' }>
                  { formatter.toPercentage({ value: Number(asset.changePercent24Hr) }) }
                </Td>

                <Td className="hidden md:table-cell">
                  <ActionButton 
                    to={ `/coins/${asset.id}` }
                    aria-label={`Go to ${asset.name} page`}
                  >
                    <span>Details</span>
                  </ActionButton>
                </Td>
              </tr>
            )
          })
        } 
      </tbody>
    </table>
  )
}

// TODO: Create DetailRow component to show below onclick on asset row