import React, { useState, useEffect } from "react";
import service from "../appwrite/crud";
import PostCard from "../components/PostCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setPosts, clearPosts } from "../store/postSlice.js";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    console.log("checking user for logout", user);
    if (user) {
      service.getPosts().then((res) => {
        if (res) dispatch(setPosts(res.documents));
      });
    } else {
      dispatch(clearPosts()); // clear posts on logout
    }
  }, [user]);

  if (!user) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <div className="w-full max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold hover:text-gray-500">
            Login to read posts
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <div className="w-full max-w-7xl mx-auto px-4">
        {user && posts.length === 0 && (
          <p className="text-center text-gray-500">No posts found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div key={post.$id} className="p-2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
