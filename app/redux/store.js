import { configureStore } from "@reduxjs/toolkit";
import userReducer from '@/app/redux/slices/user'
import userInfoReducer from '@/app/redux/slices/userinfo'

export const store = configureStore({
    reducer: {
        user: userReducer,
        userInfo: userInfoReducer,
    }
})