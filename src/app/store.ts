import { configureStore } from '@reduxjs/toolkit'
import { coincapApi } from '@/services/api'

export const store = configureStore({
  reducer: {
    [coincapApi.reducerPath]: coincapApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coincapApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch