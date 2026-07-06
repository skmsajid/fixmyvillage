# 🌍 FixMyVillage

> **A Digital Platform for Efficient Village Complaint Management**

---

## 🚀 Overview

**FixMyVillage** is a MERN stack application designed to modernize village complaint management. It connects **Villagers**, **Workers**, and **Admins** through a centralized system, replacing manual processes with a transparent, efficient, and real-time solution.

---

## ✨ Core Features

### 👨‍🌾 Villager Portal

* Secure registration & login
* Submit complaints with images and descriptions
* Categorize issues for better handling
* Track complaint status in real-time
* View complaint history
* Receive email notifications
* Provide feedback and ratings
* Responsive and user-friendly interface

### 🛠️ Admin Portal

* Centralized dashboard overview
* Manage users and workers
* Approve or reject complaints
* Assign complaints to workers
* Monitor complaint progress
* Manage categories
* Access reports and analytics
* Track feedback and performance

### 👷 Worker Portal

* Secure login access
* View assigned complaints
* Accept or reject tasks
* Update progress status
* Upload completion proof (images)
* Mark tasks as completed
* Efficient task management dashboard

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

### Clone & Install

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

### Run Application

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
* Improve transparency and accountability
* Enable real-time tracking
* Accelerate issue resolution

---

## 🚀 Future Enhancements

* AI-based complaint classification
* GPS-enabled tracking
* Mobile application
* Multi-language support
* Advanced analytics dashboard

---

## 📜 License

**MIT License**
