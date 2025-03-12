/*
1. appwrite config/crud service is needed to provide informaion to card because the information is not available in the state , if presented then we would have used redux ----- for this.
*/

import React from "react";
import service from "../appwrite/crud";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  // 2. props will receive directly from appwrite -- see the syntax of id written here : $id
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        {/* this is image is of preview only , since it is a card and we have already a functionality defined in crud appwrite to get preview. */}
        <img src={service.getFilePreview(featuredImage)} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
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
