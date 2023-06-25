import {IUser} from "../../redux";

export type TypeUserInfo = Partial<Pick<IUser, "avatarUrl" | "fullName">> & {
    additionalText?: string
};