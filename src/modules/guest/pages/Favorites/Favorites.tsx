import type { FC } from 'react'
import { Button, Container } from '../../components'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useGetFavoriteAssetsQuery } from '@/services/api'
import { AssetCard } from './components'
import { removeAllFavorites } from '../../slices/favoriteAssetSlice'

export const Favorites: FC = () => {
  const { favoriteIds } = useAppSelector(state => state.favoriteAssets)

  const dispatch = useAppDispatch()

  const { data } = useGetFavoriteAssetsQuery(favoriteIds, { skip: favoriteIds.length === 0 })

  const assets = data?.data ?? []

  return (
    <Container>
      {favoriteIds.length === 0 && <p>There are not favorite coins.</p>}
      {favoriteIds.length > 0 && (
        <>
          <div className='grid place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {assets.map(asset => (
              <AssetCard
                key={asset.id}
                asset={asset}
              />
            ))}
          </div>
          <div className='my-12 flex justify-center'>
            <Button onClick={() => dispatch(removeAllFavorites())}>Remove all</Button>
          </div>
        </>
      )}
    </Container>
  )
}
