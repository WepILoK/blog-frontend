import {EnumStatus} from "../types";
import {IUser} from "../auth";

export interface IPost {
    _id: string
    title: string
    text: string
    imageUrl: string
    viewsCount: number
    createdAt: string
    user: Pick<IUser, "avatarUrl" | "fullName">
    tags: string[]
}

export interface IPostSliceState {
    posts: {
        items: IPost[];
        status: EnumStatus;
    },
    tags: {
        items: string[],
        status: EnumStatus
    }
}