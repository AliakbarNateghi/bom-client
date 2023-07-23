import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "@/app/services/api";
import { setUser } from "@/app/services/localStorage";
export const userInfo = createAsyncThunk(
  "user-info",
  async (slug, thunkAPI) => {
    Api.init();
    // const response1 = await Api.patch('user-info', payload)
    const response = await Api.get("user-info", slug);
    console.log("response2 : ", response.data);
    return response.data;
  }
);

const initialState = {
  userInfo: {},
};

export const userInfoSlice = createSlice({
  name: "userinfo",
  initialState: {
    phoneNumber: localStorage.getItem("user").phone_number
      ? localStorage.getItem("user").phone_number
      : "",
    email: localStorage.getItem("user").email
      ? localStorage.getItem("user").email
      : "",
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userInfo.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.loading = "idle";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(userInfo.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload.error;
      });
  },
});

export const {} = userInfoSlice.actions;
export default userInfoSlice.reducer;
