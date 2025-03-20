import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        // most of the things in appwrite are promises so .then is necessary
        dispatch(logout());
        navigate("/");

        console.log("logging out");
      })
      .catch((error) => {
        console.error("Logout failed :", error);
      });
  };
  return (
    <button
      className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default Logout;
