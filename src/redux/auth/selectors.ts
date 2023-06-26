import {RootState} from "../types";

export const selectAuthData = (state: RootState) => state.auth.data;

export const selectUserId = (state: RootState) => state.auth.data?._id;