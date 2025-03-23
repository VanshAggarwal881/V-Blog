import React, { useState, useEffect } from "react";
import service from "../appwrite/crud";
import PostCard from "../components/PostCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setPosts, clearPosts } from "../store/postSlice.js";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    // console.log("checking user for logout", user);
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
      <div className="min-h-screen bg-base-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Welcome to V-Blog</h1>
            <p className="text-xl text-base-content/80">
              A modern blogging platform built with React, Vite, and Appwrite
            </p>
          </div>

          <div className="space-y-8">
            {/* Project Overview */}
            <section className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">About V-Blog</h2>
                <p className="text-base-content/70">
                  V-Blog is a full-featured blogging platform that demonstrates
                  modern web development practices. Built with React and powered
                  by Appwrite backend, it offers a seamless blogging experience
                  with features like rich text editing, image uploads, and
                  real-time updates.
                </p>
              </div>
            </section>

            {/* Key Features */}
            <section className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Key Features</h2>
                <ul className="list-disc list-inside space-y-2 text-base-content/70">
                  <li>User authentication with Appwrite</li>
                  <li>Rich text editing with TinyMCE</li>
                  <li>Image upload and management</li>
                  <li>Responsive design with Tailwind CSS</li>
                  <li>Theme toggling with DaisyUI</li>
                  <li>State management with Redux Toolkit</li>
                </ul>
              </div>
            </section>

            {/* Technologies Used */}
            <section className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Built With</h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Vite",
                    "Appwrite",
                    "Redux",
                    "TailwindCSS",
                    "DaisyUI",
                  ].map((tech) => (
                    <span key={tech} className="badge badge-primary badge-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="card bg-primary text-primary-content shadow-xl">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl mb-4">
                  Ready to Start Blogging?
                </h2>
                <p className="mb-4">
                  Login to read posts and share your own stories!
                </p>
                <div className="card-actions">
                  <button
                    onClick={() => navigate("/login")}
                    className="btn btn-secondary"
                  >
                    Login to Read Posts
                  </button>
                </div>
              </div>
            </section>

            {/* Credits */}
            <section className="text-center text-base-content/60 mt-8">
              <div className="italic">
                Special thanks to Hitesh Choudhary for his excellent React
                course series that helped in building this project.
                <p>
                  I request you to not click any link present in the footer ,
                  the footer is for beauty 😅
                </p>
              </div>
            </section>
          </div>
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
