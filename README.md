# 🌍 FixMyVillage

### Smart Village Issue Reporting & Management System

---

## 🚀 Overview

**FixMyVillage** is a MERN Stack web application that digitizes village issue reporting and management. It enables villagers to report public issues, administrators to manage complaints, and workers to resolve them efficiently through a transparent and real-time workflow.

---

## 🖼️ Preview

<img width="1149" height="1369" alt="ChatGPT Image Jun 26, 2026, 07_36_53 PM" src="https://github.com/user-attachments/assets/1714d911-a630-4b41-b4d6-7f3a2358ee58" />

## ✨ Features

| 👨‍🌾 Villager         | 👷 Worker                | 🛠️ Admin          |
| ---------------------- | ------------------------ | ------------------ |
| Register & Login       | Secure Login             | Admin Dashboard    |
| Submit Complaints      | View Assigned Complaints | Manage Users       |
| Upload Images          | Update Progress          | Manage Workers     |
| Track Complaint Status | Mark as Completed        | Assign Workers     |
| View Complaint History | View Assigned Tasks      | Manage Categories  |
| Email Notifications    |                          | Monitor Complaints |
| Submit Feedback        |                          | Reports & Feedback |

---

## 🔄 System Workflow

```text
                     🚀 Start
                        │
                        ▼
              👤 User Login / Registration
                        │
                        ▼
                 📝 Submit Complaint
        (Category + Description + Image)
                        │
                        ▼
             📤 Complaint Submitted
                        │
                        ▼
             🛠️ Admin Reviews Complaint
                        │
             ┌──────────┴──────────┐
             │                     │
             ▼                     ▼
      ❌ Reject Complaint     ✅ Approve Complaint
             │                     │
             ▼                     ▼
     Notify User           👷 Assign Worker
                                   │
                                   ▼
                         👷 Worker Accepts Task
                                   │
                                   ▼
                         🚧 Work In Progress
                                   │
                                   ▼
                        ✅ Mark as Completed
                                   │
                                   ▼
                    📧 Notify User via Email
                                   │
                                   ▼
                        ⭐ Provide Feedback
                                   │
                                   ▼
                              🎉 End
```

---

## 📊 Complaint Status Flow

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
```

---

## 📖 How to Use

### 👨‍🌾 Villager

1. Register or Login
2. Submit a complaint with category, description, and image.
3. Track complaint status.
4. Receive email notifications.
5. Submit feedback after completion.

### 👷 Worker

1. Login to the worker dashboard.
2. View assigned complaints.
3. Update work progress.
4. Mark the complaint as completed.

### 🛠️ Admin

1. Login to the admin dashboard.
2. Review submitted complaints.
3. Assign workers.
4. Monitor complaint progress.
5. Manage users, workers, categories, reports, and feedback.

---

## 🛠️ Tech Stack

| Technology   | Purpose             |
| ------------ | ------------------- |
| React.js     | Frontend            |
| Node.js      | Backend Runtime     |
| Express.js   | REST API            |
| MongoDB      | Database            |
| Tailwind CSS | UI Styling          |
| Nodemailer   | Email Notifications |
| Cloudinary   | Image Storage       |
| JWT          | Authentication      |

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

Create a `.env` file inside the **server** folder.

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

Run the project.

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

## 🎯 Objectives

* Digitize village complaint management
* Improve transparency
* Enable real-time complaint tracking
* Reduce paperwork
* Speed up issue resolution
* Improve communication between users and authorities

---

## 🌟 Advantages

* Faster complaint resolution
* Transparent complaint tracking
* Real-time updates
* Efficient worker assignment
* Reduced manual paperwork
* Better communication
* Improved accountability

---

## 🚀 Future Enhancements

* AI-based complaint categorization
* GPS location tracking
* Mobile application
* Multi-language support
* Real-time chat
* Government portal integration
* Voice-based complaint registration
* Analytics dashboard

---

## 📜 License

**MIT License**
