
import './App.css';
import Bookmark from './pages/Bookmark';
import Home from './pages/Home';
import Index from './pages/Index';


import Profile from './pages/Profile';
import AddJourney from './pages/AddJourney';
import Detail from './pages/Detail';

import {useContext, useEffect} from 'react'
import {UserContext} from './context/UserContext'
import {API, setAuthToken} from './config/api'
import { Routes, Route, useNavigate, Redirect, useParams, Navigate } from 'react-router-dom'
import { Card } from 'react-bootstrap';
import DetailLogin from './pages/DetailLogin';
import CardLogin from './components/CardLogin';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  let navigate = useNavigate();
  let { id } = useParams();
  const [state, dispatch] = useContext(UserContext);
  console.clear();
  // console.log(state);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }  
    
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
  
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }
  
      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;
  
      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (localStorage.token) {
      checkUser();}
  }, []);

  return (
    
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/home" element={<Index />}/>
      <Route path="/bookmark" element={<Bookmark />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/add-journey" element={<AddJourney />}/>
      <Route path="/detail/:id" element={<Detail />}/>
      <Route path="/artikel/:id" element={<Card />}/>



      <Route path="/detail-after-login/:id" element={<DetailLogin />}/>
      <Route path="/artikel-after-login/:id" element={<CardLogin />}/>




      
    </Routes>
  );
}

export default App;
