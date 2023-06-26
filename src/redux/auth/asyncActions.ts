import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../global/api/api";
import {ILoginData, IRegisterData, IUser} from "./types";

export const loginUser = createAsyncThunk<{data: IUser, token: string}, ILoginData>("/auth/loginUser", async (params) => {
    const {data} = await axios.post("/auth/login", params)
    return data
})

export const loginWithToken = createAsyncThunk<{data: IUser, token: string}>("/auth/loginWithToken", async () => {
    const {data} = await axios.get("/auth/me")
    return data
})

export const registerUser = createAsyncThunk<{data: IUser, token: string}, IRegisterData>("/auth/registerUser", async (params) => {
    const {data} = await axios.post("/auth/register", params)
    return data
})