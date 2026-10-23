# Nexora — Full Stack Job Portal & Career Platform

### Where Talent Meets Opportunity.

Nexora is a modern, high-performance professional job marketplace connecting **Job Seekers**, **Recruiters**, and **Companies** with platform moderation.

---

## 🚀 Key Features

* **Job Seeker Experience**:
  * Advanced multi-faceted search (Keyword, Location, Work Mode, Experience, Salary, Category) with weighted relevance scoring.
  * Real-time job applications with resume attachment and duplicate-application prevention.
  * Live interactive **Resume Builder** with `@media print` PDF generation.
  * Bookmark / Saved Jobs drawer with persistent server-side syncing.
  * Application status tracker with dynamic badges (`Applied`, `Shortlisted`, `Interview`, `Selected`, `Rejected`).
  * Instant notification center.

* **Recruiter Command Center**:
  * Real-time ATS (Applicant Tracking System) for candidate review and stage transitions.
  * Job posting & lifecycle management (Draft, Publish, Pause, Edit, Delete).
  * Company profile customizer and public employer brand showcase.

* **Platform Administration**:
  * System-wide KPI dashboard (Users, Companies, Active Jobs, Submissions).
  * User moderation (Suspend, Activate, Delete).
  * Job listing verification & moderation (`Approved`, `Pending Review`, `Rejected`, `Flagged`).
  * Company verification pipeline.

---

## 🛠️ Full Stack Architecture

* **Frontend**: React 19, React Router v7, Vite 8, Bootstrap 5.3, Bootstrap Icons, Glassmorphism Design System.
* **Backend**: Node.js, Express 5, Mongoose 9, JWT Authentication, Bcrypt password hashing.
* **Database**: MongoDB (powered by automatic `mongodb-memory-server` in development mode for zero-setup execution, or standard MongoDB URI via `.env`).

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
cd backend && npm install && cd ..
```

### 2. Run Full Stack Development (Frontend + Backend)
```bash
npm run dev
```
* **Frontend** runs on: `http://localhost:8000`
* **Backend API** runs on: `http://localhost:5000`

### 3. Run Individually (Optional)
```bash
# Terminal 1: Backend API
npm run server

# Terminal 2: Vite Client
npm run client
```

---

## 🔑 Pre-seeded Demo Accounts

| Role | Email | Password |
| :--- | :--- | :--- |
| **Job Seeker** | `anil@example.com` | `password123` |
| **Recruiter** | `rahul@technova.example` | `password123` |
| **Platform Admin** | `admin@jobportal.com` | `password123` |

> 💡 **Quick Switcher**: Click the **Switch Role** button in the navigation bar to immediately cycle between Job Seeker, Recruiter, and Admin sessions with live backend JWT credentials!

---

## 📡 REST API Reference

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status | Public |
| `POST` | `/api/auth/register` | Register new user account | Public |
| `POST` | `/api/auth/login` | Authenticate user & get JWT | Public |
| `GET / PUT` | `/api/auth/profile` | Read or update current user profile | Private |
| `POST` | `/api/auth/saved-jobs/:id`| Toggle saved job bookmark | Private |
| `GET` | `/api/auth/users` | List platform users | Admin |
| `PUT / DELETE` | `/api/auth/users/:id/status`| Moderate or delete user | Admin |
| `GET` | `/api/jobs` | Filter & search active approved jobs | Public |
| `GET` | `/api/jobs/:id` | Get job details | Public |
| `POST` | `/api/jobs` | Post a new job | Recruiter / Admin |
| `PUT / DELETE` | `/api/jobs/:id` | Update or remove job | Owner / Admin |
| `PUT` | `/api/jobs/:id/moderation`| Approve / Reject / Flag listing | Admin |
| `POST` | `/api/applications` | Apply for a job | Jobseeker |
| `GET` | `/api/applications/my` | View candidate submissions | Jobseeker |
| `GET` | `/api/applications/recruiter`| View recruiter job applicants | Recruiter / Admin |
| `PUT` | `/api/applications/:id/status`| Update candidate hiring status | Recruiter / Admin |
| `GET` | `/api/companies` | List approved companies | Public |
| `GET / PUT` | `/api/companies/my` | Read or update recruiter's company | Recruiter |
| `GET` | `/api/notifications` | User notifications list | Private |
| `PUT` | `/api/notifications/read-all`| Mark all notifications read | Private |
