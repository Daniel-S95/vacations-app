import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';
import './App.css';
import AddVacation from './components/Admin/AddVacation';
import MainHeader from './components/Header/MainHeader';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import VacationContainer from './components/VacationsContainer/VacationContainer';

import jwt_decode from 'jwt-decode';
import { ActionType } from './redux/action-type';

import { ToastContainer } from 'react-toastify';
import Chart from './components/Admin/LikesChart';
import Footer from './components/Footer/Footer';
import { useEffect } from 'react';
import SocketContainer, { } from './context/socket-container';

type Token = {
  userId: number;
  userName: string;
  userType: string;
};

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    let userId;

    if (localStorage.getItem("token")) {

      let token = JSON.parse(localStorage.getItem("token")!);

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.token;

      let userName = token.userName;
      let decoded: Token = jwt_decode(token.token);
      userId = decoded.userId;
      let userType = decoded.userType;

      dispatch({ type: ActionType.UserLoggedIn, payload: { userId, userName, userType } });

    } else {
      userId = 0;
    }
  }, []);

  return (
    <div className="App">
      <SocketContainer>
        <header>
          <MainHeader />
        </header>

        <ToastContainer limit={1} pauseOnFocusLoss={false} />

        <main>
          <Routes>
            <Route path="/" element={<VacationContainer />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/likes-chart" element={<Chart />} />
            <Route path="/add-vacation" element={<AddVacation />} />
          </Routes>
        </main>

        <footer>
          <Footer />
        </footer>
      </SocketContainer>
    </div>
  );
}

export default App;
