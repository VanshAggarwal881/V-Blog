import React from "react";
import PostForm from "../components/post-form/PostForm";

function AddPost() {
  return (
    <div className="py-8">
      {/* the classes written below may cause problems , come here if there is any */}
      <div className="w-full max-w-7xl mx-auto px-4">
        <PostForm />
      </div>
    </div>
  );
}

export default AddPost;
