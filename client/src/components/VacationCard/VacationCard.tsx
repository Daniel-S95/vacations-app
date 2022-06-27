import { IVacation } from "../../models/IVacation";
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBRow, MDBCol, MDBCardSubTitle } from 'mdb-react-ui-kit';

import classes from './VacationCard.module.css';
import EditRemoveButtons from "./EditRemoveButtons";
import AddToFavorites from "./LikeVacation";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/app-state";
import { Divider } from "semantic-ui-react";

type Props = {
    vacation: IVacation,
    isLiked: number,
    isEdit: boolean
};

const VacationCard = (props: Props) => {

    const vacationData = props.vacation;
    const userState = useSelector((state: AppState) => state.userState);
    const isEdit = props.isEdit;

    const convertDate = (sqlDate: string) => {
        return new Intl.DateTimeFormat('en-GB').format(new Date(sqlDate));
    }

    const priceFormatter = (unformattedPrice: number) => {
        let formattedPrice = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(unformattedPrice);

        return formattedPrice;
    }

    return (
        <MDBRow className='row-cols-1 row-cols-md-3 g-4' style={{ margin: "0px 10px 30px 10px" }}>
            <MDBCol className={classes["whole-card"]}>
                <MDBCard className='h-100' style={!isEdit ? { backgroundColor: "#D6F6FF" } : {}}>
                    <MDBCardImage
                        src={vacationData.imageURL}
                        alt={vacationData.city}
                        position='top'
                    />
                    <MDBCardBody className={classes["card-body"]}>
                        <MDBCardTitle tag={"h4"}>{props.vacation.city}</MDBCardTitle>
                        <MDBCardSubTitle className="card-subtitle mb-2 text-muted" tag={"h6"}>{vacationData.country}</MDBCardSubTitle>

                        <Divider className={classes["divider"]} />
                        <MDBCardText className={classes["vacation-description"]}>
                            {vacationData.description}
                        </MDBCardText>
                        <Divider className={classes["divider"]} />

                        <MDBCardTitle tag={"h3"}>{priceFormatter(vacationData.price)}</MDBCardTitle>
                        <MDBCardSubTitle className="card-subtitle mb-2 text-muted">{convertDate(vacationData.startDate)} - {convertDate(vacationData.endDate)}</MDBCardSubTitle>
                    </MDBCardBody>
                    {!isEdit && <MDBCardFooter className="d-flex align-items-center justify-content-center" style={{ height: "40px" }}>
                        {userState.userType === "ADMIN" && <EditRemoveButtons data={[vacationData, props.isLiked]} />}
                        {userState.userType === "USER" && <AddToFavorites data={[vacationData, props.isLiked]} />}
                        {!userState.userType && <AddToFavorites data={[vacationData, props.isLiked]} />}
                    </MDBCardFooter>
                    }
                </MDBCard>
            </MDBCol>
        </MDBRow >
    );
}

export default VacationCard;