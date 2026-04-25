# TaskMaster - Premium MERN Project Manager

TaskMaster is a production-quality, full-stack Project & Task Management application built with the MERN stack. It features a modern, glassmorphic UI with a focus on professional aesthetics and high-performance user experience.

## ✨ Features

- **🔒 Secure Authentication**: JWT-based login/signup with persistent session handling.
- **📁 Project Management**: Create and track professional projects with unique descriptions.
- **📝 Task Tracking**: Manage tasks within projects with completion toggles and due dates.
- **📊 Progress Analytics**: Visual progress bars and analytics for each project.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **✨ Premium UI**: Space-tech inspired design using Tailwind CSS 4 and Framer Motion.

## 🚀 Tech Stack

- **Frontend**: React (Vite), Redux Toolkit, Tailwind CSS 4, Framer Motion, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Icons**: Lucide React.
- **Toasts**: React Hot Toast.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd task-manager
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the App

1. **Start Backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

The app will be available at `http://localhost:5173`.

## 📂 Folder Structure

```text
├── backend/
│   ├── config/      # DB connection
│   ├── controllers/ # API logic
│   ├── middleware/  # Auth & Error handling
│   ├── models/      # Mongoose schemas
│   └── routes/      # Express routes
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI
    │   ├── pages/      # View components
    │   ├── redux/      # State management
    │   └── services/   # API calls
    └── index.css       # Global styles
```

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
