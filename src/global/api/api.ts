import axios from "axios";

export interface IResponse<D> {
    data: D,
    status: string
    message: string
}

const instance = axios.create({
    baseURL: "http://localhost:8888/",
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem("token")
    return config
})

export default instance