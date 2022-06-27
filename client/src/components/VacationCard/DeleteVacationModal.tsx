import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { ActionType } from "../../redux/action-type";

import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { toast } from "react-toastify";
import { ModalProps } from "semantic-ui-react";
import { IVacation } from "../../models/IVacation";

import classes from "./DeleteVacationModal.module.css";

const MyModal = (props: ModalProps) => {
    const dispatch = useDispatch();
    const vacationData = props.data;

    const deleteVacationHandler = async () => {
        props.onHide();
        const vacationId = vacationData.id;

        try {
            await axios.delete<IVacation[]>(`http://localhost:3001/vacations/${vacationId}`);
            dispatch({ type: ActionType.DeleteVacation, payload: vacationId });

            toast.success(`Vacation to ${vacationData.city} has been deleted successfully!`, {
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

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName={classes["my-modal"]}
        >
            <Modal.Header closeButton={false}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Vacation?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={`${"text-center"} ${classes["padding"]}`}>
                Are you sure you want to delete the vacation to {vacationData.city}, {vacationData.country}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={deleteVacationHandler}>Yes</Button>
                <Button variant="danger" onClick={props.onHide}>No</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyModal;