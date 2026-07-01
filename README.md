# 🌍 FixMyVillage

> **Building Smarter Villages Through Digital Complaint Management**

---

## 🚀 Overview

**FixMyVillage** is a full-stack MERN application that modernizes village complaint management by connecting **Villagers**, **Workers**, and **Administrators** on a single platform. It replaces manual reporting with a transparent digital workflow, enabling faster issue resolution, real-time tracking, and improved communication.

---

## 🖼️ Preview

<img width="1149" height="1369" alt="ChatGPT Image Jun 26, 2026, 07_36_53 PM" src="https://github.com/user-attachments/assets/e04dc05d-45de-4a44-acaf-6a482603e4ea" />

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

### 👨‍🌾 Villager Portal

* Secure Registration & Login
* Submit Complaints with Images
* Live Complaint Tracking
* Complaint History
* Email Notifications
* Feedback Submission

### 🛠️ Admin Portal

* Centralized Dashboard
* User & Worker Management
* Complaint Assignment
* Category Management
* Progress Monitoring
* Reports & Feedback

### 👷 Worker Portal

* Secure Login
* Assigned Complaint Dashboard
* Progress Updates
* Task Completion

---

## 🔄 Complaint Workflow

```text
👤 User Login
      │
      ▼
📝 Submit Complaint
(Category • Description • Image)
      │
      ▼
📥 Complaint Registered
      │
      ▼
🛠️ Admin Verification
      │
      ├───────────────┐
      │               │
      ▼               ▼
❌ Reject         ✅ Assign Worker
                      │
                      ▼
              👷 Accept Task
                      │
                      ▼
              🚧 Update Progress
                      │
                      ▼
              ✅ Complete Issue
                      │
                      ▼
             📧 Email Notification
                      │
                      ▼
              ⭐ User Feedback
```

---

## 📊 Complaint Lifecycle

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

## 👥 User Journey

```text
👨‍🌾 Villager
Register
   │
Submit Complaint
   │
Track Progress
   │
Receive Updates
   │
Provide Feedback


🛠️ Admin
Review Complaint
   │
Assign Worker
   │
Monitor Progress
   │
Close Complaint


👷 Worker
View Assignment
   │
Start Work
   │
Update Progress
   │
Complete Task
```

---

## 💻 Tech Stack

| Category           | Technologies           |
| ------------------ | ---------------------- |
| **Frontend**       | React.js, Tailwind CSS |
| **Backend**        | Node.js, Express.js    |
| **Database**       | MongoDB                |
| **Authentication** | JWT                    |
| **Services**       | Nodemailer, Cloudinary |

---

## 🚀 Getting Started

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

### Configure Environment

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

## 📁 Project Structure

```text
FixMyVillage/
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

## 🎯 Project Goals

* Digitalize village complaint management
* Improve transparency and accountability
* Enable real-time complaint tracking
* Reduce manual paperwork
* Accelerate issue resolution
* Strengthen communication between citizens and authorities

---

## 🚀 Future Enhancements

* 🤖 AI-based Complaint Classification
* 📍 GPS-enabled Complaint Location
* 📱 Mobile Application
* 🌍 Multi-language Support
* 💬 Real-time Chat
* 📊 Analytics Dashboard
* 🏛️ Government Portal Integration
* 🎙️ Voice-based Complaint Registration

---

## 📜 License

**MIT License**
