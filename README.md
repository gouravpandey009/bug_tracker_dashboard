
```markdown
# ⚙️ FealtyX - Bug & Task Tracker

> 🎯 **A sleek, role-based bug/task management system** built with **Next.js 14, React, TypeScript, and TailwindCSS**, designed to showcase real-world project architecture, role separation, and frontend excellence.

![FealtyX Banner](https://your-image-link.com/banner.png) <!-- Optional -->

---

## 📌 Overview

FealtyX is a modern web application designed for **developers** and **managers** to manage tasks, bugs, and productivity collaboratively. With **mock login**, **role-based dashboards**, **task workflows**, and **visual analytics**, this project demonstrates real-world features in a clean, responsive UI.

---

## 🚀 Live Demo & Walkthrough

- 🌐 **Live App:** [https://fealtyx.vercel.app](https://fealtyx.vercel.app)  
- 📽️ **Video Walkthrough:** [Watch here](https://loom.com/your-demo-link)  
- 🔐 **Mock Credentials:**

| Role     | Email                | Password |
|----------|----------------------|----------|
| Developer | `dev@fealty.com`     | `1234`   |
| Manager   | `manager@fealty.com` | `1234`   |

---

## 🧩 Features

### 🔐 1. Authentication + Role System

- Mock login (no backend required)
- Differentiated access for **Developers** and **Managers**
- Role-based routing & UI rendering

---

### 📊 2. Dashboards

- **Developer Dashboard:**
  - View own tasks & bugs
  - Create, edit, delete, and submit tasks
- **Manager Dashboard:**
  - View all tasks & developers
  - Approve or reject bug closure
  - Monitor task trends & time reports

---

### 📝 3. Task/Bug Management

- Fields: Title, Description, Status, Priority, Assignee, Dates
- Status lifecycle:
  - Open → Pending Approval → Closed / Re-opened
- Sort & filter by priority, date, or status

---

### ⏱️ 4. Time Tracker

- Start/Stop timers on tasks
- Track time spent on each task
- Manager can view developer-wise reports

---

### 📈 5. Visual Analytics

- Trendline graph of concurrent tasks per day
- Dynamic updates based on task activity

---

### 🎨 6. UI/UX

- Clean layout with **TailwindCSS** + subtle animations
- Smooth transitions, responsive on all devices
- Fully mobile compatible ✨

---

## 📂 Folder Structure

> Using a **flat `app/` directory layout** with modular separation for roles and components.

```

app/
├── login/              # Auth page
├── dashboard/          # Shared dashboard wrapper
│   ├── developer/      # Developer-specific views
│   └── manager/        # Manager-specific views
├── components/         # UI components (Button, TaskCard, etc.)
├── utils/              # Helpers, constants
├── layout.tsx          # Global layout with theming
├── globals.css         # Tailwind & custom styles
└── page.tsx            # Home redirect (/login)

````

---

## ✅ Phase Plan & Completion

| Phase | Description | Status |
|-------|-------------|--------|
| 0     | Project Setup (Next.js + Tailwind + TypeScript) | ✅ Done |
| 1     | Authentication System (Mock login, role-based) | ✅ Done |
| 2     | Role-Specific Dashboards (Dev/Manager) | ✅ Done |
| 3     | Task CRUD + Status Workflow | ✅ Done |
| 4     | Time Tracker Implementation | ✅ Done |
| 5     | Filter, Sort, Search | ✅ Done |
| 6     | Trend Graph + Analytics | ✅ Done |
| 7     | Final UI Polish, Animations | ✅ Done |
| 8     | Deployment + Docs | ✅ Done 🎉 |

---

## 📜 Assumptions Made

- Mock login is acceptable (no real authentication)
- Data is stored in **LocalStorage** (no database)
- Manager can view all developers' tasks and reports
- Charts are based on simulated activity

---

## 🛠️ Tech Stack

| Tech        | Purpose                      |
|-------------|------------------------------|
| **Next.js** | App Routing + Page rendering |
| **React**   | Component-based UI           |
| **TypeScript** | Type-safe development     |
| **TailwindCSS** | Fast, responsive styling |
| **Lucide Icons** | Modern icons            |
| **LocalStorage** | Client-side mock state  |
| **Chart.js / Recharts** | Trend visualization |

---

## 🧪 How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/fealtyx-tracker.git
cd fealtyx-tracker

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
````

Open [http://localhost:3000](http://localhost:3000) to view the app.



