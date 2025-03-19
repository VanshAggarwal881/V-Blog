/*
1. appwrite config/crud service is needed to provide informaion to card because the information is not available in the state , if presented then we would have used redux ----- for this.
*/

import React from "react";
import service from "../appwrite/crud";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  // 2. props will receive directly from appwrite -- see the syntax of id written here : $id
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure>
        {/* this is image is of preview only , since it is a card and we have already a functionality defined in crud appwrite to get preview. */}
        <img
          src={service.getFilePreview(featuredImage)}
          alt={title}
          className="rounded-t-lg w-full h-48 object-cover"
        />
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
