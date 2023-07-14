import { configureStore } from '@reduxjs/toolkit'
import { coincapApi } from '@/services/api'
import assetSlice from '@/modules/guest/slices/assetSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
  reducer: {
    [coincapApi.reducerPath]: coincapApi.reducer,
    asset: assetSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(coincapApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
