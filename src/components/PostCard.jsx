/*
1. appwrite config/crud service is needed to provide informaion to card because the information is not available in the state , if presented then we would have used redux ----- for this.
*/

import React, { useState } from "react";
import service from "../appwrite/crud";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative h-48 bg-gray-100">
        {featuredImage && !imageError ? (
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover rounded-t-lg"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions justify-end">
          <Link to={`/post/${$id}`}>
            <button className="btn btn-primary">Read</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
