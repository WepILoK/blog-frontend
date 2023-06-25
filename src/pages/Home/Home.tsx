import React, {useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import {Post} from '../../components/Post/Post';
import {TagsBlock} from '../../components/TagsBlock/TagsBlock';
import {CommentsBlock} from '../../components/CommentsBlock/CommentsBlock';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, EnumStatus, fetchPosts, fetchTags, IPost, selectPostsData} from "../../redux";

export const Home = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {posts, tags} = useSelector(selectPostsData)

    const isPostsLoaded = posts.status === EnumStatus.LOADED
    const isTagsLoaded = tags.status === EnumStatus.LOADED

    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchTags())
    }, [])

    return (
        <>
            <Tabs style={{marginBottom: 15}} value={0} aria-label="basic tabs example">
                <Tab label="Новые"/>
                <Tab label="Популярные"/>
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {(isPostsLoaded ? posts.items : [...Array(5)]).map((item: IPost, index) =>
                        isPostsLoaded
                            ? (
                                <Post
                                    _id={item._id}
                                    key={item._id}
                                    title={item.title}
                                    imageUrl={item.imageUrl}
                                    user={item.user}
                                    createdAt={item.createdAt}
                                    viewsCount={item.viewsCount}
                                    commentsCount={2}
                                    tags={item.tags}
                                    isLoading={false}
                                    isEditable
                                />
                            )
                            : <Post key={index} isLoading={true} />
                    )}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock items={tags.items} isLoading={!isTagsLoaded}/>
                    <CommentsBlock
                        items={[
                            {
                                user: {
                                    fullName: 'Вася Пупкин',
                                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                                },
                                text: 'Это тестовый комментарий',
                            },
                            {
                                user: {
                                    fullName: 'Иван Иванов',
                                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                                },
                                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                            },
                        ]}
                        isLoading={false}
                    />
                </Grid>
            </Grid>
        </>
    );
};
