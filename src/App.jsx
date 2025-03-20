import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

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
  }, [authStatus, dispatch, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
