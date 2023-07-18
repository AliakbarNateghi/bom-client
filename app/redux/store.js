import {configureStore} from "@reduxjs/toolkit";
import userReducer from '@/app/redux/slices/user'
import { reducer as disposableIDReducer } from "./slices/qrcode";

export const store = configureStore({
    reducer: {
        user: userReducer,
        disposableId : disposableIDReducer,
    }
})