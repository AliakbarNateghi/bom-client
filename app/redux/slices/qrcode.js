import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "@/app/services/api";

export const getDisposableID = createAsyncThunk(
  "disposable-id/", 
  async (_, thunkAPI) => {
    Api.init();
    const response = await Api.get("disposable-id");
    console.log('root disposableID :', response.data[0].disposable_id);
    const disposable_id = response.data[0].disposable_id;
    return disposable_id;
  }
);

const initialState = {
  disposableID: null
};

export const DisposableIdSlice = createSlice({
  name: "uniqueCode",
  initialState,
  extraReducers: {
    [getDisposableID.pending]: (state) => {
      state.status = 'loading';
    },
    [getDisposableID.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.disposableID = action.payload;
    },
    [getDisposableID.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      console.log(action.error);
    }
  }
});

export const { reducer } = DisposableIdSlice;
