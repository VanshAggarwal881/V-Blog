import React, { useState, useEffect } from "react";
import service from "../appwrite/crud";
import PostCard from "../components/PostCard.jsx";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (user) {
      service.getPosts().then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      });
    }
  }, [user]);
  if (!user) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        {/* this class can cause problems , be aware */}
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
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
