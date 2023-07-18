import { configureStore } from '@reduxjs/toolkit'
import homeSlice from './homeSlice'
import userSlice from './userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    home: homeSlice,
  },
})