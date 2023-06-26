import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, loginUser, registerUser, selectAuthData} from "../../redux";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router-dom";

export const Registration = () => {
    const dispatch = useDispatch<AppDispatch>()
    const isAuth = !!useSelector(selectAuthData)
    const {register, handleSubmit, setError, formState: {errors, isValid, defaultValues}} = useForm({
        defaultValues: {
            email: "",
            fullName: "",
            password: "",
            password2: ""
        },
        mode: "onChange"
    })

    const onSubmit = async (submitData: { email: string, password: string, password2: string, fullName: string }) => {
        const data: any = await dispatch(registerUser(submitData))
        console.log(data)
        if (!data.payload) {
            return
        }

        if ("token" in data.payload) {
            localStorage.setItem("token", data.payload.token)
        }
    }

    if (isAuth || localStorage.getItem("token")) {
        return <Navigate to={"/"}/>
    }

    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Создание аккаунта
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{width: 100, height: 100}}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <TextField className={styles.field}
                           {...register("fullName", {required: "Введите полное имя"})}
                           label="Полное имя"
                           error={Boolean(errors.fullName?.message)}
                           helperText={errors.fullName?.message}
                           fullWidth
                />
                <TextField className={styles.field}
                           {...register("email", {required: "Введите email"})}
                           label="E-Mail"
                           type="email"
                           error={Boolean(errors.email?.message)}
                           helperText={errors.email?.message}
                           fullWidth
                />
                <TextField className={styles.field}
                           {...register("password", {required: "Введите пароль"})}
                           label="Пароль"
                           error={Boolean(errors.password?.message)}
                           helperText={errors.password?.message}
                           fullWidth
                />
                <TextField className={styles.field}
                           {...register("password2", {required: "Повторите пароль"})}
                           label="Повторите пароль"
                           error={Boolean(errors.password2?.message)}
                           helperText={errors.password2?.message}
                           fullWidth
                />
                <Button disabled={!isValid} type={"submit"} size="large" variant="contained" fullWidth>
                    Зарегистрироваться
                </Button>
            </form>
        </Paper>
    );
};
