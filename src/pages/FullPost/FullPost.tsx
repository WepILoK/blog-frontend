import React, {useEffect, useState} from "react";

import {Post} from "../../components/Post/Post";
import {AddComment} from "../../components/AddComment/AddComment";
import {CommentsBlock} from "../../components/CommentsBlock/CommentsBlock";
import {IPost} from "../../redux";
import {useNavigate, useParams} from "react-router-dom";
import {postsApi} from "../../global/api";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
    const {id} = useParams<{ id: string }>()
    const [postData, setPostData] = useState<IPost>({} as IPost)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        postsApi.getPostById(id as string)
            .then(({data}) => {
                setPostData(data.data)
            })
            .catch(() => {
                navigate("/")
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [])

    if (isLoading) {
        return (
            <Post
                isFullPost
                isLoading
            />
        )
    }

    return (
        <>
            <Post
                _id={postData._id}
                key={postData._id}
                title={postData.title}
                imageUrl={postData.imageUrl}
                user={postData.user}
                createdAt={postData.createdAt}
                viewsCount={postData.viewsCount}
                commentsCount={2}
                tags={postData.tags}
                isFullPost
            >
                <ReactMarkdown children={postData.text}/>
            </Post>
            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: "Вася Пупкин",
                            avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                        },
                        text: "Это тестовый комментарий 555555",
                    },
                    {
                        user: {
                            fullName: "Иван Иванов",
                            avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                        },
                        text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
                    },
                ]}
                isLoading={false}
            >
                <AddComment/>
            </CommentsBlock>
        </>
    );
};
