import axios, {IResponse} from "./api"
import {AxiosPromise} from "axios";
import {IPost} from "../../redux";

export const postsApi = {
    getPostById: (id: string): AxiosPromise<IResponse<IPost>> => {
        return axios.get(`/posts/${id}`)
    }
}