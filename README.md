# 🌍 FixMyVillage

> **A Smart, Transparent, and Efficient Platform for Village Issue Reporting and Resolution**

---

## 🚀 Overview

**FixMyVillage** is a full-stack **MERN-based web application** built to digitize and simplify village-level complaint reporting and resolution. It connects **Villagers**, **Workers**, and **Administrators** on a unified platform, enabling transparent communication, faster response times, and structured task management.

Each complaint follows a clearly defined lifecycle—from submission to final resolution—ensuring accountability, traceability, and an efficient end-to-end workflow.

---

## ✨ Key Features

```text
👨‍🌾 Villager
• Secure registration and login
• Submit complaints with images and detailed descriptions
• Track real-time complaint status
• View complete complaint history
• Receive email notifications for updates
• Provide feedback after resolution

🛠️ Admin
• Manage users and workers
• Review and verify submitted complaints
• Assign complaints to appropriate workers
• Monitor progress in real time
• Manage complaint categories
• Access reports and feedback insights

👷 Worker
• View assigned complaints
• Update work progress status
• Mark tasks as completed
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
           🛠️ Admin Review
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
| **Authentication** | JWT                    |
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

Create a `.env` file inside the `server` directory:

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

```bash
# Start Backend
cd server
npm start
```

```bash
# Start Frontend
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
🤖 AI-based complaint classification
📍 GPS-based issue location tracking
📱 Mobile application (Android/iOS)
🌍 Multi-language support
💬 Real-time chat between users and workers
📊 Advanced analytics dashboard
```

---

## 📜 License

**MIT License**
