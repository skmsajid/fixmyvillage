# 🌍 FixMyVillage

> **A Smart Digital Platform for Village Issue Reporting & Management**

---

## 🚀 Overview

**FixMyVillage** is a MERN Stack web application that simplifies village complaint management by connecting **Villagers**, **Workers**, and **Administrators** on a single platform. It enables transparent issue reporting, efficient task assignment, real-time tracking, and faster resolution through a structured digital workflow.

---

## ✨ Features

```text
👨‍🌾 Villager
• Register & Login
• Submit Complaints with Images
• Track Complaint Status
• View Complaint History
• Receive Email Notifications
• Submit Feedback

🛠️ Admin
• Manage Users & Workers
• Review Complaints
• Assign Workers
• Monitor Progress
• Manage Categories
• View Reports & Feedback

👷 Worker
• View Assigned Complaints
• Update Progress
• Complete Assigned Tasks
```

---

## 🔄 Workflow

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
           🛠️ Admin Review
          ┌─────────┴─────────┐
          ▼                   ▼
      ❌ Reject         ✅ Assign Worker
                              │
                              ▼
                    👷 Work In Progress
                              │
                              ▼
                     ✅ Mark Completed
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

## 🛠️ Technology Stack

| Layer              | Technologies           |
| ------------------ | ---------------------- |
| **Frontend**       | React.js, Tailwind CSS |
| **Backend**        | Node.js, Express.js    |
| **Database**       | MongoDB                |
| **Authentication** | JWT                    |
| **Services**       | Nodemailer, Cloudinary |

---

## 🚀 Getting Started

```bash
git clone https://github.com/skmsajid/fixmyvillage.git

cd fixmyvillage

cd client
npm install

cd ../server
npm install
```

Create a **.env** file inside the `server` directory.

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

Run the application.

```bash
# Backend
cd server
npm start

# Frontend
cd client
npm run dev
```

---

## 📂 Project Structure

```text
FixMyVillage/
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
│
├── package.json
└── README.md
```

---

## 🚀 Future Enhancements

```text
🤖 AI-based Complaint Classification
📍 GPS Location Tracking
📱 Mobile Application
🌍 Multi-language Support
💬 Real-time Chat
📊 Analytics Dashboard
```

---

## 📜 License

**MIT License**
