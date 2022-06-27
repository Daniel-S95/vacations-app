import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import MyDatePicker from "../UI/MyDatePicker";
import { Divider, ModalProps } from "semantic-ui-react";
import MyInput from "../UI/MyInput";
import { IVacation } from "../../models/IVacation";

import 'react-toastify/dist/ReactToastify.css';
import classes from "./EditVacationModal.module.css";
import VacationCard from "./VacationCard";

type DateType = {
    startDate: Date,
    endDate: Date,
    key: string
}

function EditVacationModal(props: ModalProps) {

    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [vacationData, setVacationData] = useState(props.data);
    const [originalVacationData, setOriginalVacationData] = useState(vacationData);
    const [enteredCity, setEnteredCity] = useState(vacationData.city);
    const [enteredCountry, setEnteredCountry] = useState(vacationData.country);
    const [enteredDescription, setEnteredDescription] = useState(vacationData.description);
    const [enteredPrice, setEnteredPrice] = useState(vacationData.price);
    const [enteredImageURL, setEnteredImageURL] = useState(vacationData.imageURL);
    const [enteredStartDate, setEnteredStartDate] = useState(vacationData.startDate);
    const [enteredEndDate, setEnteredEndDate] = useState(vacationData.endDate);

    useEffect(() => {
        if (JSON.stringify(vacationData) === JSON.stringify(originalVacationData)) {
            setIsSaveDisabled(true);
        } else {
            const isFormValid = enteredCity.trim().length >= 3 && enteredCountry.trim().length >= 3 && enteredPrice > 0 && enteredImageURL.trim().length > 5 && enteredDescription.trim().length > 0 && new Date(enteredEndDate) > new Date(enteredStartDate);
            if (isFormValid) {
                setIsSaveDisabled(false);
            } else {
                setIsSaveDisabled(true);
            }
        }
    }, [enteredCity, enteredCountry, enteredDescription, enteredPrice, enteredImageURL, enteredStartDate, enteredEndDate]);

    const cityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let enteredValue = e.target.value.trim();
        setEnteredCity(enteredValue);
        setVacationData({ ...vacationData, city: enteredValue });
    }

    const countryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let enteredValue = e.target.value.trim();
        setEnteredCountry(enteredValue);
        setVacationData({ ...vacationData, country: enteredValue });
    }

    const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let enteredValue = e.target.value;
        setEnteredDescription(enteredValue);
        setVacationData({ ...vacationData, description: enteredValue });
    }

    const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredPrice(+e.target.value);
        setVacationData({ ...vacationData, price: +e.target.value });
    }

    const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let enteredValue = e.target.value.trim();
        setEnteredImageURL(enteredValue);
        setVacationData({ ...vacationData, imageURL: enteredValue });
    }

    const closeHandler = () => {
        setEnteredCity(originalVacationData.city);
        setEnteredCountry(originalVacationData.country);
        setEnteredDescription(originalVacationData.description);
        setEnteredPrice(originalVacationData.price);
        setEnteredImageURL(originalVacationData.imageURL);
        setEnteredStartDate(originalVacationData.startDate);
        setEnteredEndDate(originalVacationData.endDate);
        setVacationData(originalVacationData);

        props.onHide();
    }

    const saveHandler = async () => {
        if (isSaveDisabled) {
            return;
        }

        const editedVacation = { id: props.data.id, city: enteredCity, country: enteredCountry, description: enteredDescription, price: enteredPrice, imageURL: enteredImageURL, startDate: enteredStartDate, endDate: enteredEndDate };

        try {
            await axios.put<IVacation[]>(`http://localhost:3001/vacations/${editedVacation.id}`, editedVacation);

            props.onHide();
            setOriginalVacationData(editedVacation);
            setVacationData(editedVacation);
            setIsSaveDisabled(true);

            toast.dismiss();

            toast.success(`Vacation was edited successfully!`, {
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
                toastId: 'success1'
            });
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

    const convertDate = (unformattedDate: Date) => {
        let formattedDate = new Date(unformattedDate.getTime() - (unformattedDate.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
        return formattedDate;
    }

    const dateHandler = (e: DateType) => {
        setEnteredStartDate(convertDate(e.startDate));
        setEnteredEndDate(convertDate(e.endDate));

        setVacationData({ ...vacationData, startDate: convertDate(e.startDate), endDate: convertDate(e.endDate) });
    }

    const keyPress = (e: React.KeyboardEvent<HTMLElement>) => {
        const targetType = (e.target as HTMLInputElement).type;

        if (e.keyCode === 13 && targetType !== "textarea") {
            saveHandler();
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onKeyDown={keyPress}
        >
            <Modal.Header closeButton={false}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Vacation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <div className={classes["modal-body-container"]}>
                    <div className={classes["modal-inner-items"]}>
                        <MyInput icon="building" inputLabel={"City"} isRequired={true}
                            type={{
                                type: "text",
                                placeholder: "City",
                                maxLength: 20,
                                onChange: cityHandler,
                                value: enteredCity
                            }} />
                        <Divider />

                        <MyInput icon="flag" inputLabel={"Country"} isRequired={true}
                            type={{
                                type: "text",
                                placeholder: "Country",
                                maxLength: 25,
                                onChange: countryHandler,
                                value: enteredCountry
                            }} />
                        <Divider />

                        <MyInput inputLabel={"Description"} isRequired={true}
                            type={{
                                type: "textarea",
                                placeholder: "A description about the vacation",
                                maxLength: 500,
                                onChange: descriptionHandler,
                                value: enteredDescription
                            }} />
                        <Divider />

                        <MyInput icon="dollar" inputLabel={"Price"} isRequired={true}
                            type={{
                                type: "number",
                                placeholder: "Price",
                                min: 1,
                                max: 50000,
                                step: 1,
                                onChange: priceHandler,
                                value: enteredPrice
                            }} />
                        <Divider />

                        <MyInput icon="image" inputLabel={"Image URL"} isRequired={true}
                            type={{
                                type: "text",
                                placeholder: "Image URL",
                                maxLength: 200,
                                onChange: imageHandler,
                                value: enteredImageURL
                            }} />
                        <Divider />

                        <MyDatePicker min={true} startDate={enteredStartDate} endDate={enteredEndDate} onChange={dateHandler} dateHandler={dateHandler} label={"Choose vacation dates"} />

                    </div>

                    <div className={`${classes["modal-inner-items"]} ${classes["vacation-preview"]}`}>
                        <label className={classes["preview-header"]}>Preview of edited vacation:</label>
                        <VacationCard key={vacationData.id} vacation={vacationData} isLiked={0} isEdit={true} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={saveHandler} disabled={isSaveDisabled}>Save</Button>
                <Button onClick={closeHandler}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditVacationModal;