# V-Blog

V-Blog is a modern blogging platform built with React, Vite, and Appwrite. This project demonstrates the implementation of a full-featured blog with user authentication, rich text editing, image uploads, and theme toggling capabilities.

## Features

- 🔐 User Authentication (Sign up, Login, Logout)
- 📝 Rich Text Editing with TinyMCE
- 🖼️ Image Upload and Management
- 🌓 Theme Toggling (Light/Dark mode)
- 📱 Responsive Design
- 🚀 State Management with Redux Toolkit
- 🎨 Modern UI with Tailwind CSS and DaisyUI

## Prerequisites

Before you begin, ensure you have:

- Node.js (v14 or higher)
- npm or yarn
- An Appwrite instance (self-hosted or cloud)

### Appwrite Setup

1. Create a new project in Appwrite
2. Create a database with the following collections:
   - Posts
   - Users
3. Set up storage bucket for images
4. Configure authentication methods

### Environment Variables

Create an `.env` file in the root directory:

```env
VITE_APPWRITE_ENDPOINT=your-appwrite-endpoint
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DB_ID=your-database-id
VITE_APPWRITE_COLLECTION_ID=your-collection-id
VITE_APPWRITE_BUCKET_ID=your-bucket-id
```

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/v-blog.git

# Navigate to project directory
cd v-blog

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
v-blog/
├── src/
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── appwrite/         # Appwrite service configurations
│   ├── store/            # Redux store configuration
│   └── assets/           # Static assets
├── public/               # Public assets
└── ...config files
```

## Key Components

### Authentication (`src/appwrite/auth.js`)

Handles user authentication operations:

- User registration
- Login/Logout
- Session management

### Post Management (`src/appwrite/crud.js`)

Manages blog post operations:

- Create posts
- Update posts
- Delete posts
- Fetch posts

### Theme Toggle (`src/components/ThemeToggler.jsx`)

Implements theme switching functionality:

- Light/Dark mode toggle
- Theme persistence
- System preference detection

## Redux Store Structure

```javascript
{
  auth: {
    status: boolean,
    userData: object | null
  },
  post: {
    posts: array
  }
}
```

## Deployment

The project can be deployed to various platforms:

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Install Netlify CLI
npm install netlify-cli -g

# Deploy
netlify deploy
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Known Issues

- Theme persistence on page refresh needs improvement
- Image optimization for better performance
- Mobile responsive improvements needed for some components

## Future Enhancements

- [ ] Add comment system
- [ ] Implement social sharing
- [ ] Add search functionality
- [ ] Add categories and tags
- [ ] Implement post analytics

## Credits

- [Hitesh Choudhary](https://github.com/hiteshchoudhary) - For the excellent React course series
- [Appwrite](https://appwrite.io/) - For the backend services
- [DaisyUI](https://daisyui.com/) - For the UI components
- [TailwindCSS](https://tailwindcss.com/) - For the styling framework
