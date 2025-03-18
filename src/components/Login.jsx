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
          dispatch(storeLogin({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      seterror(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg rounded-xl p-10 border border-black/10 bg-base-200 text-base-content`}
      >
        {/* <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div> */}
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base-500">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  // ! spelling
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <button className="btn btn-outline btn-primary">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
