
# 📘 NoteApp Backend

Backend for a note-taking application built with Node.js, Express, and MongoDB. This REST API allows users to create, read, update, and delete notes, with user roles and authentication implemented for secure access.

---

## 🚀 Features

- **User Authentication**: Secure signup and login functionality using bcrypt for password encryption.
- **Role-Based Access Control**: Different user roles ("user", "admin", "moderator") with varying levels of access.
- **CRUD Operations for Notes**:
  - Create: Add new notes with a title and content.
  - Read: Retrieve notes.
  - Update: Edit existing notes.
  - Delete: Remove notes.
- **API Documentation**: Comprehensive documentation of all API endpoints.
- **Environment Configuration**: Utilizes environment variables for configuration.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Security**: bcrypt
- **Deployment**: Render
- **Version Control**: Git, GitHub

---

## 📂 Project Structure


MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key
4. **Set up environment variables:**

   - Create a `.env` file in the root directory.
   - Add the necessary environment variables (e.g., `MONGO_URI`, `PORT`, `JWT_SECRET`).

5. **Start the development server:**

bash
   npm start
   - **JWT (JSON Web Tokens)** is used for authentication.
- Upon successful login, the server returns a JWT that must be included in the `Authorization` header of subsequent requests.
- Example: `Authorization: Bearer <token>`

---

## 🛡️ User Roles and Access Control

- **User**: Can create, read, update, and delete their own notes.
- **Moderator**: Can read and delete any note.
- **Admin**: Has full access, including managing users and notes.

---

## 📚 API Endpoints

### User Routes

#### 1. POST /signup

- **Description**: Registers a new user.
- **Request Body**:

- **Response**:
  - Success (201 Created):

json
    {
      "message": "User registered successfully",
      "user": {
        "id": "user_id",
        "name": "string",
        "email": "string",
        "role": "string"
      }
    }
    json
    {
      "message": "Login successful",
      "token": "jwt_token"
    }
    > **Authentication Required**: All notes routes require a valid JWT in the `Authorization` header.

#### 1. POST /notes

- **Description**: Creates a new note.
- **Request Body**:

json
    {
      "message": "Note created successfully",
      "note": {
        "id": "note_id",
        "title": "string",
        "content": "string",
        "createdBy": "user_id"
      }
    }
    - **Description**: Retrieves all notes for the authenticated user.
- **Response**:
  - Success (200 OK):

json
  {
    "title": "string",    // optional
    "content": "string"  // optional
  }
  - **Response**:
  - Success (200 OK):

json
    {
      "message": "You are not authorized to update this note"
    }
    - **Description**: Deletes a note.
- **Request Parameters**:
  - `id`: The ID of the note to delete.
- **Response**:
  - Success (200 OK):

    json
    {
      "message": "Note not found"
    }
    - The API returns appropriate HTTP status codes for different scenarios:
  - 200 OK: Success
  - 201 Created: Resource created successfully
  - 400 Bad Request: Invalid request data
  - 401 Unauthorized: Authentication required
  - 403 Forbidden: User does not have permission
  - 404 Not Found: Resource not found
  - 500 Internal Server Error: Generic server error

- Error responses include a `message` field with details about the error.

---

## 🤝 Contribution Guidelines

1. **Fork the repository.**
2. **Create a new branch** for your feature or bug fix.
3. **Make your changes** and ensure they are well-tested.
4. **Submit a pull request** with a clear description of your changes.

> **Note**: Follow the existing code style and conventions.  Ensure your code is well-commented.

---

## 🚀 Deployment

The backend is deployed on Render.  Here are the steps for deploying your own instance:

1. **Create a Render account.**
2. **Connect your GitHub repository** to Render.
3. **Configure the environment variables** in Render's dashboard.
4. **Deploy the application.**

> **Note**: Ensure that the `MONGO_URI` environment variable is correctly configured in Render.

- **Deployed Backend URL**: [https://noteme-gtbw.onrender.com/](https://noteme-gtbw.onrender.com/)
- **GitHub Project Link**: [https://github.com/girijakangutkar/NoteAppBackend](https://github.com/girijakangutkar/NoteAppBackend)
