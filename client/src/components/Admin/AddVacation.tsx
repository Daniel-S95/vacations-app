import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import { IVacation } from "../../models/IVacation";
import MyButton from "../UI/MyButton";
import MyInput from "../UI/MyInput";
import MyDatePicker from "../UI/MyDatePicker";

import { Divider } from 'semantic-ui-react';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import classes from "./AddVacation.module.css";
import MyScrollProgress from "../UI/MyScrollProgress";

const AddVacation = () => {

    useEffect(() => {
        window.scroll(0, 0);
        document.title = "GlobeFlight - Add a new vacation";
    }, []);

    const navigate = useNavigate();

    const [enteredCity, setEnteredCity] = useState("");
    const [enteredCountry, setEnteredCountry] = useState("");
    const [enteredDescription, setEnteredDescription] = useState("");
    const [enteredPrice, setEnteredPrice] = useState(1);
    const [enteredImageURL, setEnteredImageURL] = useState("");
    const [enteredStartDate, setEnteredStartDate] = useState(new Date().toString());
    const [enteredEndDate, setEnteredEndDate] = useState(new Date().toString());

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    let homePageRedirection: NodeJS.Timeout;

    let todaysDateAndTime = new Date();
    let todaysDate = todaysDateAndTime.toJSON().slice(0, 10).replace(/-/g, '-');

    useEffect(() => {
        const todaysDateToString = todaysDate.toString();
        const selectedEndDate = enteredEndDate.toString();
        const selectedStartDate = enteredStartDate.toString();
        const isFormValid = enteredCity.trim().length >= 3 && enteredCountry.trim().length >= 3 && enteredPrice > 0 && enteredImageURL.trim().length > 5 && enteredDescription.trim().length > 0 && todaysDateToString !== selectedEndDate && new Date(selectedEndDate) > new Date(selectedStartDate);

        if (isFormValid) {
            setIsSubmitDisabled(false);
        } else {
            setIsSubmitDisabled(true);
        }
    }, [enteredCity, enteredCountry, enteredPrice, enteredImageURL, enteredDescription, enteredStartDate, enteredEndDate]);

    const submitHandler = async () => {
        if (isSubmitDisabled) {
            return;
        }

        clearTimeout(homePageRedirection);
        const vacationData = { city: enteredCity, country: enteredCountry, description: enteredDescription, price: enteredPrice, imageURL: enteredImageURL, startDate: convertDate(new Date(enteredStartDate)), endDate: convertDate(new Date(enteredEndDate)) };
        await axios.post<IVacation[]>("http://localhost:3001/vacations", vacationData);

        toast.success(`Vacation to ${enteredCity} has been added successfully!`, {
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
    }

    const cityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredCity(e.target.value.trim());
    }

    const countryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredCountry(e.target.value.trim());
    }

    const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredDescription(e.target.value);
    }

    const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (+e.target.value < 1) {
            setEnteredPrice(1);
        } else if (+e.target.value > 50000) {
            setEnteredPrice(enteredPrice);
        } else {
            setEnteredPrice(+e.target.value.toString().replace(/\./g, ""));
        }
    }

    const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredImageURL(e.target.value.trim());
    }

    const convertDate = (unformattedDate: Date) => {
        let formattedDate = new Date(unformattedDate.getTime() - (unformattedDate.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
        return formattedDate;
    }

    const dateHandler = (e: { startDate: string, endDate: string, key: string }) => {
        setEnteredStartDate(e.startDate);
        setEnteredEndDate(e.endDate);
    }

    const keyPress = (e: React.KeyboardEvent<HTMLElement>) => {
        const targetType = (e.target as HTMLInputElement).type;

        if (e.keyCode === 13 && targetType !== "textarea") {
            submitHandler();
        }
    }

    return (
        <>
            <MyScrollProgress />
            <div className={classes["add-vacation-page"]}>

                <div className={`${classes["add-vacation-container"]} ${classes["flex-container-column"]}`} onKeyDown={keyPress} >

                    <div className={classes["flex-container-row"]}>

                        <span className={classes["flex-item"]}>
                            <MyInput icon="building" inputLabel={"City"} isRequired={true} restrictions={"Must be 3-20 characters"} tabIndex={1}
                                type={{
                                    type: "text",
                                    placeholder: "City",
                                    maxLength: 20,
                                    onChange: cityHandler,
                                    value: enteredCity
                                }} />
                            <Divider className={classes["divider"]} />

                            <MyInput icon="dollar" inputLabel={"Price"} isRequired={true} restrictions={"Price must be at least $1"} tabIndex={3}
                                type={{
                                    type: "number",
                                    placeholder: "Price",
                                    min: 1,
                                    max: 50000,
                                    step: 1,
                                    onChange: priceHandler,
                                    value: enteredPrice.toString()
                                }} />
                            <Divider className={classes["divider"]} />
                        </span>

                        <span className={classes["flex-item"]}>
                            <MyInput icon="flag" inputLabel={"Country"} isRequired={true} restrictions={"Must be 3-25 characters"} tabIndex={2}
                                type={{
                                    type: "text",
                                    placeholder: "Country",
                                    maxLength: 25,
                                    onChange: countryHandler,
                                    value: enteredCountry
                                }} />
                            <Divider className={classes["divider"]} />


                            <MyInput icon="image" inputLabel={"Image URL"} isRequired={true} restrictions={"Enter a valid URL"} tabIndex={4}
                                type={{
                                    type: "text",
                                    placeholder: "Image URL",
                                    onChange: imageHandler,
                                    maxLength: 200,
                                    value: enteredImageURL
                                }} />
                            <Divider className={classes["divider"]} />
                        </span>
                    </div>

                    <span className={classes["flex-item"]} style={{ width: "100%" }}>
                        <MyInput inputLabel={"Description"} isRequired={true} restrictions={`${enteredDescription.length}/500 allowed characters`} tabIndex={5}
                            type={{
                                type: "textarea",
                                placeholder: "A description about the vacation or the destination",
                                onChange: descriptionHandler,
                                maxLength: 500,
                                value: enteredDescription
                            }} />
                        <Divider className={classes["divider"]} />
                    </span>

                    <span style={{ width: "100%" }}>
                        <MyDatePicker startDate={enteredStartDate} endDate={enteredEndDate} onChange={dateHandler} dateHandler={dateHandler} label={"Choose Vacation Dates"} />
                    </span>

                    <span className={classes["flex-item"]}>
                        <MyButton value="Add Vacation!" style={{ margin: "0 auto" }} size={"large"} onClick={submitHandler} isDisabled={isSubmitDisabled} />
                    </span>
                </div >
                <br />
            </div >
        </>
    );
}

export default AddVacation;