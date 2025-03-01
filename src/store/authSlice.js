// 1. create slice using redux , -> give it the initial state and reducers
// 2. this slice is made to check if the user is authorised or not.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  usereData: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.status = true), (state.usereData = action.payload.usereData);
    },
    logout: (state) => {
      state.status = false;
    },
  }, // syntax
});

/*
Need to export two things reducers from Slicer
authSlice.reducer 
and 
individual methods from reducers so that the components could use those to dispatch and what not
*/
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
