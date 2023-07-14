import { type FC } from 'react'
import { formatter } from '../../../utils/formatter'
import { useGetAssetByIdQuery, useGetAssetHistoryQuery } from '@/services/api'
import { useAppSelector } from '@/app/hooks'

interface Props {
  id: string
}

export const Stats: FC<Props> = ({ id }) => {
  const { timeRange } = useAppSelector(state => state.asset)

  const { data: assetData } = useGetAssetByIdQuery(id)
  const { data: historyData } = useGetAssetHistoryQuery({ id, timeRange })

  const asset = assetData?.data
  const history = historyData?.data ?? []

  const min = Math.min(...history.map(h => Number(h.priceUsd)))
  const max = Math.max(...history.map(h => Number(h.priceUsd)))
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
    }
  ]

  return (
    <div>
      <ul className='grid max-w-xs grid-cols-2 gap-x-8 gap-y-4 sm:max-w-sm sm:grid-cols-3 md:max-w-none'>
        {items.map(({ name, value }) => (
          <li
            key={name}
            className='flex items-center'
          >
            <span className='mr-4 text-xs uppercase text-gray-600'>{name}</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
