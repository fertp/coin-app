import { FC } from 'react'
import { Asset, AssetHistory } from '@/interfaces/interfaces'
import { formatter } from '@/features/utils/formatter'

interface Props {
  asset?: Asset
  history?: AssetHistory[]
}

interface ListItemProps {
  name: string
  value: string
}

export const Stats:FC<Props> = ({ asset, history=[] }) => {

  const min = Math.min( ...history.map(h => Number(h.priceUsd)) )
  const max = Math.max( ...history.map(h => Number(h.priceUsd)) )
  const avg = history.reduce((acc, h) => acc + Number(h.priceUsd), 0) / history.length

  return (
    <div>
      <ul className="max-w-xs sm:max-w-sm md:max-w-none grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4">
        <ListItem 
          name='Rank'
          value={ `${asset?.rank}` }
        />

        <ListItem 
          name='Price'
          value={ formatter.toCompactUSDollar({ value: Number(asset?.priceUsd) }) }
        />

        <ListItem 
          name='High'
          value={ formatter.toCompactUSDollar({ value: max }) }
        />

        <ListItem 
          name='Low'
          value={ formatter.toCompactUSDollar({ value: min }) }
        />

        <ListItem 
          name='Average'
          value={ formatter.toCompactUSDollar({ value: avg }) }
        />

        <ListItem 
          name='Change'
          value={ formatter.toPercentage({ value: Number(asset?.changePercent24Hr) }) }
        />
      </ul>
    </div>
  )
}


const ListItem:FC<ListItemProps> = ({ name, value }) => {
  return (
    <li className="flex items-center">
      <span className="text-xs text-gray-600 mr-4 uppercase">{ name }</span>
      <span>{ value }</span>
    </li>
  )
}