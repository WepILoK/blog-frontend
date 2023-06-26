import {EnumStatus} from "../types";


export interface IAuthSliceState {
    data: null | IUser
    status: EnumStatus
    token: string | null
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

export interface IRegisterData {
    email: string
    fullName: string
    password: string
    password2: string
}