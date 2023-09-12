import type { FC } from 'react'
import { Button, Container, Loader } from '../../components'
import { useParams } from 'react-router-dom'
import { Stats, Title, Chart, MarketsTable, IntervalButtons } from './components'
import { useGetAssetByIdQuery, useGetAssetHistoryQuery } from '@/services/api'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { toggleFavoriteAsset } from '../../slices/favoriteAssetSlice'

export const Coin: FC = () => {
  const { id } = useParams()

  const dispatch = useAppDispatch()
  const { favoriteIds } = useAppSelector(state => state.favoriteAssets)

  if (id === undefined) {
    return (
      <Loader
        color='#ea580c'
        fullScreen
      />
    )
  }

  const { timeRange } = useAppSelector(state => state.asset)

  /** @todo Optimize this to reduce renders */
  const assetQuery = useGetAssetByIdQuery(id)
  const assetHistoryQuery = useGetAssetHistoryQuery({
    id,
    timeRange
  })

  if (assetQuery.isError) {
    // TODO: Check status 404
    return (
      <Container>
        <p>Asset not found</p>
      </Container>
    )
  }

  if (assetQuery.isLoading || assetHistoryQuery.isLoading) {
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
          <Title asset={assetQuery.data?.data} />

          <Stats id={id} />

          <div className='flex xl:order-last xl:flex-grow xl:justify-end'>
            <Button
              onClick={() => {
                dispatch(toggleFavoriteAsset(id))
              }}
            >
              {!favoriteIds.includes(id) ? 'Add to' : 'Remove from'} favorites
            </Button>
          </div>
        </div>

        <Chart id={id} />

        <IntervalButtons id={id} />
      </section>

      <MarketsTable id={id} />
    </Container>
  )
}
