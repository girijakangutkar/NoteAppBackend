# 📝 NoteHere - Smart Notes Management System Backend

Note app which lets you add the notes. Backend

---

## Tools

-- Version is controlled by gitHub
-- Deployed on Render

## 🚀 Features

- Add note based on user role: "uses", "admin", "moderator"
- Login and signUp feature with encrypted password using bcrypt.
- Edit and delete feature for notes

---

### 🔐 Authentication & Authorization

- **Secure User Registration** - Create accounts with encrypted passwords using bcrypt
- **JWT-based Authentication** - Secure login sessions with token-based authentication
- **Role-based Access Control** - Three user roles: User, Admin, and Moderator
- **Password Security** - Industry-standard password hashing and validation

### 📋 Note Management

- **Create Notes** - Add new notes with titles and content
- **View Notes** - Display all your notes in an organized layout
- **Edit Notes** - Update existing notes with real-time changes
- **Delete Notes** - Remove notes you no longer need
- **User-specific Content** - Each user can only access their own notes

---

### Frontend

- **React** - Modern JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Lucide React** - Beautiful and customizable SVG icons
- **Axios** - HTTP client for API requests

### Backend

- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast and minimalist web framework
- **JWT** - JSON Web Tokens for secure authentication
- **bcrypt** - Password hashing library for security

### Database

- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling for Node.js

### Deployment

- **Vercel** - Frontend deployment and hosting
- **MongoDB Atlas** - Cloud database hosting

---

**Access the application**

- Frontend: `https://notehere.vercel.app`
- Backend API: `https://noteme-gtbw.onrender.com`

## 🛠️ Tech Stack

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Icons: Lucide React

---

## **Environment Setup**

Create a `.env` file in the backend directory:

```env
# Database Configuration
MONGO_URI=your_mongodb_connection_string

```

---

## 📊 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user" // Optional: "user" | "admin" | "moderator"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Notes Endpoints

#### Create Note

```http
POST /api/notes
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "My First Note",
  "content": "This is the content of my note"
}
```

#### Get All Notes

```http
GET /api/notes
Authorization: Bearer <jwt_token>
```

#### Update Note

```http
PUT /api/notes/:noteId
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated Note Title",
  "content": "Updated note content"
}
```

#### Delete Note

```http
DELETE /api/notes/:noteId
Authorization: Bearer <jwt_token>
```

## Folder structure

---

├── backend/
│ ├── models/
│ │ ├── UserModel.js
│ │ └── NoteModel.js
│ ├── routes/
│ │ ├── UserRoutes.js
│ │ └── NotesRoutes.js
│ ├── middleware/
│ │ └── auth.js
│ ├── config/
│ │ └── db.js
│ └── server.js

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/girijakangutkar/NoteAppBackend.git

# Navigate into the project directory
cd your-repo-name

# Install dependencies
npm install

# Start the development server
npm start

#Deployed Backend on Render
https://noteme-gtbw.onrender.com/

#GitHub project link
https://github.com/girijakangutkar/NoteAppBackend
```
