import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Slicer/authSlice'
import planReducer from './Slicer/planSlice'
import programReducer from './Slicer/programSlice'
import trainerReducer from './Slicer/trainerSlice'
import blogReducer from './Slicer/blogSlice'
import galleryReducer from './Slicer/gallerySlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        plans: planReducer,
        program: programReducer,
        trainer: trainerReducer,
        blog: blogReducer,
        gallery: galleryReducer
    }
})