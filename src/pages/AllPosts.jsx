// ! want to show all posts - will be stored at backend service so do import appwrite service.

import React, { useState, useEffect } from "react";
import service from "../appwrite/crud";
import Postcard from "../components/PostCard.jsx";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);
  service.getPosts([]).then((posts) => {
    // TODO : clg the post , to see posts.documents
    if (posts) {
      setPosts(posts.documents);
    }
  });
  return (
    <div className="w-full py-8">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <Postcard key={post.$id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllPosts;
