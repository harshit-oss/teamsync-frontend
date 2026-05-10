# TeamSync – Full Stack Team Task Manager

## Live Demo

### Frontend

[TeamSync Live App](https://teamsync-frontend-9xwv.vercel.app/?utm_source=chatgpt.com)

### Backend API

Backend deployed using Node.js + Express + MongoDB Atlas.

---

# Project Overview

TeamSync is a full-stack team collaboration and task management platform where users can:

* Create and manage projects
* Assign and track tasks
* Manage team members
* Monitor task progress
* Use role-based authentication
* Track project/task status visually

The application is built using the MERN stack and supports responsive design for desktop and mobile users.

---

# Features

## Authentication

* User Signup
* User Login
* JWT Authentication
* Protected Routes
* Role-based Access (Admin / Member)

## Project Management

* Create Projects
* Delete Projects
* Track Project Status
* View Team Members
* Progress Tracking UI

## Task Management

* Create Tasks
* Assign Tasks
* Update Task Status
* Delete Tasks
* Filter Tasks
* Status Badges

## UI Features

* Responsive Navbar
* Active Navigation Highlight
* Toast Notifications
* Dark Mode
* Mobile Responsive Layout
* User Profile Avatar

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* CSS Modules
* React Hot Toast
* Vercel Deployment

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs
* Railway / Render Deployment

---

# Folder Structure

```bash
TeamSync/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
```

---

# Environment Variables

## Frontend (.env)

```env
VITE_API_URL=YOUR_BACKEND_URL
```

## Backend (.env)

```env
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/harshit-oss/teamSync-backend.git
```

---

## Backend Setup

```bash
cd backend
npm install
npm start
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# API Endpoints

## Auth Routes

```bash
POST /api/auth/register
POST /api/auth/login
```

## Project Routes

```bash
GET /api/projects
POST /api/projects
DELETE /api/projects/:id
```

## Task Routes

```bash
GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
```

---

# Deployment

## Frontend Deployment

* Vercel

## Backend Deployment

* Railway / Render

## Database

* MongoDB Atlas

---

# Future Improvements

* Real-time Notifications
* Team Chat System
* File Upload Support
* Activity Logs
* Email Notifications
* Drag & Drop Task Board

---

# Author

Harshit Pandey

GitHub:
[GitHub Profile](https://github.com/harshit-oss?utm_source=chatgpt.com)
