# V-Blog

V-Blog is a blogging platform built with React, Vite, and Appwrite. This project aims to provide a seamless and modern blogging experience with features like user authentication, rich text editing, and more.

## Prerequisites

### .env file

Create an .env file in the root directory and add your Appwrite configuration

```
VITE_APPWRITE_ENDPOINT
VITE_APPWRITE_PROJECT_ID
VITE_APPWRITE_DB_ID
VITE_APPWRITE_COLLECTION_ID
VITE_APPWRITE_BUCKET_ID
```

### Authentication

The authentication logic is handled in the auth.js file. The AuthService class provides methods for creating accounts, logging in, getting the current user, and logging out.

- Please refer to [docs](https://appwrite.io/docs)
