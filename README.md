# 🌍 FixMyVillage

> **A Digital Platform for Efficient Village Complaint Management**

---

## 🚀 Overview

**FixMyVillage** is a MERN stack application that modernizes village complaint management by connecting **Villagers**, **Workers**, and **Admins** on a single platform. It replaces manual processes with a transparent system for faster issue resolution and real-time tracking.

---

## 🏗️ System Architecture

```text
                 🌍 FixMyVillage

      👨‍🌾 Villager     🛠️ Admin      👷 Worker
            │               │              │
            └─────── Centralized Platform ───────┘
                            │
                            ▼
          Complaint Management & Tracking System
```

---

## ✨ Key Features

### 👨‍🌾 Villager

* Secure registration & login
* Submit complaints with images
* Add detailed descriptions & categories
* Track complaint status in real-time
* View complaint history
* Receive email notifications
* Provide feedback & ratings
* Easy-to-use responsive interface

### 🛠️ Admin

* Centralized dashboard overview
* Manage users and workers
* Assign complaints to workers
* Approve or reject complaints
* Monitor complaint progress
* Manage complaint categories
* View reports and analytics
* Track feedback and performance
* Ensure system transparency

### 👷 Worker

* Secure login access
* View assigned complaints
* Accept or reject tasks
* Update work progress
* Upload completion proof (images)
* Mark tasks as completed
* Efficient task management dashboard

---

## 🔄 Complaint Workflow

```text
👤 Login
   │
   ▼
📝 Submit Complaint
   │
   ▼
📥 Registered
   │
   ▼
🛠️ Admin Review
   │
   ├── ❌ Reject
   │
   └── ✅ Assign Worker
            │
            ▼
      🚧 Work Progress
            │
            ▼
      ✅ Completed
            │
            ▼
      📧 Notification
            │
            ▼
      ⭐ Feedback
```

---

## 📊 Complaint Lifecycle

```text
📝 Pending → 👷 Assigned → 🚧 In Progress → ✅ Completed → ⭐ Feedback
```

---

## 💻 Tech Stack

| Category | Technologies           |
| -------- | ---------------------- |
| Frontend | React.js, Tailwind CSS |
| Backend  | Node.js, Express.js    |
| Database | MongoDB                |
| Auth     | JWT                    |
| Services | Nodemailer, Cloudinary |

---

## 🚀 Getting Started

```bash
git clone https://github.com/skmsajid/fixmyvillage.git
cd fixmyvillage

cd client && npm install
cd ../server && npm install
```

### Environment Variables

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASS=your_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run App

```bash
cd server && npm start
cd client && npm run dev
```

---

## 📁 Project Structure

```text
FixMyVillage/
├── client/
├── server/
├── package.json
└── README.md
```

---

## 🎯 Objectives

* Digitize complaint management
* Improve transparency
* Enable real-time tracking
* Speed up issue resolution

---

## 🚀 Future Enhancements

* AI-based classification
* GPS tracking
* Mobile app
* Multi-language support
* Analytics dashboard

---

## 📜 License

**MIT License**
