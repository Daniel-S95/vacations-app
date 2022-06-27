import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ActionType } from "../../redux/action-type";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import classes from "./LikeVacation.module.css";
import Likes from "./LikesBadge";

type Props = {
    data: [{
        id: number,
        city: string,
        vacationLikes: number
    }, number];
}

const AddToFavorites = (props: Props) => {
    const likeStatus = props.data[1];
    const vacationData = props.data[0];

    let isUserLogged = localStorage.getItem("token");
    let homePageRedirection: NodeJS.Timeout;

    const [isLiked, setIsLiked] = useState(likeStatus);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLiked(likeStatus);
    }, [likeStatus]);

    const dispatch = useDispatch();

    let vacationId = +vacationData.id;

    const favoriteVacationHandler = async () => {
        if (!isUserLogged) {
            clearTimeout(homePageRedirection);
            toast.dismiss();

            toast.warning(`Please log in to use this feature`, {
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

            homePageRedirection = setTimeout(() => {
                navigate("/login");
            }, 1800);

            return;
        }

        const userToken = axios.defaults.headers.common['Authorization'];

        if (isLiked === 0) {
            let updatedVacation = { ...vacationData, isLiked: 1 };

            try {
                const likeDetails = { userToken, vacationId };
                await axios.post("http://localhost:3001/likes", likeDetails);
                dispatch({ type: ActionType.LikeVacationStatus, payload: updatedVacation });

            } catch (e) {
                console.error(e);
            }
        } else {
            let updatedVacation = { ...vacationData, isLiked: 0 };

            try {
                await axios.delete(`http://localhost:3001/likes/${userToken}/${vacationId}`);
                dispatch({ type: ActionType.LikeVacationStatus, payload: updatedVacation });

            } catch (e) {
                console.error(e);
            }
        }
    }

    return (
        <span className={classes["add-to-favorites__container"]}>
            {isLiked === 1 && <MdOutlineFavorite size={30} color={"red"} onClick={favoriteVacationHandler} />}
            {isLiked === 0 && <MdOutlineFavoriteBorder size={30} onClick={favoriteVacationHandler} />}

            {isUserLogged && <Likes amount={props.data[0].vacationLikes} />}
        </span>
    );
}

export default AddToFavorites;