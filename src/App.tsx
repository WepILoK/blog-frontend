import React, {useEffect} from 'react';
import Container from "@mui/material/Container";

import {Header} from "./components";
import {Home, FullPost, Registration, AddPost, Login} from "./pages";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, loginWithToken, selectAuthData} from "./redux";

function App() {
    const isAuth = !!useSelector(selectAuthData)
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (["/login", "/register"].includes(location.pathname) && isAuth) {
            navigate("/")
        }
    }, [location.pathname, isAuth])

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(loginWithToken())
        }
    }, [])

    return (
        <>
            <Header/>
            <Container maxWidth="lg">
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/posts/:id"} element={<FullPost/>}/>
                    {Boolean(isAuth) &&
                        <>
                            <Route path={"/add-post"} element={<AddPost/>}/>
                        </>
                    }
                    {!Boolean(isAuth) &&
                        <>
                            <Route path={"/login"} element={<Login/>}/>
                            <Route path={"/register"} element={<Registration/>}/>
                        </>
                    }
                </Routes>
            </Container>
        </>
    );
}

export default App;
