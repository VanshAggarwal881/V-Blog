# PostForm Component Documentation

The `PostForm` component creates a form interface for creating and editing blog posts in a React application with Appwrite backend. It handles text content with a rich text editor, image uploads, slug generation, and form submission.

## Component Overview

This component provides:

- A dual-purpose form for both creating new posts and editing existing ones
- Rich text editing capabilities for blog content
- Automatic slug generation from the post title
- Image upload functionality with preview
- Status selection (active/inactive)

## Dependencies

The component relies on several libraries and custom components:

```javascript
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
```

- **React Hook Form**: Handles form state, validation, and submission
- **React Router**: For navigation after form submission
- **Redux**: To access the current user data
- **Custom UI Components**: Button, Input, RTE (Rich Text Editor), and Select
- **Appwrite Service**: Custom service to interact with Appwrite backend

## Implementation Details

### Form State Setup

The component uses React Hook Form to manage all form state. It initializes with either existing post data (when editing) or empty values (when creating):

```javascript
const { register, handleSubmit, watch, setValue, control, getValues } = useForm(
  {
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  }
);
```

### Form Submission Logic

The submission handler differentiates between creating a new post and updating an existing one:

#### Updating an Existing Post:

1. Uploads a new featured image if provided
2. Deletes the old image if replaced
3. Updates the post in the database
4. Navigates to the updated post

#### Creating a New Post:

1. Uploads the featured image
2. Creates a new post with form data and the current user ID
3. Navigates to the new post

### Slug Generation

The component includes a utility function to transform titles into URL-friendly slugs:

```javascript
const slugTransform = useCallback((value) => {
  if (value && typeof value === "string")
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s/g, "-");

  return "";
}, []);
```

- **Purpose :**
  Converts the title into a URL-friendly slug.
- **useCallback :**
  Memoizes the function so it’s not redefined on every render.
- **Transformation Steps :**
  Trims spaces, converts to lowercase, replaces non-alphanumeric characters with hyphens, and replaces spaces with hyphens.

- It also sets up an automatic slug generator that activates when the title changes:

```javascript
React.useEffect(() => {
  const subscription = watch((value, { name }) => {
    if (name === "title") {
      setValue("slug", slugTransform(value.title), { shouldValidate: true });
    }
  });

  return () => subscription.unsubscribe();
}, [watch, slugTransform, setValue]);
```

- **Purpose :**
  Listens for changes to the “title” field.
  Automatically updates the “slug” field using the slugTransform function.
- **Subscription :**
  watch returns a subscription that notifies you whenever form values change.
  When the title changes, setValue updates the slug accordingly.
- **Cleanup :**
  The returned function unsubscribes from the watch listener to avoid memory leaks.

### UI Layout

The form is split into two columns:

1. **Left Column (2/3 width)**: Contains title, slug, and content fields
2. **Right Column (1/3 width)**: Contains featured image upload, image preview (when editing), status selection, and submit button

## Usage

To use this component in your application:

```jsx
// For creating a new post
<PostForm />

// For editing an existing post
<PostForm post={existingPostData} />
```

## Key Technical Concepts

### React Hook Form Integration

The component leverages several React Hook Form features:

- `register`: Connects standard inputs to form state
- `control`: Connects complex inputs (like RTE) to form state
- `watch`: Monitors form field changes
- `setValue`: Programmatically updates form values
- `handleSubmit`: Processes validated form data
- `getValues`: Retrieves current form values

### Appwrite Integration

The component interacts with Appwrite for:

- File uploads and management
- Database operations (creating and updating posts)
- Image previews

### Conditional Rendering

The UI adapts based on whether it's in create or edit mode:

- Different button text and colors
- Image preview only shown when editing
- Image upload required only for new posts

## Code Walkthrough

### Form Structure

```jsx
<form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
  <div className="w-2/3 px-2">{/* Title, slug, and RTE content fields */}</div>
  <div className="w-1/3 px-2">
    {/* Image upload, preview, status selection, and submit button */}
  </div>
</form>
```

### Content Fields (Left Column)

```jsx
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
        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
    }}
/>
<RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
```

### Media and Settings (Right Column)

```jsx
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
            src={appwriteService.getFilePreview(post.featuredImage)}
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
<Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
    {post ? "Update" : "Submit"}
</Button>
```

## Best Practices Demonstrated

1. **Form State Management**: Using React Hook Form for efficient form state handling
2. **UX Improvements**: Auto-generating slugs from titles for better user experience
3. **Component Reusability**: Creating a single component for both creating and editing
4. **Async Operation Handling**: Properly managing file uploads and database operations
5. **Clean Separation of Concerns**: UI layout separate from form logic
6. **Memory Management**: Cleaning up subscriptions to prevent memory leaks
