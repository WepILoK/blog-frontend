import axios, {IResponse} from "./api"
import {AxiosPromise} from "axios";
import {IPost} from "../../redux";
import {INewPostData} from "../../pages";

export const postsApi = {
    getPostById: (id: string): AxiosPromise<IResponse<IPost>> => {
        return axios.get(`/posts/${id}`)
    },
    uploadImage: (request: FormData): AxiosPromise<IResponse<{ url: string }>> => {
        return axios.post("/upload", request)
    },
    createPost: (request: INewPostData): AxiosPromise<IResponse<IPost>> => {
        return axios.post("/posts", request)
    }
}