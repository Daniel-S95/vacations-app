import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router";

import MyButton from "../UI/MyButton";
import MyInput from "../UI/MyInput";

import PasswordStrengthBar from "react-password-strength-bar";
import isValidEmail from "is-valid-email";
import passwordValidator from "password-validator";
import { Divider } from "semantic-ui-react";
import { toast } from 'react-toastify';

import classes from "./Register.module.css";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    useEffect(() => {
        document.title = "GlobeFlight - Register Now";
    }, []);

    const navigate = useNavigate();
    let homePageRedirection: NodeJS.Timeout;

    const [enteredFirstName, setEnteredFirstName] = useState("");
    const [eneteredLastName, setEneteredLastName] = useState("");
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [enteredRepeatPassword, setEnteredRepeatPassword] = useState("");

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [isPasswordIdentical, setIsPasswordIdentical] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isFirstNameValid, setIsFirstNameValid] = useState(false);
    const [isPasswordHasSpaces, setIsPasswordHasSpaces] = useState(false);

    const schema = new passwordValidator().is().has().not().spaces();

    useEffect(() => {
        if (isEmailValid && isFirstNameValid && isPasswordIdentical && enteredPassword.length > 3 && isPasswordHasSpaces) {
            setIsSubmitDisabled(false);
        } else {
            setIsSubmitDisabled(true);
        }

    }, [isEmailValid, isFirstNameValid, enteredPassword, isPasswordIdentical, isPasswordHasSpaces]);

    const submitHandler = async () => {

        if (isSubmitDisabled) {
            return;
        }

        clearTimeout(homePageRedirection);

        try {
            const userData = { firstName: enteredFirstName, lastName: eneteredLastName, email: enteredEmail, password: enteredPassword };
            await axios.post("http://localhost:3001/users", userData);

            toast.success(`${enteredFirstName}, you've registered successfully!`, {
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

    const firstNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredFirstName(removeSpecialsAndSpaces(e.target.value));

        if (e.target.value.trim().length > 2 && !e.target.value.includes(" ")) {
            setIsFirstNameValid(true);
        } else {
            setIsFirstNameValid(false);
        }
    }

    const lastNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEneteredLastName(removeSpecialsAndSpaces(e.target.value));
    }

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredEmail(e.target.value.trim());

        if (isValidEmail(e.target.value)) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    }

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredPassword(e.target.value.trim());

        if (e.target.value === enteredRepeatPassword) {
            setIsPasswordIdentical(true);
        } else {
            setIsPasswordIdentical(false);
        }

        if (schema.validate(e.target.value)) {
            setIsPasswordHasSpaces(true);
        } else {
            setIsPasswordHasSpaces(false);
        }

    }

    const repeatPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredRepeatPassword(e.target.value.trim());

        if (e.target.value === enteredPassword) {
            setIsPasswordIdentical(true);
        } else {
            setIsPasswordIdentical(false);
        }
    }

    const removeSpecialsAndSpaces = (str: string) => {
        return str.replace(/[^a-zA-Z]+/g, '').trim();
    }

    const navigateToLogin = () => {
        navigate("/login");
    }

    const keyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 13) {
            submitHandler();
        }
    }

    return (
        <div className={classes["register-page"]}>
            <div className={classes["register-container"]} onKeyDown={keyPress}>

                <span className={classes["register-header"]}>Please fill this form:</span>

                <span style={{ display: "block", color: "red" }}>Fields marked with (*) are required</span>

                <Divider className={classes["divider"]} />

                <div className={classes["flex-container"]}>
                    <span className={classes["flex-item"]}>
                        <MyInput icon="user" inputLabel={"First Name"} isRequired={true} restrictions={"Max 15 characters"} showAsterisk={true}
                            type={{
                                type: "text",
                                placeholder: "John",
                                onChange: firstNameHandler,
                                value: enteredFirstName,
                                maxLength: 15
                            }} />
                    </span>

                    <span className={classes["flex-item"]}>
                        <MyInput icon="user" inputLabel={"Last Name"}
                            type={{
                                type: "text",
                                placeholder: "Doe",
                                onChange: lastNameHandler,
                                value: eneteredLastName,
                                maxLength: 20
                            }} />
                    </span>

                    <span className={classes["flex-item"]}>
                        <MyInput icon="user" inputLabel={"Email"} isRequired={true} showAsterisk={true}
                            type={{
                                type: "email",
                                placeholder: "example@email.com",
                                onChange: emailHandler,
                                value: enteredEmail,
                                maxLength: 30
                            }} />
                        {!isEmailValid && enteredEmail.length > 5 && <span className={classes["input-user-error"]}>Your entered email is invalid</span>}
                    </span>

                </div>

                <Divider className={classes["divider"]} />

                <div className={classes["flex-container"]}>
                    <span className={classes["flex-item"]}>
                        <MyInput icon="key" inputLabel={"Password"} isRequired={true} restrictions={"Minimum 4 characters, no spaces allowed!"} showAsterisk={true}
                            type={{
                                type: "password",
                                placeholder: "Password",
                                onChange: passwordHandler,
                                value: enteredPassword,
                            }} />
                        {!isPasswordHasSpaces && enteredPassword.length > 0 && < div className={classes["input-user-error"]}>Your password can't contain spaces!</div>}
                        {isPasswordHasSpaces && enteredPassword.length > 0 && <PasswordStrengthBar password={enteredPassword} minLength={4} className={classes["password-bar"]} scoreWordClassName={classes["password-bar-score-words"]} shortScoreWord={"Too Short (Minimum of 4 chars)"} barColors={['#dbf7ff', '#ef4836', '#f6b44d', '#2b90ef', '#25c281']} scoreWords={['(Very Weak)', '(Weak)', '(Medium)', '(Strong)', '(Very Strong!)']} />}
                    </span>

                    <span className={classes["flex-item"]}>
                        <MyInput icon="key" inputLabel={"Repeat Password"} isRequired={true} showAsterisk={true}
                            type={{
                                type: "password",
                                placeholder: "Repeat Password",
                                onChange: repeatPasswordHandler,
                                value: enteredRepeatPassword,
                            }} />
                        {!isPasswordIdentical && enteredPassword.length > 0 && enteredRepeatPassword.length > 4 && <div className={classes["input-user-error"]}>Your passwords are not identical!</div>}
                    </span>
                </div>

                <Divider className={classes["divider"]} />

                <MyButton value="Register!" style={{ "marginTop": "10px" }} onClick={submitHandler} isDisabled={isSubmitDisabled} size={"big"} color={"green"} />

                <span className={classes["already-a-member"]}>Alreay registered? <label className={classes["login-label"]} onClick={navigateToLogin}>Click here to login</label></span>
            </div>
        </div>
    );
}

export default Register;