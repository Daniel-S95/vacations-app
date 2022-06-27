import { useState } from "react";

import EditVacationModal from "./EditVacationModal";
import MyModal from "./DeleteVacationModal";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import classes from "./EditRemoveButtons.module.css";

type Props = {
    data: [{
        id: number,
        city: string,
        startDate: string,
        endDate: string
    }, number]
};

const EditRemoveButtons = (props: Props) => {

    const vacationData = props.data[0];
    const isVacationLiked = props.data[1];

    const [editVacationModalShow, setEditVacationModalShow] = useState(false);
    const [deleteVacationModalShow, setDeleteVacationModalShow] = useState(false);

    const editVacationHandler = () => {
        setEditVacationModalShow(true);
    }
    const openDeleteVacationModal = () => {
        setDeleteVacationModalShow(true);
    }

    const convertDateFormat = (unformattedDate: string) => {
        let formattedDate = new Date(new Date(unformattedDate).getTime() + Math.abs(new Date(unformattedDate).getTimezoneOffset() * 60000)).toJSON().slice(0, 10);
        return formattedDate;
    }

    const formattedVacations = { ...vacationData, startDate: convertDateFormat(vacationData.startDate), endDate: convertDateFormat(vacationData.endDate), isLiked: isVacationLiked };

    return (
        <span className={classes["edit-remove-buttons-container"]}>
            <AiFillEdit size={20} className={classes["edit-button"]} onClick={editVacationHandler} />
            <AiFillDelete size={20} className={classes["delete-button"]} onClick={openDeleteVacationModal} />

            <EditVacationModal
                data={formattedVacations}
                show={editVacationModalShow}
                keyboard={false}
                backdrop="static"
                onHide={() => setEditVacationModalShow(false)}
            />

            <MyModal
                data={formattedVacations}
                show={deleteVacationModalShow}
                keyboard={false}
                onHide={() => setDeleteVacationModalShow(false)}
            />

        </span>
    );
}

export default EditRemoveButtons;