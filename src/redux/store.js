import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Slicer/authSlice'
import planReducer from './Slicer/planSlice'
import programReducer from './Slicer/programSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        plans: planReducer,
        program: programReducer
    }
})