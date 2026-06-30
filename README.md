# 🌍 FixMyVillage

> **A simple and smart way to manage village issues digitally**

---

## 🚀 Overview

**FixMyVillage** is a MERN stack web application built to make village issue reporting easier and more organized. It connects **villagers**, **workers**, and **admins** on one platform so problems can be reported, tracked, and solved faster with better transparency.

---

## 🖼️ Preview

<img width="1149" height="1369" alt="ChatGPT Image Jun 26, 2026, 07_36_53 PM" src="https://github.com/user-attachments/assets/7aebe8eb-891c-4f77-9d21-df83492c0420" />

## ⚙️ System Modules

```
👨‍🌾 Villager
├── Register / Login
├── Submit complaints with images
├── Track complaint status
├── View past complaints
└── Give feedback

👷 Worker
├── Login
├── View assigned tasks
├── Update progress
└── Mark tasks as completed

🛠️ Admin
├── Dashboard
├── Manage users & workers
├── Assign complaints
├── Monitor progress
└── View reports & feedback
```

---

## 🔄 Workflow

```text
User logs in
      │
      ▼
Submit complaint (with details & image)
      │
      ▼
Stored in database
      │
      ▼
Admin reviews complaint
   ┌───────────────┬───────────────┐
   ▼               ▼
Reject          Assign worker
   │               │
   ▼               ▼
Notify user     Worker starts work
                     │
                     ▼
              Work in progress
                     │
                     ▼
              Mark as completed
                     │
                     ▼
              Notify user
                     │
                     ▼
              User gives feedback
```

---

## 📊 Complaint Lifecycle

```text
Pending → Assigned → In Progress → Completed → Feedback
```

---

## 📖 User Flow

```text
Villager → Submit → Track → Feedback
Worker   → View → Update → Complete
Admin    → Review → Assign → Monitor
```

---

## 💻 Tech Stack

| Layer    | Technology             |
| -------- | ---------------------- |
| Frontend | React.js, Tailwind CSS |
| Backend  | Node.js, Express.js    |
| Database | MongoDB                |
| Services | Nodemailer, Cloudinary |
| Auth     | JWT                    |

---

## 🚀 Setup

### Clone Repository

```bash
git clone https://github.com/skmsajid/fixmyvillage.git
cd fixmyvillage
```

### Install Dependencies

```bash
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
# Backend
cd server && npm start

# Frontend
cd client && npm run dev
```

---

## 📂 Project Structure

```text
FixMyVillage/
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
│
└── README.md
```

---

## 🎯 Objectives

```
✔ Make complaint reporting digital
✔ Track issues in real-time
✔ Improve transparency
✔ Solve problems faster
✔ Reduce paperwork
✔ Improve communication
```

---

## 🌟 Advantages

```
⚡ Faster issue resolution
📊 Clear and transparent system
📧 Automatic notifications
👷 Better task management
📱 Easy to use
🏡 Supports smart villages
```

---

## 🚀 Future Scope

```
🤖 AI-based issue detection
📍 GPS tracking
📱 Mobile app
🌍 Multi-language support
💬 Live chat
📈 Analytics dashboard
🎙 Voice-based complaints
```

---

## 📜 License

**MIT License**
