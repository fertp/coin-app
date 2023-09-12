import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { storage } from '../services/storage'
import { loadFavoriteAssetsFromStorage } from '../modules/guest/slices/favoriteAssetSlice'

export const useFavoriteAssetsStorage = (): void => {
  const FAVORITOS_KEY = 'favorite-assets-ids'
  const dispatch = useAppDispatch()
  const { favoriteIds, isStorageLoaded } = useAppSelector(state => state.favoriteAssets)

  useEffect(() => {
    const ids = storage.get({ key: FAVORITOS_KEY }) ?? '[]'
    dispatch(loadFavoriteAssetsFromStorage(JSON.parse(ids)))
  }, [])

  useEffect(() => {
    if (isStorageLoaded) {
      storage.set({ key: FAVORITOS_KEY, value: JSON.stringify(favoriteIds) })
    }
  }, [favoriteIds])
}
