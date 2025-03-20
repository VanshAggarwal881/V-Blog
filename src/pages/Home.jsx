import React, { useState, useEffect } from "react";
import service from "../appwrite/crud";
import PostCard from "../components/PostCard.jsx";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.auth.userData);

  useEffect(() => {
    console.log("checking user for logout", user);
    if (user) {
      service.getPosts().then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      });
    } else {
      setPosts([]); // Clear posts when user logs out
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
