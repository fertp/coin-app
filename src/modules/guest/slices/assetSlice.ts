import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type timeRange, timeRanges } from '../pages/Coin/utils/timeRange'

interface InitialState {
  id: string | undefined
  timeRange: timeRange
}

const initialState: InitialState = {
  id: undefined,
  timeRange: timeRanges[0]
}

export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
    setTimeRange: (state, action: PayloadAction<timeRange>) => {
      state.timeRange = action.payload
    }
  }
})

export const { setId, setTimeRange } = assetSlice.actions

export default assetSlice.reducer
