import { LinkButton } from '@/modules/guest/components'
import { formatter } from '@/modules/guest/utils/formatter'
import { type Exchange, type ExchangeMarket } from '@/types'
import { type FC } from 'react'

interface Props {
  exchange?: Exchange
  topMarket?: ExchangeMarket
}

export const Stats: FC<Props> = ({ exchange, topMarket }) => {
  return (
    <div className='w-full'>
      <div className='flex flex-wrap gap-8 sm:gap-16'>
        <div>
          <span className='text-xs'>Volume (24Hr)</span>
          <p>
            {formatter.toUSDollar({
              value: Number(exchange?.volumeUsd),
              fractions: 0
            })}
          </p>
        </div>

        <div>
          <span className='text-xs'>Top Pair</span>
          <p>{`${topMarket?.baseSymbol}/${topMarket?.quoteSymbol}`}</p>
        </div>
      </div>

      <div className='mt-4'>
        <LinkButton href={exchange?.exchangeUrl}>Website</LinkButton>
      </div>
    </div>
  )
}
