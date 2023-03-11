import { FC } from 'react'
import { Asset, AssetHistory } from '@/interfaces/interfaces'
import { formatter } from '../../../utils/formatter'

interface Props {
  asset?: Asset
  history?: AssetHistory[]
}

export const Stats:FC<Props> = ({ asset, history=[] }) => {

  const min = Math.min( ...history.map(h => Number(h.priceUsd)) )
  const max = Math.max( ...history.map(h => Number(h.priceUsd)) )
  const avg = history.reduce((acc, h) => acc + Number(h.priceUsd), 0) / history.length

  const items = [
    {
      name: 'Rank',
      value: `${asset?.rank}`
    },
    {
      name: 'Price',
      value: formatter.toCompactUSDollar({ value: Number(asset?.priceUsd) })
    },
    {
      name: 'High',
      value: formatter.toCompactUSDollar({ value: max })
    },
    {
      name: 'Low',
      value: formatter.toCompactUSDollar({ value: min })
    },
    {
      name: 'Average',
      value: formatter.toCompactUSDollar({ value: avg })
    },
    {
      name: 'Change',
      value: formatter.toPercentage({ value: Number(asset?.changePercent24Hr) })
    },
  ]

  return (
    <div>
      <ul className="max-w-xs sm:max-w-sm md:max-w-none grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4">
        {items.map(({ name, value }) => (
          <li 
            key={ name }
            className="flex items-center"
          >
            <span className="text-xs text-gray-600 mr-4 uppercase">{ name }</span>
            <span>{ value }</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
