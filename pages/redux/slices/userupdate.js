import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "@/pages/services/api";
import { setUser } from "@/pages/services/localStorage";
export const userUpdate = createAsyncThunk(
  "user-info",
  async (payload, thunkAPI) => {
    Api.init();
    const response = await Api.patch("user-info", payload);
    console.log("response : ", response.data);
    return response.data;
  }
);

const initialState = {
  userUpdate: {},
};

export const userUpdateSlice = createSlice({
  name: "userupdate",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userUpdate.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.loading = "idle";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload.error;
      });
  },
});

export const {} = userUpdateSlice.actions;
export default userUpdateSlice.reducer;
