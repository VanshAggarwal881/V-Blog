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

## Components

The components for the V-Blog project are located in the `src/components` directory. These components are used to build the various parts of the application, such as the header, footer, post list, post editor, and more.

### Example Components

- `Header.js`: The header component of the application.
- `Footer.js`: The footer component of the application.
- `PostList.js`: A component to display a list of blog posts.
- `PostEditor.js`: A component for creating and editing blog posts.

### Example Usage

```javascript
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostList from "./components/PostList";
import PostEditor from "./components/PostEditor";

function App() {
  return (
    <div>
      <Header />
      <PostList />
      <PostEditor />
      <Footer />
    </div>
  );
}

export default App;
```

## Styling with DaisyUI

DaisyUI is a plugin for Tailwind CSS that provides a set of pre-designed components and utilities to help you build beautiful user interfaces quickly and easily. V-Blog uses DaisyUI for styling.

### Installation

DaisyUI is already included in the project dependencies. To install it, run:

```sh
npm install daisyui
```

### Usage

To use DaisyUI in your project, import the styles in your `tailwind.config.js` file:

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
```

You can now use DaisyUI components and utilities in your project. For example:

```html
<button class="btn btn-primary">Primary Button</button>
```

For more information on how to use DaisyUI, please refer to the [DaisyUI documentation](https://daisyui.com/docs/).

## License

This project is licensed under the MIT License.
