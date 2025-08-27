# Chat Application

A real-time chat application where users can register, log in, and have conversations with each other. The application supports multiple users, conversation management, and real-time messaging. User authentication is handled using **HTTP-only cookies** instead of localStorage for enhanced security against XSS attacks.

--- 

## Tech Stack

**Frontend:**  
- React  
- Redux  
- Vite  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB  
- Repository Pattern Architecture  

---

## Project Structure

project-root/
│
├─ backend/ # Node.js backend
│ ├─ controllers/ # API controllers
│ ├─ models/ # Mongoose models
│ ├─ repositories/ # Repository layer
│ ├─ routes/ # API routes
│ ├─ services/ # Business logic
│ └─ index.js # Server entry point
│
├─ frontend/ # Vite + React + Redux frontend
│ ├─ src/
│ │ ├─ components/
│ │ ├─ redux/
│ │ └─ App.jsx
│ └─ index.html
│
└─ README.md


---

## Installation

To set up the backend, navigate to the backend folder and install all dependencies using npm. Once installed, start the backend server using the `npm start` command.  

For the frontend, navigate to the frontend folder, install all dependencies, and then start the Vite development server using `npm run dev`.  

---

## Features

- User registration and login with authentication using secure HTTP-only cookies.  
- Create and manage conversations between users.  
- Real-time messaging between multiple users.  
- Frontend state management using Redux.  
- Backend structured with repository pattern for scalability and maintainability.  

---

## Usage

- The backend server runs on `http://localhost:8000` (or the configured port).  
- The frontend development server runs on `http://localhost:5173` (Vite default port).  
- API requests from the frontend communicate with the backend server, and authentication is maintained via cookies, not localStorage.  

---

## Security

- Authentication tokens are stored in HTTP-only cookies to prevent XSS attacks.  
- No sensitive information is stored in localStorage or exposed in the frontend.  

---
