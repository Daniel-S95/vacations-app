import axios, { AxiosError } from "axios";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IVacation } from "../../models/IVacation";
import { ActionType } from "../../redux/action-type";
import { AppState } from "../../redux/app-state";
import VacationCard from "../VacationCard/VacationCard";
import MyCarousel from "../UI/MyCarousel";

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import classes from "./VacationContainer.module.css";

import { ConnectContext, SocketContext } from "../../context/socket-container";
import MyScrollProgress from "../UI/MyScrollProgress";

const VacationContainer = () => {

    const userState = useSelector((state: AppState) => state.userState);
    const vacationArray = useSelector((state: AppState) => state.vacationsArray);

    const dispatch = useDispatch();

    let socket = useContext(SocketContext);
    let connect = useContext(ConnectContext);

    useEffect(() => {
        document.title = "GlobeFlight - Your next vacation is here";
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("add-vacation", (vacation: IVacation) => {
                dispatch({ type: ActionType.AddVacation, payload: vacation });
            });

            socket.on("delete-vacation", (vacationId: number) => {
                dispatch({ type: ActionType.DeleteVacation, payload: vacationId });
            });

            socket.on("update-vacation", (vacation: IVacation) => {
                dispatch({ type: ActionType.UpdateVacation, payload: vacation });
            });

            socket.on("like-vacation", (vacationId: number) => {
                dispatch({ type: ActionType.IncreaseLikesCounter, payload: vacationId });
            });

            socket.on("dislike-vacation", (vacationId: number) => {
                dispatch({ type: ActionType.DecreaseLikesCounter, payload: vacationId });
            });
        }
    }, [socket]);

    useEffect(() => {
        initVacations();

        if (localStorage.getItem("token")) {
            let token = JSON.parse(localStorage.getItem("token")!);
            connect("Bearer " + token.token);
        }
    }, [userState]);

    const initVacations = async () => {
        try {
            const response = await axios.get<IVacation[]>("http://localhost:3001/vacations");
            let vacationsArray = response.data;
            dispatch({ type: ActionType.GetAllVacations, payload: vacationsArray });
        }
        catch (e) {
            const err = e as AxiosError;

            toast.error(`${err}`, {
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

    return (
        <>
            <MyScrollProgress />
            <MyCarousel />

            <div className={classes["vacations-container"]}>
                {vacationArray.length > 0 &&
                    vacationArray.map((vacation: IVacation) => <VacationCard key={vacation.id} vacation={vacation} isLiked={vacation.isLiked} isEdit={false} />)
                }

                {/* Just to cover the case of no vacations... */}
                {vacationArray.length === 0 &&
                    <span className={classes["no-vacations"]}>
                        Currently, no vacations were found. Please try again later.
                    </span>
                }
            </div>
        </>
    );
}

export default VacationContainer;