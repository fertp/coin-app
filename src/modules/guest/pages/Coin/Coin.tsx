import { type FC } from 'react'
import { Container, Loader } from '../../components'
import { useParams } from 'react-router-dom'
import { Stats, Title, Chart, MarketsTable, IntervalButtons } from './components'
import { useGetAssetByIdQuery, useGetAssetHistoryQuery } from '@/services/api'
import { useAppSelector } from '@/app/hooks'

export const Coin: FC = () => {
  const { id } = useParams()

  if (id === undefined) {
    return (
      <Loader
        color='#ea580c'
        fullScreen
      />
    )
  }

  const { timeRange } = useAppSelector(state => state.asset)

  // TODO: Optimize this to reduce renders
  const { data: asset, error: assetError, isLoading: isAssetLoading } = useGetAssetByIdQuery(id)
  const { isLoading: isHistoryLoading } = useGetAssetHistoryQuery({
    id,
    timeRange
  })

  if (assetError != null) {
    // TODO: Check status 404
    return (
      <Container>
        <p>Asset not found</p>
      </Container>
    )
  }

  if (isAssetLoading || isHistoryLoading) {
    return (
      <Loader
        color='#ea580c'
        fullScreen
      />
    )
  }

  return (
    <Container>
      <section className='px-4 sm:px-8 lg:px-0'>
        <div className='flex flex-col flex-wrap gap-8 md:flex-row md:items-center lg:gap-20'>
          <Title asset={asset?.data} />

          <Stats id={id} />
        </div>

        <Chart id={id} />

        <IntervalButtons id={id} />
      </section>

      <MarketsTable id={id} />
    </Container>
  )
}
