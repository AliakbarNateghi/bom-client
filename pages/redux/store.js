import { configureStore } from "@reduxjs/toolkit";
import userReducer from '@/pages/redux/slices/user'
import userInfoReducer from '@/pages/redux/slices/userinfo'
import userUpdateReducer from '@/pages/redux/slices/userupdate'

export const store = configureStore({
    reducer: {
        user: userReducer,
        userInfo: userInfoReducer,
        userUpdate: userUpdateReducer,
    }
})