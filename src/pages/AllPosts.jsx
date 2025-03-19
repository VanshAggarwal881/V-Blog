// ! want to show all posts - will be stored at backend service so do import appwrite service.

import React, { useState, useEffect } from "react";
import service from "../appwrite/crud";
import Postcard from "../components/PostCard.jsx";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service.getPosts([]).then((posts) => {
      // TODO : clg the post , to see posts.documents
      if (posts) {
        console.log("consoling all posts :", posts.documents);
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
        {/* DaisyUI loader with different options */}
        <div className="flex flex-col gap-4 items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-base-content">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">All Posts</h1>
        {posts.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-xl">No posts found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div key={post.$id} className="flex">
                <Postcard {...post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllPosts;
