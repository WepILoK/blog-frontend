import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, loginUser, selectAuthData} from "../../redux";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const dispatch = useDispatch<AppDispatch>()
    const isAuth = !!useSelector(selectAuthData)
    const err = useSelector(state => state)
    const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onChange"
    })

    const onSubmit = async (submitData: { email: string, password: string }) => {
        const data: any = await dispatch(loginUser(submitData))
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

    console.log(err)

    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    {...register("email", {required: "Введите email"})}
                    label="E-Mail"
                    type="email"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    {...register("password", {required: "Введите пароль"})}
                    label="Пароль"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    fullWidth
                />
                <Button disabled={!isValid} size="large" variant="contained" fullWidth type="submit">
                    Войти
                </Button>
            </form>
        </Paper>
    );
};
