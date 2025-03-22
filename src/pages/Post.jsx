import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/crud";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // ? what userId ? when the post var is null in useState how come it got a userId ?
  // * its for the initial render , useeffect will provide it the value
  // ? what userId ? when the post var is null in useState how come it got a userId ?
  // * its for the initial render , useeffect will provide it the value
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 min-h-screen bg-base-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
          {/* Image Container */}
          <div className="relative h-[400px] w-full overflow-hidden bg-base-200">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-full object-contain rounded-t-xl"
            />
            {/* Author Actions */}
            {isAuthor && (
              <div className="absolute top-4 right-4 space-x-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <button className="btn btn-primary btn-sm">Edit</button>
                </Link>
                <button onClick={deletePost} className="btn btn-error btn-sm">
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Content Container */}
          <div className="card-body p-6">
            <h1 className="card-title text-3xl font-bold mb-4">{post.title}</h1>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {parse(post.content)}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}
