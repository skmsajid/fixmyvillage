# 🌍 FixMyVillage

<div align="center">

### **Smart Village Issue Reporting & Management System**

*A modern MERN Stack platform that digitizes village complaint management by connecting Villagers, Workers, and Administrators through a transparent, efficient, and real-time workflow.*

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

</div>

---

# 📖 Overview

**FixMyVillage** is a full-stack MERN web application designed to modernize village grievance management by replacing manual complaint handling with a centralized digital platform.

The system enables villagers to submit complaints, administrators to manage and assign issues, and workers to resolve them through an organized workflow. With image uploads, email notifications, real-time status tracking, and structured complaint management, the platform improves transparency, accountability, and service efficiency.

---

# ✨ Core Features

## 👨‍🌾 Villager Portal

- Secure Registration & Authentication
- Submit Complaints with Image Upload
- Real-Time Complaint Tracking
- Complete Complaint History
- Automated Email Notifications
- Resolution Feedback System

---

## 🛠️ Administrator Portal

- Manage Users & Workers
- Review Submitted Complaints
- Assign Complaints to Workers
- Monitor Complaint Progress
- Manage Complaint Categories
- View Reports & User Feedback

---

## 👷 Worker Portal

- View Assigned Complaints
- Update Work Progress
- Mark Complaints as Completed

---

# 🔄 System Workflow

```text
                        👤 Login
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
                  ┌────────┴────────┐
                  ▼                 ▼
             ❌ Rejected      ✅ Approved
                                     │
                                     ▼
                          👷 Assign Worker
                                     │
                                     ▼
                           🚧 Work In Progress
                                     │
                                     ▼
                             ✅ Issue Resolved
                                     │
                                     ▼
                        📧 Email Notification
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

# 🏗️ Technology Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Authentication** | JWT |
| **Cloud Services** | Cloudinary |
| **Email Service** | Nodemailer |

---

# 📁 Project Structure

```text
FixMyVillage
│
├── client
│   ├── src
│   ├── components
│   ├── pages
│   └── assets
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   └── routes
│
├── package.json
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/skmsajid/fixmyvillage.git
cd fixmyvillage
```

---

## Install Dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd ../server
npm install
```

---

## Environment Variables

Create a `.env` file inside the **server** directory.

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

---

## Run the Application

### Start Backend

```bash
cd server
npm start
```

### Start Frontend

```bash
cd client
npm run dev
```

---

# 🚀 Future Roadmap

```text
🤖 AI-powered Complaint Classification

📍 GPS-based Complaint Location Tracking

📱 Native Mobile Application

🌐 Multi-language Support

💬 Real-time Chat Between Users & Workers

📈 Advanced Analytics & Reporting Dashboard
```

---

# 💡 Key Highlights

- Digital Complaint Management
- Role-Based Access Control
- Secure JWT Authentication
- Cloud Image Uploads
- Automated Email Notifications
- Real-Time Status Tracking
- Feedback Collection
- Scalable MERN Architecture

---

# 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

### 🌱 Building Smarter Villages Through Digital Innovation

**Making village governance more transparent, efficient, and connected.**

</div>
