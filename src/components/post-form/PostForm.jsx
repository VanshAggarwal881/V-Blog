import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input.jsx";
import RTE from "../RTE.jsx";
import Select from "../Select.jsx";
import service from "../../appwrite/crud.js"; // * appwrite service are because we have to send data to appwrite after collecting it.
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  /*
    register and handleSubmit are introduced before
    * register : Connects regular HTML inputs to React Hook Form
    * handleSubmit : Processes the form when submitted
    * watch : to continuously monitor any field
    * control : to get control over the form , same control is passed to RTE so that we can get its syntax and form in return. 
     */
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      // ? why necessary : if the user has hit and edit option so this means that he want to update the existing ones , this means the app cant provide it null or empty values , has to provide the existing values.
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    // console.log("userData is", userData);
    if (!userData) {
      console.error("User is not authenticated");
      return;
    }
    // if cond. when updating the existing post
    if (post) {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (file) {
        service.deleteFile(post.featuredImage);
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await service.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        // update data's featuredimage with fileid
        data.featuredImage = fileId;
        const dbPost = await service.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  // ? why slugtransform is needed , when it is said that slug is the id ... what are we transforming ?

  // ! purpose : Converts the title into a URL-friendly slug.
  // Memoizes the function so it’s not redefined on every render.
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <button type="submit" className="btn btn-outline btn-primary">
          {post ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
}
