import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "@/services/api";

export const componentslice = createAsyncThunk(
  "saveOnServer",
  async ({ payload, slug }, thunkAPI) => {
    Api.init();
    const response = await Api.patch("components", slug, payload);
    return response.data;
  }
);

const initialState = {
  components: {},
};

export const componentsSlice = createSlice({
  name: "components",
  initialState,
  reducers: {},
  extraReducers: {
    [componentslice.fulfilled]: (state, { payload }) => {
      state.components = payload["components"];
    },
  },
});

export const {} = componentsSlice.actions;
export default componentsSlice.reducer;
