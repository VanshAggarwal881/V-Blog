import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch;

  // useEffect : when the application is loaded ...ask whether the user is logged in or not
  useEffect(() => {
    authService
      .getCurrentUser() // userData is a variable which has to dispatch to login as we have two fields in authSlice in login - status and - userData
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          // logout because we tried to receive data but didn't get it , so atleast the state should stay updated
          dispatch(logout());
        }
      })
      .finally(() => {
        setloading(false);
      });
  }, []);
  return <></>;
}

export default App;
