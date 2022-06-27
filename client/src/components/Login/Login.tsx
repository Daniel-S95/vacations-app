import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axios, { AxiosError } from "axios";

import MyButton from "../UI/MyButton";
import MyInput from "../UI/MyInput";
import classes from "./Login.module.css";

import { ActionType } from "../../redux/action-type";
import { IVacation } from "../../models/IVacation";

import isValidEmail from "is-valid-email";
import { toast } from 'react-toastify';
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider/Divider";
import jwt_decode from 'jwt-decode';

import 'react-toastify/dist/ReactToastify.css';
import DefaultUsers from "./DefaultUsers";

type Token = {
    userId: number;
    userName: string;
    userType: string;
};

const Login = () => {

    useEffect(() => {
        document.title = "GlobeFlight - Log in and fly!";
    }, []);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let homePageRedirection: NodeJS.Timeout;

    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    useEffect(() => {
        if (isValidEmail(enteredUsername) && enteredPassword.length > 3) {
            setIsSubmitDisabled(false);
        } else {
            setIsSubmitDisabled(true);
        }
    }, [enteredUsername, enteredPassword]);


    const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredUsername(e.target.value);
    }

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredPassword(e.target.value);
    }

    const submitHandler = async () => {
        if (isSubmitDisabled) {
            return;
        }

        clearTimeout(homePageRedirection);
        setEnteredPassword("");
        toast.dismiss();

        try {
            const user = { email: enteredUsername, password: enteredPassword };
            let result = await axios.post("http://localhost:3001/users/login", user);

            const response = await axios.get<IVacation[]>("http://localhost:3001/vacations");
            let vacations = response.data;
            dispatch({ type: ActionType.GetAllVacations, payload: vacations });

            toast.success(`Logged in successfully!`, {
                position: "bottom-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
                closeButton: false,
                icon: true,
            });

            homePageRedirection = setTimeout(() => {
                navigate("/");

                let token = result.data.token;
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                let userName = result.data.firstName;
                let decoded: Token = jwt_decode(token);
                let userId = decoded.userId;
                let userType = decoded.userType;

                localStorage.setItem("token", JSON.stringify({ token, userName }));

                dispatch({ type: ActionType.UserLoggedIn, payload: { userId, userName, userType } });
            }, 1800);

        } catch (e) {
            const err = e as AxiosError;

            if (err.response) {
                toast.error(`${err.response.data}`, {
                    position: "bottom-center",
                    autoClose: 750,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                    closeButton: false,
                    icon: true,
                });
            }
        }
    }

    const navigateToRegister = () => {
        navigate("/register");
    }

    const keyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 13) {
            submitHandler();
        }
    }

    return (
        <div className={classes["login-page"]}>
            <div className={classes["login-container"]} onKeyDown={keyPress}>
                <span className={classes["login-header"]}>Please fill this form:</span>

                <DefaultUsers />

                <MyInput icon="key" inputLabel={"Email"} isRequired={true}
                    type={{
                        type: "email",
                        placeholder: "example@email.com",
                        onChange: usernameHandler,
                        value: enteredUsername
                    }}
                />
                <Divider className={classes["divider"]} />

                <MyInput icon="key" inputLabel={"Password"} isRequired={true}
                    type={{
                        type: "password",
                        placeholder: "Password",
                        onChange: passwordHandler,
                        value: enteredPassword,
                    }}
                />
                <Divider className={classes["divider"]} />

                <MyButton value="Log in!" onClick={submitHandler} isDisabled={isSubmitDisabled} size={"big"} color={"green"} />

                <span className={classes["not-a-member"]}>Not a member? <label className={classes["register-label"]} onClick={navigateToRegister}>Go ahead and register today</label></span>
            </div>
        </div >
    );
}

export default Login;