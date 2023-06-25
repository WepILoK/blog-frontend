import {ReactNode} from "react";
import {IPost} from "../../redux/posts";

export type PostPropsType = Partial<Omit<IPost, "text">> & {
    additionalText?: string
    children?: ReactNode
    isFullPost?: boolean
    isLoading?: boolean
    isEditable?: boolean

    commentsCount?: number
};