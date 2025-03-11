import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import authService from "../appwrite/auth";

function Logout() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      // most of the things in appwrite are promises so .then is necessary
      dispatch(logout());
    });
  };
  return (
    <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
      Logout
    </button>
  );
}

export default Logout;
