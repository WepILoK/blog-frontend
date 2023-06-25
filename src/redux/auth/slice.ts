import {createSlice} from "@reduxjs/toolkit";
import {EnumStatus} from "../types";
import {IAuthSliceState} from "./types";
import {loginUser} from "../auth";


const initialState: IAuthSliceState = {
    data: null,
    status: EnumStatus.LOADING
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.data = null
                state.status = EnumStatus.LOADING
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.data = action.payload.data
                // state.data = action.payload.token
                state.status = EnumStatus.LOADED
            })
            .addCase(loginUser.rejected, (state) => {
                state.data = null
                state.status = EnumStatus.ERROR
            })
    }
})

export const authReducer = authSlice.reducer