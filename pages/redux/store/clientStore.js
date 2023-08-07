import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user";
import userInfoReducer from "../slices/userinfo";
import userUpdateReducer from "../slices/userupdate";
import loggedinReducer from "../slices/loggedin";
import componentsReducer from "../slices/componentslice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userInfo: userInfoReducer,
    userUpdate: userUpdateReducer,
    loggedin: loggedinReducer,
    components: componentsReducer,
  },
});
