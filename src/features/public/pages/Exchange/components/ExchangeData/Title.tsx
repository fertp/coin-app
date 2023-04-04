import { type Exchange } from '@/interfaces/interfaces'
import { type FC } from 'react'

interface Props {
  exchange?: Exchange
}

export const Title: FC<Props> = ({ exchange }) => {
  return (
    <div className='flex gap-8 sm:gap-12'>
      <div className='flex flex-col  items-center gap-2 rounded-md bg-orange-500 px-3 py-2 text-white shadow'>
        <span className='text-4xl'>{exchange?.rank}</span>

        <span className='text-xs uppercase'>Rank</span>
      </div>

      <div>
        <h1 className='text-2xl sm:text-3xl'>{exchange?.name}</h1>
        <p className='mt-4'>
          <span className='text-2xl sm:text-3xl'>{exchange?.tradingPairs}</span>
          &nbsp;&nbsp;
          <span className='text-xs'>Pairs</span>
        </p>
      </div>
    </div>
  )
}
