import React, { useEffect, useState } from "react";
import PostForm from "../components/post-form/PostForm";
import service from "../appwrite/crud";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      service.getPost(id).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [id, navigate]);
  return (
    <div className="py-8">
      <div className="w-full max-w-7xl mx-auto px-4">
        <PostForm post={post} />
      </div>
    </div>
  );
}

export default EditPost;
