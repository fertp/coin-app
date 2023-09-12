import type { Asset } from '@/types'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialState {
  favoriteIds: Array<Asset['id']>
  isStorageLoaded: boolean
}

const initialState: InitialState = {
  favoriteIds: [],
  isStorageLoaded: false
}

export const favoriteAssetsSlice = createSlice({
  name: 'favoriteAssets',
  initialState,
  reducers: {
    addFavoriteAsset: (state, action: PayloadAction<Asset['id']>) => {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload)
      }
    },

    removeFavoriteAsset: (state, action: PayloadAction<Asset['id']>) => {
      if (state.favoriteIds.includes(action.payload)) {
        state.favoriteIds = state.favoriteIds.filter(id => id !== action.payload)
      }
    },

    toggleFavoriteAsset: (state, action: PayloadAction<Asset['id']>) => {
      if (state.favoriteIds.includes(action.payload)) {
        console.log('toggleFavoriteAsset > if')
        state.favoriteIds = state.favoriteIds.filter(id => id !== action.payload)
      } else {
        state.favoriteIds.push(action.payload)
      }
    },

    loadFavoriteAssetsFromStorage: (state, action: PayloadAction<Array<Asset['id']>>) => {
      state.favoriteIds = action.payload
      state.isStorageLoaded = true
    },

    removeAllFavorites: state => {
      state.favoriteIds = []
    }
  }
})

export const { addFavoriteAsset, removeFavoriteAsset, toggleFavoriteAsset, loadFavoriteAssetsFromStorage, removeAllFavorites } =
  favoriteAssetsSlice.actions
