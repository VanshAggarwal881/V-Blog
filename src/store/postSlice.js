/*
! Issue: After logout, the posts are still visible until refresh, especially in the deployed version.
? Reason (Why this is happening):
* using useState for posts, so Redux logout doesn't automatically reset the posts state in Home.jsx unless user changes.

* While useEffect does have user in the dependency array and does setPosts([]) when user becomes null, sometimes the state change doesn't sync perfectly in production builds, or components re-render slower due to hydration behavior (React + Vercel SSR/CSR mismatch).

* Solution:
TODO: Move the posts state to a Redux slice (called postSlice) and clear it from Redux store during logout.
* This is the cleanest and scalable solution (especially if you need posts elsewhere too).
*/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    clearPosts: (state) => {
      state.posts = [];
    },
  },
});

export const { setPosts, clearPosts } = postSlice.actions;
export default postSlice.reducer;
