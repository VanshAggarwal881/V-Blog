/*
MAKING OF A LOGIN COMPONENT WHEN USING ANY BACKEND AS A SERVICE AND STATE MANAGEMENT TOOL LIKE RTK.
* 1. Link : to take user somewhere after clicking
* 2. Navigate : for safety , take both
TODO: 3.import login from auth slice ..... for using in different components
 * 3. use useDispatch : tell Redux to update the state accordingly.
* 4. authService from appwrite : 
? This is the actual login engine — the thing that connects to your backend/auth provider.
! Example:
Let’s say 
authService.loginUser(email, password) 
talks to Appwrite's authentication API and 
! returns 
the logged-in user session.

* 5. Last : useForm as we are using React-Hook-Form ofcourse
*/

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import Input from "./Input";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, seterror] = useState("");

  const login = async (data) => {
    seterror("");
    try {
      // auth service returs session
      const session = await authService.login(data);
      if (session) {
        // again using powers of authService
        const userData = await authService.getCurrentUser();
        /*
            ! ICE BREAKING MOMENT : userdata is the data of the posts and blogs and blogs have to be displayed and displaying of blog will lead to change in state , so state management tool RTK comes in picture here : useDispatch time
             */
        if (userData) {
          dispatch(storeLogin(userData));
        }
        navigate("/");
      }
    } catch (error) {
      seterror(error.message);
    }
  };
  return <div>Login</div>;
}

export default Login;
