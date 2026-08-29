# 🌱 Fix My Village

> A digital platform for villagers to report local problems and for workers and administrators to manage and resolve them efficiently.

## 📌 About the Project

**Fix My Village** is a full-stack web application designed to improve communication between villagers, field workers, and administrators.

Villagers can report problems such as **electricity, water, garbage, and drainage issues**. Workers can view and manage assigned issues, while administrators can manage users and monitor feedback.

The goal is simple:

**Report → Assign → Resolve → Improve**

---

## 🔄 Project Flow

```text
                         FIX MY VILLAGE
                               │
              ┌────────────────┼────────────────┐
              │                │                │
           Villager          Worker           Admin
              │                │                │
              ▼                ▼                ▼
        Create Account     View Assigned     Manage Users
              │               Issues             │
              ▼                │                  ▼
        Admin Approval         ▼            Approve / Reject
              │          Update Status            │
              ▼                │                  ▼
        Report Issue           ▼             View Feedback
              │             Resolve              │
              └────────────────┼─────────────────┘
                               ▼
                       Better Village Services
```

## ✨ Main Features

### 👨‍🌾 Villager

* Register an account
* Wait for administrator approval
* Login after approval
* Report village issues
* Upload issue photos
* Track issue status
* Submit feedback

### 👷 Worker

* View assigned issues
* Filter issues by category
* Start assigned tasks
* Update task status
* Mark issues as resolved
* View task statistics

### 🛡️ Admin

* Login through admin account
* Approve or reject signup requests
* Manage registered users
* View reported issues
* View and manage feedback
* Delete feedback
* Monitor overall activity

---

## 🗂️ Issue Categories

The application currently supports:

* ⚡ Electricity
* 💧 Water
* 🗑️ Garbage
* 🚰 Drainage

---

## 🏗️ Technology Stack

### Frontend

* React
* React Router
* Recharts
* CSS

### Backend

* Python
* Django
* Django REST Framework

### Database

* MySQL

### Authentication

* Django Session Authentication
* CSRF protection
* Role-based access

---

## 🔐 Authentication Flow

```text
User Login
    │
    ▼
Django authenticate()
    │
    ▼
Check Username & Password
    │
    ▼
Check User Role
    │
    ├── Villager → Check Approval Status
    │
    ├── Worker   → Worker Dashboard
    │
    └── Admin    → Admin Dashboard
    │
    ▼
login(request, user)
    │
    ▼
Django Session Created
    │
    ▼
Authenticated API Requests
```

---

## 🔑 Role-Based Access

| Role           | Main Access                     |
| --------------|  ------------------------------- |
| 👨‍🌾 Villager   | Report issues & submit feedback |
| 👷 Worker     | Manage assigned issues          |
| 🛡️ Admin      | Manage users, issues & feedback |

---

## 📁 Project Structure

```text
fixmyvillage/
│
├── client/                 # React frontend
│   ├── src/
│   ├── package.json
│   └── ...
│
├── server/                 # Django backend
│   ├── main_app/
│   ├── users/
│   ├── issues/
│   ├── feedbacks/
│   ├── manage.py
│   └── requirements.txt
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/skmsajid/fixmyvillage.git
cd fixmyvillage
```

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

### 3. Backend Setup

Open another terminal:

```bash
cd server
python -m venv env
```

Activate the environment on Windows:

```bash
env\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start Django:

```bash
python manage.py runserver
```

---

## 🔗 Application Architecture

```text
┌──────────────────────┐
│      React UI        │
│      client/         │
└──────────┬───────────┘
           │
           │ HTTP / REST API
           ▼
┌──────────────────────┐
│   Django + DRF       │
│      server/         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       MySQL          │
│      Database        │
└──────────────────────┘
```

---

## 🎯 Project Goal

The purpose of **Fix My Village** is to provide a simple digital system where:

> **Villagers can report problems, workers can resolve them, and administrators can manage the entire process.**

This creates a transparent workflow for handling everyday village issues.

---

## 📌 Future Improvements

* Real-time notifications
* Issue location/map integration
* Worker assignment automation
* Advanced admin analytics
* Email/SMS notifications
* Mobile application

---

## 👨‍💻 Built With

**React + Django REST Framework + MySQL**

Made to make local problem reporting and resolution **simpler, faster, and more transparent.**
