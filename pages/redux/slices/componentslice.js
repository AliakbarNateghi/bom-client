import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "@/pages/services/api";

export const componentslice = createAsyncThunk(
  "saveOnServer",
  async ({ payload, slug }, thunkAPI) => {
    // console.log("okkk");
    Api.init();
    const response = await Api.patch("components", slug, payload);
    // console.log("response : ", response.data);
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
