import { useState, type FC } from 'react'
import { formatter } from '../../../utils/formatter'
import { useGetAssetByIdQuery, useGetAssetHistoryQuery } from '@/services/api'
import { useAppSelector } from '@/app/hooks'
import { useWebSocket } from '@/hooks/useWebSocket'
import { WS_URL } from '@/data/constants'

interface Props {
  id: string
}

export const Stats: FC<Props> = ({ id }) => {
  const [assetPrice, setAssetPrice] = useState(0)

  const { timeRange } = useAppSelector(state => state.asset)

  const { data: assetData } = useGetAssetByIdQuery(id)
  const { data: historyData } = useGetAssetHistoryQuery({ id, timeRange })

  useWebSocket({
    url: `${WS_URL}/prices?assets=${id}`,
    onMessage: message => {
      setAssetPrice(JSON.parse(message.data)[id])
    }
  })

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
      value: formatter.toUSDollar({ value: Number(assetPrice === 0 ? asset?.priceUsd : assetPrice) })
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
      <ul
        aria-label={`${asset?.name} stats`}
        className='grid max-w-xs grid-cols-2 gap-x-8 gap-y-4 sm:max-w-sm sm:grid-cols-3 md:max-w-none'
      >
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
