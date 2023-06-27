import {createAsyncThunk} from "@reduxjs/toolkit";
import {IPost} from "./types";
import axios from "../../global/api/api";


export const fetchPosts = createAsyncThunk<IPost[]>("/posts/fetchPosts", async () => {
    const {data} = await axios.get("/posts")
    return data.data
})

export const fetchTags = createAsyncThunk<string[]>("/posts/fetchTags", async () => {
    const {data} = await axios.get("/posts/last-tags")
    return data.data
})

export const deletePost = createAsyncThunk<any, string>("/posts/deletePost", async (id) => {
    const {data} = await axios.delete(`/posts/${id}`)
    return data.data
})