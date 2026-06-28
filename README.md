# 🌍 FixMyVillage

> **Smart Village Issue Reporting & Management System**

---

## 🚀 Overview

**FixMyVillage** is a MERN Stack web application that streamlines village issue reporting and resolution. It connects **Villagers**, **Workers**, and **Administrators** through a centralized platform for transparent complaint management and real-time tracking.

---

## 🖼️ Preview

```md
![FixMyVillage Preview](./preview.png)
```

---

# ⚙️ System Modules

```
👨‍🌾 Villager
├── Register / Login
├── Submit Complaint
├── Upload Image
├── Track Status
├── View History
├── Receive Email
└── Provide Feedback

👷 Worker
├── Login
├── View Assigned Complaints
├── Update Progress
└── Mark as Completed

🛠️ Admin
├── Dashboard
├── Manage Users
├── Manage Workers
├── Assign Complaints
├── Manage Categories
├── Monitor Progress
└── Reports & Feedback
```

---

# 🔄 Complete Workflow

```text
                 👤 Villager
                      │
                      ▼
         Register / Login Account
                      │
                      ▼
        Submit Complaint + Image
                      │
                      ▼
          Complaint Stored in DB
                      │
                      ▼
            🛠️ Admin Dashboard
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
      Reject Issue          Assign Worker
          │                       │
          ▼                       ▼
  Notify User by Email      👷 Worker Dashboard
                                  │
                                  ▼
                         Accept Assigned Task
                                  │
                                  ▼
                          Update Progress
                                  │
                                  ▼
                           Complete Work
                                  │
                                  ▼
                     Status → Completed
                                  │
                                  ▼
                     Email Notification
                                  │
                                  ▼
                      ⭐ User Feedback
```

---

# 📊 Complaint Lifecycle

```text
📝 Pending
      │
      ▼
👷 Assigned
      │
      ▼
🚧 In Progress
      │
      ▼
✅ Completed
      │
      ▼
⭐ Feedback
```

---

# 📖 User Journey

```text
Villager
─────────
Register
   │
   ▼
Submit Complaint
   │
   ▼
Track Status
   │
   ▼
Receive Updates
   │
   ▼
Give Feedback


Worker
──────
Login
   │
   ▼
View Tasks
   │
   ▼
Update Progress
   │
   ▼
Complete Task


Admin
─────
Review Complaint
   │
   ▼
Assign Worker
   │
   ▼
Monitor Progress
   │
   ▼
Close Complaint
```

---

# 💻 Tech Stack

| Frontend     | Backend            | Database | Services   |
| ------------ | ------------------ | -------- | ---------- |
| React.js     | Node.js            | MongoDB  | Nodemailer |
| Tailwind CSS | Express.js         |          | Cloudinary |
|              | JWT Authentication |          |            |

---

# 🚀 Setup

### Clone Repository

```bash
git clone https://github.com/skmsajid/fixmyvillage.git
cd fixmyvillage
```

### Install Dependencies

```bash
cd client
npm install

cd ../server
npm install
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
# Backend
cd server
npm start

# Frontend
cd client
npm run dev
```

---

# 📂 Project Structure

```text
FixMyVillage/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── services/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── uploads/
│
├── package.json
└── README.md
```

---

# 🎯 Objectives

```
✔ Digital Complaint Management
✔ Real-Time Tracking
✔ Faster Issue Resolution
✔ Better Transparency
✔ Reduced Paperwork
✔ Improved Communication
```

---

# 🌟 Advantages

```
⚡ Faster Resolution
📊 Transparent Workflow
📧 Automated Notifications
👷 Efficient Worker Assignment
📱 Easy Complaint Tracking
🏡 Smart Village Governance
```

---

# 🚀 Future Scope

```
🤖 AI Complaint Classification
📍 GPS Location Tracking
📱 Mobile Application
🌍 Multi-language Support
💬 Real-time Chat
🏛 Government Integration
📈 Analytics Dashboard
🎙 Voice-based Complaints
```

---

# 📜 License

**MIT License**
