# ⚡ BlinkShare

### Real-Time Text & File Sharing Across Devices

**BlinkShare** is a real-time web application that enables users to share text messages and files between devices using a common room code. Built with React, Node.js, Express, and Socket.IO, it provides a simple and responsive way to exchange content across desktop and mobile devices.

🔗 **Live Demo:** [https://blinkshare-live.vercel.app/](https://blinkshare-live.vercel.app/)

---

## ✨ Features

- 🏠 **Room-Based Sharing** — Join a shared room using a room code.
- 💬 **Real-Time Messaging** — Send and receive text messages instantly.
- 📁 **File Sharing** — Upload and share files with users in the same room.
- 🔗 **File Access** — Open and download shared files through their links.
- 📱 **Device Names** — Identify devices using a chosen device name.
- 📐 **Responsive Interface** — Works across desktop and mobile screens.
- 🌙 **Dark Mode** — Switch between light and dark themes.

---

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Frontend development and build tool |
| Node.js | Backend JavaScript runtime |
| Express.js | Backend server and API |
| Socket.IO | Real-time communication |
| Multer | File upload handling |

---

## 🗂️ Project Structure

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

---

## 🚀 Getting Started

Follow these steps to run BlinkShare locally.

### 📋 Prerequisites

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)

### 1. 📥 Clone the Repository

```bash
git clone https://github.com/vikram9369/BlinkShare.git
cd BlinkShare
```

### 2. ⚙️ Start the Backend

```bash
cd backend
npm install
npm start
```

The backend uses port `5000` by default, or the port configured by the hosting environment.

Keep the backend terminal running.

### 3. 🖥️ Start the Frontend

Open a second terminal from the project root and run:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown in the terminal, usually:

[http://localhost:5173](http://localhost:5173)

### 4. 🔄 Start Sharing

1. Open BlinkShare in your browser.
2. Enter a device name and a room code.
3. Open BlinkShare on another device or browser.
4. Join the same room using the same room code.
5. Send messages or upload files to share them with connected users in that room.

---

## 📦 File Upload Limit

The backend supports file uploads up to **75 MB per file**.

---

## ☁️ Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Live Application:** [Open BlinkShare](https://blinkshare-live.vercel.app/)

---

## ⚠️ Current Limitations

- Uploaded files are stored on the backend server's local filesystem and may not persist after a restart or redeployment.
- File uploads are limited to 75 MB per file.

## 🔭 Future Improvements

- Integrate persistent cloud file storage.
- Enhance file management and security.

---

## 👨‍💻 Author

**Vikram Kushwaha**  
Computer Science and Engineering

---
