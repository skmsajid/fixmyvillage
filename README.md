# 🌍 FixMyVillage

> **A Smart, Transparent, and Efficient Platform for Reporting and Resolving Village Issues**

---

## 🚀 Overview

**FixMyVillage** is a full-stack **MERN application** designed to digitize and streamline village-level issue reporting and resolution. The platform connects **Villagers**, **Workers**, and **Administrators** in one centralized system, enabling transparent communication, efficient task management, and faster issue resolution.

Every complaint follows a structured, trackable lifecycle—from submission and review to assignment, completion, and feedback—promoting accountability throughout the process.

---

## ✨ Key Features

```text
👨‍🌾 Villager
• Secure registration and login
• Submit complaints with detailed descriptions and images
• Track complaint status in real time
• View complete complaint history
• Receive email notifications about status updates
• Submit feedback after issue resolution

🛠️ Administrator
• Manage villagers and workers
• Review and verify submitted complaints
• Assign complaints to suitable workers
• Monitor complaint progress
• Manage complaint categories
• Review reports and feedback

👷 Worker
• View assigned complaints
• Update task progress
• Mark assigned tasks as completed
```

---

## 🔄 System Workflow

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
           🛠️ Administrator Review
          ┌─────────┴─────────┐
          ▼                   ▼
      ❌ Rejected       ✅ Assigned to Worker
                              │
                              ▼
                    👷 Work in Progress
                              │
                              ▼
                     ✅ Mark as Completed
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

## 🛠️ Tech Stack

| Layer              | Technologies           |
| ------------------ | ---------------------- |
| **Frontend**       | React.js, Tailwind CSS |
| **Backend**        | Node.js, Express.js    |
| **Database**       | MongoDB                |
| **Authentication** | JSON Web Tokens (JWT)  |
| **Services**       | Nodemailer, Cloudinary |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/skmsajid/fixmyvillage.git
cd fixmyvillage
```

---

### 2. Install Dependencies

```bash
cd client
npm install

cd ../server
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

### 4. Run the Application

Start the backend:

```bash
cd server
npm start
```

In a separate terminal, start the frontend:

```bash
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
🤖 AI-powered complaint classification
📍 GPS-based issue location tracking
📱 Dedicated Android and iOS applications
🌍 Multi-language support
💬 Real-time communication between villagers and workers
📊 Advanced analytics and reporting dashboard
```

---

## 📜 License

**MIT License**
