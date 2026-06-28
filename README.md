# 🌍 FixMyVillage

> **Smart Village Issue Reporting & Management System**

---

## 🚀 Overview

**FixMyVillage** is a MERN Stack web application that enables villagers to report public issues digitally while allowing administrators and workers to manage and resolve complaints efficiently with real-time tracking.

---

## 🖼️ Preview

<img width="1149" height="1369" alt="ChatGPT Image Jun 26, 2026, 07_36_53 PM" src="https://github.com/user-attachments/assets/72b24ad7-9b8b-48bc-809b-017f9a5460c9" />

## ✨ Features

| 👨‍🌾 Villager      | 👷 Worker                | 🛠️ Admin          |
| :------------------ | :----------------------- | :----------------- |
| Register & Login    | View Assigned Complaints | Manage Users       |
| Submit Complaint    | Update Progress          | Assign Workers     |
| Upload Images       | Complete Tasks           | Monitor Complaints |
| Track Status        |                          | Manage Categories  |
| Complaint History   |                          | Reports & Feedback |
| Email Notifications |                          |                    |

---

## 🔄 Workflow

```text
👨‍🌾 User
    │
    ▼
📝 Submit Complaint
    │
    ▼
🛠️ Admin Review
    │
    ▼
👷 Assign Worker
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

## 📊 Status Flow

```text
Pending
   │
   ▼
Assigned
   │
   ▼
In Progress
   │
   ▼
Completed
```

---

## 🛠️ Tech Stack

```text
React.js • Node.js • Express.js • MongoDB
Tailwind CSS • JWT • Cloudinary • Nodemailer
```

---

## 🚀 Setup

```bash
git clone https://github.com/skmsajid/fixmyvillage.git

cd fixmyvillage

# Client
cd client && npm install

# Server
cd ../server && npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Run

```bash
# Backend
cd server
npm start

# Frontend
cd client
npm run dev
```

---

## 📂 Structure

```text
FixMyVillage/
├── client/
├── server/
├── package.json
└── README.md
```

---

## 🎯 Objectives

* Digital complaint management
* Real-time tracking
* Faster resolution
* Better transparency
* Reduced paperwork

---

## 🚀 Future Scope

* AI Categorization
* GPS Tracking
* Mobile App
* Multi-language Support
* Government Integration

---

## 📜 License

**MIT License**
