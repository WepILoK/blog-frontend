import React, {ChangeEvent, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import EasyMDE from "easymde";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectAuthData} from "../../redux";
import {postsApi} from "../../global/api";
import {INewPostData} from "./AddPost.types";

export const AddPost = () => {
    const isAuth = !!useSelector(selectAuthData)
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = React.useState('');
    const inputRef = useRef<HTMLInputElement>(null)
    const [newPostData, setNewPostData] = useState<INewPostData>({} as INewPostData)

    const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return
        const formData = new FormData()
        formData.append("image", event.target.files[0])
        postsApi.uploadImage(formData)
            .then(({data}) => {
                setNewPostData((prevState) => ({
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
        setNewPostData(prevState => ({
            ...prevState,
            imageUrl: ""
        }))
        if (inputRef?.current) {
            inputRef.current.value = ''
        }
    };

    const onChange = React.useCallback((value: string) => {
        setNewPostData((prevState => ({
            ...prevState,
            text: value
        })));
    }, []);

    const onSubmit = () => {
        setIsLoading(true)
        postsApi.createPost(newPostData)
            .then(({data}) => {
                navigate(`/posts/${data.data._id}`)
            })
            .catch(() => {

            })
            .finally(() => {
                setIsLoading(false)
            })
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
            {newPostData.imageUrl && (
                <>
                    <Button sx={{marginLeft: "15px"}} variant="contained" color="error" onClick={onClickRemoveImage}>
                        Удалить
                    </Button>
                    <img className={styles.image} src={`http://localhost:8888${newPostData.imageUrl}`} alt="Uploaded"/>
                </>
            )}
            <br/>
            <br/>
            <TextField
                classes={{root: styles.title}}
                variant="standard"
                placeholder="Заголовок статьи..."
                onChange={(event) => {
                    setNewPostData(prevState => ({
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
                placeholder="Тэги"
                onChange={(event) => {
                    setNewPostData(prevState => ({
                            ...prevState,
                            tags: event.target.value
                        })
                    )
                }}
                fullWidth
            />
            <SimpleMDE className={styles.editor} value={newPostData.text} onChange={onChange} options={options}/>
            <div className={styles.buttons}>
                <Button
                    size="large"
                    variant="contained"
                    onClick={() => {
                        onSubmit()
                    }}
                    disabled={isLoading && !newPostData.title || !newPostData.text || !newPostData.tags}
                >
                    Опубликовать
                </Button>
                <Link to="/">
                    <Button size="large">Отмена</Button>
                </Link>
            </div>
        </Paper>
    );
};
