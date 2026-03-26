# 🚀 Full Stack Assessment App (MERN)

A simple full-stack web application built using **React (Vite), Node.js (Express), and MongoDB** that includes authentication and a dashboard with CRUD functionality.

---

## 📌 Features

### 🔐 Authentication

* User Registration
* User Login (JWT-based)
* Logout functionality
* Protected routes

### 📊 Dashboard

* Displays logged-in user name
* CRUD operations for:

  * Tasks
  * Leads
  * Users
* Edit and delete functionality
* Optimistic UI updates

### 🎨 UI/UX

* Clean and responsive design
* CSS Modules for scoped styling
* Gradient background and modern card layout
* Loading indicators and error handling
* Show/Hide password toggle

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* React Router DOM
* Context API (State Management)
* Axios
* CSS Modules

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js

---

## 📂 Project Structure

```
full-stack-app/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── styles/
│   │   └── App.jsx
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd full-stack-app
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 API Endpoints

### Auth Routes

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |

### Dashboard Routes (Protected)

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| GET    | /api/dashboard     | Get all items |
| POST   | /api/dashboard     | Create item   |
| PUT    | /api/dashboard/:id | Update item   |
| DELETE | /api/dashboard/:id | Delete item   |

---

## 🔐 Authentication Flow

1. User registers via `/register`
2. Login returns JWT token
3. Token stored in `localStorage`
4. Protected routes verify token
5. Logout clears token and redirects user

---

## ✨ Optimizations & Best Practices

* Separation of concerns (MVC architecture)
* Context API for global auth state
* Reusable API service layer
* Controlled components and validation
* Optimistic UI updates for better UX
* CSS Modules to avoid global conflicts

---

## 🚀 Future Improvements

* Refresh Token Authentication
* Role-based access control
* Pagination & filtering
* Toast notifications
* Dark mode
* Deployment (Vercel + Render + MongoDB Atlas)

---

## 👨‍💻 Author

**Abhinav Giri**
Software Development Engineer (MERN Stack)

---

## 📄 License

This project is created for assessment/demo purposes.
