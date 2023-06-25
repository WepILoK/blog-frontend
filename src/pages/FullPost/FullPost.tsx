import React, {useEffect, useState} from "react";

import {Post} from "../../components/Post/Post";
import {AddComment} from "../../components/AddComment/AddComment";
import {CommentsBlock} from "../../components/CommentsBlock/CommentsBlock";
import {IPost} from "../../redux";
import {postsApi} from "../../global/api/posts";
import {useParams} from "react-router-dom";

export const FullPost = () => {
    const {id} = useParams<{ id: string }>()
    const [postData, setPostData] = useState<IPost>({} as IPost)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!id) return

        postsApi.getPostById(id)
            .then(({data}) => {
                setPostData(data.data)
            })
            .catch(() => {

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
                <p>
                    {postData.text}
                </p>
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
