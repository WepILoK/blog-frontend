import {IPost} from "../../redux";

export type INewPostData = Omit<IPost, "user" | "_id" | "viewsCount" | "createdAt" | "tags"> & {tags: string}