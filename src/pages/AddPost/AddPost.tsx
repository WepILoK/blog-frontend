import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import EasyMDE from "easymde";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {IUser, selectAuthData} from "../../redux";
import {postsApi} from "../../global/api";
import {INewPostData} from "./AddPost.types";

export const AddPost = () => {
    const isAuth = !!useSelector(selectAuthData)
    const navigate = useNavigate()
    const {id} = useParams<string>()
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = React.useState('');
    const inputRef = useRef<HTMLInputElement>(null)
    const [postData, setPostData] = useState<INewPostData>({} as INewPostData)
    const [isEdit, setIsEdit] = useState(false)

    const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return
        const formData = new FormData()
        formData.append("image", event.target.files[0])
        postsApi.uploadImage(formData)
            .then(({data}) => {
                setPostData((prevState) => ({
                    ...prevState,
                    imageUrl: data.data.url
                }))
            })
            .catch(() => {
            })
            .finally(() => {

            })
    };

    const onClickRemoveImage = () => {
        setPostData(prevState => ({
            ...prevState,
            imageUrl: ""
        }))
        if (inputRef?.current) {
            inputRef.current.value = ''
        }
    };

    const onChange = React.useCallback((value: string) => {
        setPostData((prevState => ({
            ...prevState,
            text: value
        })));
    }, []);

    const onSubmit = () => {
        setIsLoading(true)
        const requestData = {
            ...postData,
            tags: postData.tags.trim()
        }
        if (id) {
            postsApi.updatePost({updatePost: requestData, id})
                .then(() => {
                    navigate(`/posts/${id}`)
                })
                .catch(() => {

                })
                .finally(() => {
                    setIsLoading(false)
                })
        } else {
            postsApi.createPost(requestData)
                .then(({data}) => {
                    navigate(`/posts/${data.data._id}`)
                })
                .catch(() => {

                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    const options = React.useMemo(
        (): EasyMDE.Options => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
                uniqueId: 'option'
            },
        }),
        [],
    );

    useEffect(() => {
        if (id) {
            postsApi.getPostById(id)
                .then(({data}) => {
                    const responsePost = data.data
                    setPostData({
                        text: responsePost.text,
                        title: responsePost.title,
                        imageUrl: responsePost.imageUrl,
                        tags: responsePost.tags.join(", "),
                    })
                    setIsEdit(true)
                })
                .catch(() => {

                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [])

    if (!isAuth && !localStorage.getItem("token")) {
        return <Navigate to={"/"}/>
    }

    return (
        <Paper style={{padding: 30}}>
            <Button
                variant="outlined"
                size="large"
                onClick={() => {
                    inputRef?.current?.click()
                }}
            >
                Загрузить превью
            </Button>
            <input type="file"
                   ref={inputRef}
                   accept='image/*'
                   onChange={handleChangeFile}
                   hidden
            />
            {postData.imageUrl && (
                <>
                    <Button sx={{marginLeft: "15px"}} variant="contained" color="error" onClick={onClickRemoveImage}>
                        Удалить
                    </Button>
                    <img className={styles.image} src={`http://localhost:8888${postData.imageUrl}`} alt="Uploaded"/>
                </>
            )}
            <br/>
            <br/>
            <TextField
                classes={{root: styles.title}}
                variant="standard"
                value={postData.title}
                placeholder="Заголовок статьи..."
                onChange={(event) => {
                    setPostData(prevState => ({
                            ...prevState,
                            title: event.target.value
                        })
                    )
                }}
                fullWidth
            />
            <TextField
                classes={{root: styles.tags}}
                variant="standard"
                value={postData.tags}
                placeholder="Тэги"
                onChange={(event) => {
                    setPostData(prevState => ({
                            ...prevState,
                            tags: event.target.value
                        })
                    )
                }}
                fullWidth
            />
            <SimpleMDE className={styles.editor} value={postData.text} onChange={onChange} options={options}/>
            <div className={styles.buttons}>
                <Button
                    size="large"
                    variant="contained"
                    onClick={() => {
                        onSubmit()
                    }}
                    disabled={isLoading && !postData.title || !postData.text || !postData.tags}
                >
                    {isEdit ? "Сохранить" : "Опубликовать"}
                </Button>
                <Link to="/">
                    <Button size="large">Отмена</Button>
                </Link>
            </div>
        </Paper>
    );
};
