import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Slicer/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})