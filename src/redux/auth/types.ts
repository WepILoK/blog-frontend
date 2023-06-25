import {EnumStatus} from "../types";


export interface IAuthSliceState {
    data: null | IUser
    status: EnumStatus
}

export interface IUser {
    _id: string
    email: string
    fullName: string
    passwordHash: string
    avatarUrl: string
    timestamps: string
}

export interface ILoginData {
    email: string
    password: string
}