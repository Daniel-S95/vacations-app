import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { ActionType } from '../../redux/action-type';
import { AppState } from '../../redux/app-state';
import MyButton from '../UI/MyButton';

import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarBrand,
    MDBCollapse,
    MDBIcon,
    MDBNavbarToggler
} from 'mdb-react-ui-kit';
import classes from "./MainHeader.module.css";

const MainHeader = () => {

    const userState = useSelector((state: AppState) => state.userState);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showBasic, setShowBasic] = useState(false);

    const LoggedUserType = userState.userType;
    const userName = userState.userName;

    const registerHandler = () => {
        setShowBasic(false);
        navigate("/register");
    }

    const loginHandler = () => {
        setShowBasic(false);
        navigate("/login");
    }

    const logoutHandler = () => {
        dispatch({ type: ActionType.UserLoggedOut });
        localStorage.removeItem("token");
        axios.defaults.headers.common['Authorization'] = "";
    }

    const likesChartHandler = () => {
        setShowBasic(false);
        navigate("/likes-chart");
    }

    const addVacationHandler = () => {
        setShowBasic(false);
        navigate("/add-vacation");
    }

    const homepageHandler = () => {
        setShowBasic(false);
        navigate("/");
    }

    return (
        <>
            <MDBNavbar expand='lg' dark bgColor='primary' className={`fixed-top ${classes["nav-bar"]}`}>
                <MDBContainer fluid>
                    <MDBNavbarBrand>GlobeFlight</MDBNavbarBrand>

                    <MDBNavbarToggler
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowBasic(!showBasic)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar show={showBasic}>
                        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                            <MDBNavbarItem style={{ cursor: "pointer" }}>
                                <MDBNavbarLink active aria-current='page' onClick={homepageHandler}>
                                    Home
                                </MDBNavbarLink>
                            </MDBNavbarItem>

                            {LoggedUserType === "ADMIN" &&
                                <>
                                    <MDBNavbarItem style={{ cursor: "pointer" }}>
                                        <MDBNavbarLink active aria-current='page' onClick={addVacationHandler}>
                                            Add new vacation
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>

                                    <MDBNavbarItem style={{ cursor: "pointer" }}>
                                        <MDBNavbarLink active aria-current='page' onClick={likesChartHandler}>
                                            Likes chart
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>
                                </>
                            }


                            {!LoggedUserType &&
                                <MDBNavbarItem className={classes["right-navbar"]}>
                                    <MyButton value={"Register"} onClick={registerHandler} />
                                    <MyButton value={"Login"} onClick={loginHandler} />
                                </MDBNavbarItem>}

                            {LoggedUserType &&
                                <MDBNavbarItem className={classes["right-navbar"]}>
                                    {LoggedUserType && <>
                                        <label className={classes["user-info"]}>Hello, {userName}!</label>
                                        <MyButton value={"Logout"} onClick={logoutHandler} />
                                    </>}
                                </MDBNavbarItem>}

                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
}

export default MainHeader;