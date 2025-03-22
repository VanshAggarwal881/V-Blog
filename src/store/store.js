// using redux toolkit -- setting the strore
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postSlice from "./postSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
  },
});

export default store;
