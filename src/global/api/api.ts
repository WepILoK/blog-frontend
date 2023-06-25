import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8888/",
})

export interface IResponse<D> {
    data: D,
    status: string
    message: string
}

export default instance