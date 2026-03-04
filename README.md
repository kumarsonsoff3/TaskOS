# ✨ TaskOS Pro - Task Management App ✨

A premium, modern task management application built with a unified MVC architecture. This application allows users to elegantly organize their tasks with a beautiful dark-mode glassmorphism interface. 🚀

## 🌟 Features
- 📝 **Create & Manage Tasks:** Add new tasks, mark them as completed, and delete them effortlessly.
- 🔒 **Multi-User Isolation:** Uses Local Storage to track user-specific tasks so different users don't overwrite or see each other's tasks.
- 🎨 **Premium UI:** Smooth animations, custom checkboxes, and dynamic interactive styling for a top-tier aesthetic.
- 🏗️ **Unified Architecture:** The React frontend and Express backend are served together natively from a single root directory.

## 🛠️ Tech Stack
- **Frontend:** ⚛️ React, ⚡ Vite, 💅 Vanilla CSS
- **Backend:** 🟢 Node.js, 🚂 Express
- **Database:** 🍃 MongoDB (Mongoose)

## 🚀 Getting Started

### 📋 Prerequisites
Make sure you have Node.js installed on your machine.

### ⚙️ Installation
1. Clone this repository to your local machine:
   ```bash
   git clone <repository-url>
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file in the root directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=your_mongodb_connection_string
   ```
   *⚠️ Note: Ensure your current IP is whitelisted in MongoDB Atlas.*

### 🛠️ Running the App
1. Build the production frontend files:
   ```bash
   npm run build
   ```
2. Start the integrated backend server:
   ```bash
   npm run start
   ```
3. Open your browser and navigate to `http://localhost:5000` 🌐.

🎉 Enjoy organizing your day!
