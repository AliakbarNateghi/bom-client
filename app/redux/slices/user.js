import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import Api from "@/app/services/api";
import {setUser} from "@/app/services/localStorage";
export const login = createAsyncThunk('login', async (payload, thunkAPI) => {
    try {
        console.log('payload :', payload)
        Api.init()
        const {data} = await Api.post('login', payload)
        return data
    } catch (err) {
        console.error('Error during login:', err);
        throw err;
    }
})

const initialState = {
    user: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [login.fulfilled]: (state, {payload}) => {
            setUser(payload['user'])
            console.log('user payload :', payload['user'])
            state.user = payload['user']
        },
    }
})

export const {} = userSlice.actions
export default userSlice.reducer