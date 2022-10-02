import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './slices/authSlice'
import BlogReducer from './slices/blogSlice'
import UserReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    blog: BlogReducer,
    user: UserReducer
  },
})