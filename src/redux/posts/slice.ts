import {createSlice} from "@reduxjs/toolkit";
import {fetchPosts, fetchTags} from "./asyncActions";
import {EnumStatus} from "../types";
import {IPostSliceState} from "./types";


const initialState: IPostSliceState = {
    posts: {
        items: [],
        status: EnumStatus.LOADING
    },
    tags: {
        items: [],
        status: EnumStatus.LOADING
    }
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.posts.items = []
                state.posts.status = EnumStatus.LOADING
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts.items = action.payload
                state.posts.status = EnumStatus.LOADED
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.posts.items = []
                state.posts.status = EnumStatus.ERROR
            })
            .addCase(fetchTags.pending, (state) => {
                state.tags.items = []
                state.tags.status = EnumStatus.LOADING
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.tags.items = action.payload
                state.tags.status = EnumStatus.LOADED
            })
            .addCase(fetchTags.rejected, (state) => {
                state.tags.items = []
                state.tags.status = EnumStatus.ERROR
            })
    }
})

export const postsReducer = postsSlice.reducer