import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { clearPosts } from "../store/postSlice";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await authService.logout();
      dispatch(clearPosts()); // clear post slice
      dispatch(logout()); // then logout -> clear auth slice
      navigate("/");
    } catch (error) {
      console.error("logout failed", error);
    }
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
