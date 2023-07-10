import { type Exchange, type ExchangeMarket } from '@/types'
import { type FC } from 'react'
import { Title } from './Title'
import { Stats } from './Stats'

interface Props {
  exchange?: Exchange
  topMarket?: ExchangeMarket
}

export const ExchangeData: FC<Props> = ({ exchange, topMarket }) => {
  return (
    <section className='grid gap-8 px-8 sm:grid-cols-2 sm:place-items-center sm:gap-12 sm:px-0'>
      <Title exchange={exchange} />

      <Stats
        exchange={exchange}
        topMarket={topMarket}
      />
    </section>
  )
}
