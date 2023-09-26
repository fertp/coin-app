import type { PreloadedState } from '@reduxjs/toolkit'
import type { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { coincapApi } from '@/services/api'
import assetSlice from '@/modules/guest/slices/assetSlice'
import { favoriteAssetsSlice } from '@/modules/guest/slices/favoriteAssetSlice'

const rootReducer = combineReducers({
  [coincapApi.reducerPath]: coincapApi.reducer,
  asset: assetSlice,
  favoriteAssets: favoriteAssetsSlice.reducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>): ToolkitStore => {
  return configureStore({
    reducer: {
      [coincapApi.reducerPath]: coincapApi.reducer,
      asset: assetSlice,
      favoriteAssets: favoriteAssetsSlice.reducer
    },
    preloadedState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(coincapApi.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
