import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../global/api/api";
import {ILoginData, IUser} from "./types";

export const loginUser = createAsyncThunk<{data: IUser, token: string}, ILoginData>("/auth/loginUser", async (params: ILoginData) => {
    const {data} = await axios.post("/auth/login", params)
    return data
})