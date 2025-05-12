
# Backend Express.js API

This is a backend server built with Express.js. It includes common dependencies for handling authentication, file uploads, database connections, and image processing.

---

## 📦 Features

- **Authentication**: Uses `jsonwebtoken` and `bcryptjs` for handling user login, JWT generation, and password hashing.
- **File Upload**: `multer` is used to handle file uploads.
- **CORS**: Configured using `cors` to enable cross-origin requests.
- **MySQL Database**: Utilizes `mysql2` to connect and interact with a MySQL database.
- **Environment Variables**: `dotenv` is used to load environment variables from a `.env` file.
- **Image Processing**: Uses `sharp` for image resizing and transformations.

---

## 🚀 Getting Started

### Requirements

- Node.js
- MySQL

### Install Dependencies

First, install the dependencies:
```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following contents:

```
PORT=4000
dbport=port
DB_HOST=host
DB_USER=databasesusername
DB_PASSWORD=databasespassword
DB_NAME=Name
PYTHON_HOST=python server url
JWT_SECRET=token secrate
GROQ_API=api
PYTHON_API_KEY=secrate
```

Make sure to replace `your_db_user`, `your_db_password`, `your_db_name`, and `your_jwt_secret_key` with your actual database credentials and JWT secret key.

---

## 🚀 Running the Server

To start the server, run:

```bash
node server.js
```

The server will run on `http://localhost:4000` by default (or use the port specified in `.env`).

---

## 🧪 Testing the API

You can test the server using `POST`, `GET`, `PUT`, and `DELETE` requests with tools like **Postman** or **curl**.

---
