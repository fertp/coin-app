import { useState, type FC, useRef } from 'react'
import type { Asset } from '@/types'
import { formatter } from '@/modules/guest/utils/formatter'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useWebSocket } from '@/hooks/useWebSocket'
import { WS_URL } from '@/data/constants'
import { addAnimationClassName, removeAnimationClassName } from '../utils'
import { Button } from '@/modules/guest/components'
import { removeFavoriteAsset } from '@/modules/guest/slices/favoriteAssetSlice'
import { useAppDispatch } from '@/app/hooks'
import { Link } from 'react-router-dom'
import { useQueuedFunction } from '@/hooks/useQueuedFunction'

interface Props {
  asset: Asset
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

export const AssetCard: FC<Props> = ({ asset }) => {
  const [lastAssetPrices, setLastAssetPrices] = useState([Number(asset.priceUsd)])
  const [assetPrice, setAssetPrice] = useState(0)

  const SOCKET_MESAGGE_DELAYED_MILLISECONDS = 3000
  const MAX_PRICES_LENGTH = 12

  const enqueueFunction = useQueuedFunction()

  const dispatch = useAppDispatch()

  const priceElementRef = useRef(null)

  useWebSocket({
    url: `${WS_URL}/prices?assets=${asset.id}`,
    onMessage: message => {
      enqueueFunction(() => {
        const newPrice = JSON.parse(message.data)[asset.id]

        removeAnimationClassName(priceElementRef.current)

        setLastAssetPrices(prev => {
          if (prev !== newPrice) {
            const direction = newPrice > prev[prev.length - 1] ? 'up' : 'down'
            addAnimationClassName(priceElementRef.current, direction)
          }

          const assetPrices = [...prev, newPrice]

          if (assetPrices.length > MAX_PRICES_LENGTH) {
            return assetPrices.splice(assetPrices.length - MAX_PRICES_LENGTH)
          }

          return assetPrices
        })

        setAssetPrice(newPrice)
      }, SOCKET_MESAGGE_DELAYED_MILLISECONDS)
    }
  })

  const labels = lastAssetPrices.map(p => formatter.toCompactUSDollar({ value: p }))

  const data = {
    labels,
    datasets: [
      {
        fill: false,
        label: '',
        data: lastAssetPrices,
        borderColor: 'rgb(249 115 22)', // orange-500
        backgroundColor: 'rgba(253 186 116)' // orange-300
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {}
  }

  return (
    <article
      key={asset.id}
      className='w-full max-w-sm rounded-lg bg-white p-4 shadow '
    >
      <div className='flex justify-between'>
        <div>
          <h5
            ref={priceElementRef}
            className='pb-2 text-3xl font-bold leading-none text-gray-900 '
          >
            {formatter.toUSDollar({
              value: Number(assetPrice === 0 ? asset.priceUsd : assetPrice),
              fractions: parseFloat(asset.priceUsd) < 1 ? 5 : 2
            })}
          </h5>
          <p className='text-base font-normal text-gray-500'>price</p>
        </div>

        <div
          className={`flex flex-col items-end px-2.5 py-0.5 text-center text-base font-semibold ${
            Number(asset.changePercent24Hr) > 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {formatter.toPercentage({ value: Number(asset.changePercent24Hr) })}
          <p className='mt-2 text-base font-normal text-gray-500'>24Hr</p>
        </div>
      </div>
      <div className='mt-4'>
        <Line
          aria-label={`${asset.name} live price`}
          options={{
            ...options,
            scales: {
              yAxis: {
                display: false
              },
              xAxis: {
                display: false,
                ticks: {
                  display: false
                },
                title: {
                  display: false
                }
              }
            }
          }}
          data={data}
          height={196}
        />
      </div>
      <div className='mt-4 flex items-center justify-between'>
        <Link to={`/coins/${asset.id}`}>
          <div className='flex items-center gap-2'>
            <img
              src={`https://static.coincap.io/assets/icons/${asset?.symbol.toLowerCase()}@2x.png`}
              alt={asset?.name}
              className='h-12 w-12'
            />
            <p className='text-base font-normal text-gray-500'>{asset.name}</p>
          </div>
        </Link>

        <Button
          ariaLabel='Remove coin from favorites'
          onClick={() => dispatch(removeFavoriteAsset(asset.id))}
        >
          x
        </Button>
      </div>
    </article>
  )
}
