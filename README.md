
# BlinkShare

### Real-Time Text and File Sharing

BlinkShare is a real-time web application that allows users to share text messages and files between devices using a common room code.

Built with React, Node.js, Express, and Socket.IO, BlinkShare provides a simple way to connect users and share content in real time.

## ✨ Features

- **Room-Based Sharing** — Join a room using a room code.
- **Real-Time Messaging** — Send and receive text messages instantly.
- **File Sharing** — Upload and share files with users in the same room.
- **File Access** — Open and download shared files through their links.
- **Device Name** — Join a room using a device name.
- **Responsive Interface** — Designed for desktop and mobile screens.
- **Dark Mode** — Switch between light and dark themes.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Frontend development and build tool |
| Node.js | Backend JavaScript runtime |
| Express.js | Backend server and API |
| Socket.IO | Real-time communication |
| Multer | File upload handling |


## 📁 Project Structure

```text
BlinkShare/
├── backend/
│   ├── uploads/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## 🚀 Getting Started

Follow these steps to run BlinkShare locally.

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/) (for cloning the repository)

### 1. Clone the Repository

Replace `vikram9369` with your actual GitHub username.

```bash
git clone https://github.com/vikram9369/BlinkShare.git
cd BlinkShare
```

### 2. Install and Start the Backend

Open a terminal in the project directory:

```bash
cd backend
npm install
npm start
```

The backend runs on port `5000` by default.

Keep this terminal running.

### 3. Install and Start the Frontend

Open a second terminal in the project directory:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal, usually:

http://localhost:5173

### 4. Start Sharing

1. Open BlinkShare in your browser.
2. Enter a device name and a room code.
3. Open BlinkShare on another device or browser.
4. Join the same room using the same room code.
5. Send messages or upload files to share them with connected users in that room.

## 📦 File Upload Limit

The backend is configured to accept files up to **75 MB per upload**.

## ⚠️ Current Limitations

- Uploaded files are stored on the backend server's local filesystem.
- File availability depends on the backend server and its storage.
- The current frontend and Socket.IO setup uses local development addresses.
- Additional configuration is required for public deployment.

## 🔮 Future Improvements

- Cloud-based file storage
- Public deployment
- Improved file management
- Enhanced security and validation

## 👨‍💻 Author

**Vikram Kushwaha**  
Computer Science and Engineering Student
