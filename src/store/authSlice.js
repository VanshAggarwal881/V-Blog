// 1. create slice using redux , -> give it the initial state and reducers
// 2. this slice is made to check if the user is authorised or not.

// TODO: 3. will be using this functionality during making of login and signup components.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // ! action.payload is the one .userData is when you send it by destructuring there ... I got error , either use . here or if not destructure there.
      (state.status = true), (state.userData = action.payload.userData);
    },
    logout: (state) => {
      state.status = false;
      state.userData = null; // Ensure userData is set to null on logout
    },
  }, // syntax
});

/*
Need to export two things reducers from Slicer
authSlice.reducer 
and 
* individual methods from reducers so that the components could use those to dispatch and what not
*/
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
