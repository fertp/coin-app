import { type FC } from 'react'
import { timeRanges, labelsMap } from '../utils/timeRange'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Button } from '@/modules/guest/components'
import { setTimeRange } from '@/modules/guest/slices/assetSlice'
import { useGetAssetHistoryQuery } from '@/services/api'
import { ClipLoader } from 'react-spinners'

interface Props {
  id: string
}

export const IntervalButtons: FC<Props> = ({ id }) => {
  const { timeRange } = useAppSelector(state => state.asset)

  const dispatch = useAppDispatch()

  const { isFetching } = useGetAssetHistoryQuery({ id, timeRange })

  return (
    <div
      aria-label='Select an interval'
      className='mt-4 flex gap-2'
    >
      {timeRanges.map(item => (
        <Button
          key={item}
          ariaLabel={labelsMap[item]}
          selected={timeRange === item}
          className='relative'
          onClick={() => dispatch(setTimeRange(item))}
        >
          <>
            {timeRange === item && isFetching && (
              <div className='absolute top-1/2 left-1/2 h-6 -translate-x-1/2 -translate-y-1/2'>
                <ClipLoader
                  color='#ffffff'
                  size={24}
                />
              </div>
            )}
            <span className={`${timeRange === item && isFetching && 'text-orange-500'}`}>{item}</span>
          </>
        </Button>
      ))}
    </div>
  )
}
