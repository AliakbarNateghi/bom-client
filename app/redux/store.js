import {configureStore} from "@reduxjs/toolkit";
import userReducer from '@/app/redux/slices/user'

export const store = configureStore({
    reducer: {
        user: userReducer,
    }
})