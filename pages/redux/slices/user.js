import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "@/pages/services/api";
import { setUser } from "@/pages/services/localStorage";

export const login = createAsyncThunk("login", async (payload, thunkAPI) => {
  Api.init();
  const { data } = await Api.post("login", payload);
  return data;
});

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      setUser(payload["user"]);
      // console.log(payload["user"]);
      state.user = payload["user"];
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
