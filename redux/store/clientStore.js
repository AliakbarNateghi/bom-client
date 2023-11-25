import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user";
import userInfoReducer from "../slices/userinfo";
import userUpdateReducer from "../slices/userupdate";
import componentsReducer from "../slices/componentslice";

const store = configureStore({
  reducer: {
    user: userReducer,
    userInfo: userInfoReducer,
    userUpdate: userUpdateReducer,
    components: componentsReducer,
  },
});

export default store;
