import {createSlice, isAnyOf, isFulfilled, isPending, isRejected, isRejectedWithValue} from "@reduxjs/toolkit";
import {EnumStatus} from "../types";
import {IAuthSliceState} from "./types";
import {loginUser, loginWithToken, registerUser} from "../auth";


const initialState: IAuthSliceState = {
    data: null,
    status: EnumStatus.LOADING,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token")
            state.data = null
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isPending(registerUser, loginWithToken, loginUser), (state)=> {
                    state.data = null
                    state.status = EnumStatus.LOADING
                }
            )
            .addMatcher(
                isFulfilled(registerUser, loginWithToken, loginUser), (state, action) => {
                    state.data = action.payload.data
                    state.token = action.payload.token
                    state.status = EnumStatus.LOADED
                }
            )
            .addMatcher(
                isRejected(registerUser, loginWithToken, loginUser), (state) => {
                    state.data = null
                    state.status = EnumStatus.ERROR
                }
            )
    }
})

export const authReducer = authSlice.reducer

export const {logout} = authSlice.actions