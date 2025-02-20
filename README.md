# Task Management Application

## Overview
This is a **Task Management Application** where users can add, edit, delete, and reorder tasks using a **drag-and-drop** interface. Tasks are categorized into three sections:
- **To-Do**
- **In Progress**
- **Done**

Changes are saved instantly to the database, ensuring real-time synchronization and persistence.

## Live Demo
[Live Application](https://task-manager-d91ea.web.app/) 

## Features
### 1. Authentication
- Only authenticated users can access the app.
- Uses **Firebase Authentication** (Google sign-in).
- Stores user details (User ID, email, and display name) upon first login.

### 2. Task Management System
- Users can **add, edit, delete, and reorder** tasks.
- Tasks belong to one of three categories:
  - To-Do
  - In Progress
  - Done
- Users can **drag** a task to different categories.
- **Real-time** updates ensure data persistence.
- Each task includes:
  - **Title** (Required, max 50 characters)
  - **Description** (Optional, max 200 characters)
  - **Timestamp** (Auto-generated upon creation)
  - **Category**

### 3. Database & Persistence
- Uses **MongoDB + Express.js** for storing tasks.
- **Real-time updates** are achieved using:
  - MongoDB Change Streams
  - WebSockets
  - Optimistic UI Updates
- Users' tasks remain in their last known order after refresh.
- Deleted tasks are permanently removed from the database.

### 4. Frontend
- Built with **Vite.js + React**.
- Uses **drag-and-drop library** (e.g., `react-beautiful-dnd`).
- Modern, clean, and **fully responsive** UI.
- Uses a **maximum of four colors** to maintain a simple look.

### 5. Responsiveness
- Fully responsive for **both desktop and mobile users**.
- Mobile-friendly **drag-and-drop** experience.

### 6. Backend API
- **Express.js API** handles CRUD operations.
- **Endpoints:**
  - `POST /tasks` – Add a new task
  - `GET /tasks` – Retrieve all tasks for the logged-in user
  - `PUT /tasks/:id` – Update task details
  - `DELETE /tasks/:id` – Delete a task

### 7. Bonus Features (Optional)
- **Dark mode toggle**.
- **Task due dates** with color indicators (e.g., overdue tasks appear red).
- **Activity log** to track task changes.

---

## Installation & Setup
### Prerequisites
Make sure you have the following installed:
- **Node.js**
- **MongoDB**
- **Firebase Project** (for authentication)

### 1. Clone the Repositories
```bash
git clone https://github.com/mahdihasan333/task-manager-client
cd task-manager-client

# Clone the backend repository as well
git clone https://github.com/mahdihasan333/task-manager-server
cd task-manager-server


### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
- Create a `.env` file in the `backend` folder and add MongoDB connection details.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
- Create a `.env` file in the `frontend` folder and add Firebase config details.

---
## Technologies Used
### Frontend:
- **React.js** (Vite)
- **Firebase Authentication**
- **@hello-pangea/dnd** (Drag-and-Drop)
- **Tailwind CSS** (UI Styling)

### Backend:
- **Node.js & Express.js**
- **MongoDB** (Mongoose ORM)
- **WebSockets / Change Streams** (Real-time updates)

### Deployment:
- **Frontend:** firebase
- **Backend:** vercel
- **Database:** MongoDB Atlas


---
## Contributing
Feel free to fork this repository and submit pull requests for any improvements!

---
## Contact
For any issues, contact me at: [mahdioffi333@gmail.com](mailto:mahdioffi333@gmail.com)



---
Happy Coding😃😃