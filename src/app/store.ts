import { configureStore } from '@reduxjs/toolkit'
import { coincapApi } from '@/services/api'
import assetSlice from '@/features/public/slices/assetSlice'

export const store = configureStore({
  reducer: {
    [coincapApi.reducerPath]: coincapApi.reducer,
    asset: assetSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coincapApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch