import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {AppDispatch, loginUser} from "../../redux";

export const Login = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onChange"
    })

    const onSubmit = (data: {email: string, password: string}) => {
        console.log(data)
        dispatch(loginUser(data))
    }

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
                <Button size="large" variant="contained" fullWidth type="submit">
                    Войти
                </Button>
            </form>
        </Paper>
    );
};
