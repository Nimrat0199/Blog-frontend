import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import {login, logout} from "./store/authSlice"
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Load from './components/Load'
import { useNavigate } from 'react-router-dom'

function App() {
  const user = useSelector((state)=>state.auth.userData);
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    fetch("/api/user", {
      credentials: "include", 
    })
    .then((resp) => resp.json())
    .then((userData)=>{
      if (userData) {
        console.log("userDataa :",userData)
        dispatch(login(userData))
      } else {
        dispatch(logout());
        console.log("login required")
      }
    })
    .catch((err) => console.error("Error fetching user:", err))
    .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    console.log('User updated:', user);
  }, [user]);



  return !loading ? (
    <>
    <Header/>
    <Outlet/>
    </>
  ) : <Load/>
       
    
  
}

export default App;