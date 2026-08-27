# Student Registration WebApp — Vanguard Student Suite

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

A modern **Student Registration and Management System** — Vanguard Suite v2.0. Built to manage students, attendance, fees, and notices with a clean dashboard, real-time stats, and a glassmorphism UI. The frontend is a single-page app served by an Express backend with in-memory data stores and REST APIs.

**Run:** `node server.js` → `http://localhost:3000`

---

## ✨ Features

### Dashboard & Management
- **Student Management:** Add, view, search, and manage student profiles (name, roll, class, email, phone, avatar, status)
- **Statistics:** Real-time cards for `Total Students`, `Today Present`, `Fee Paid` / `Unpaid`
- **Attendance:** Track daily attendance per student and subject
- **Fees Management:** Monitor paid / due / partial fee status per student
- **Notices:** Event and academic notices with priority levels (high/medium) and dates
- **Responsive UI:** Mobile-friendly, glassmorphism cards, glass header, and dark theme

### Backend
- **REST APIs:** `/api/stats` and `/api/notices` (easily extendable for CRUD on students, attendance, fees)
- **Static Serving:** Serves `public/` frontend on all routes (`GET *` → `public/index.html`)
- **CORS Enabled** for frontend-backend separation
- **In-Memory Data:** Arrays for `students`, `attendance`, `notices`, `fees` — ready to replace with MongoDB/Mongoose

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6) — `public/index.html`, `public/css/style.css`, `public/js/app.js` |
| **Backend** | Node.js, Express 4.x, `cors`, `path` |
| **Data** | In-memory JavaScript arrays (no external DB required) |
| **Dev** | `nodemon` (optional) |

---

## 📁 Project Structure

```
STUDENT-REGISTRATION-WEBAPP/
├── server.js               # Express server, data stores, API routes
├── public/
│   ├── index.html          # Dashboard UI — student list, forms, stats
│   ├── css/
│   │   └── style.css       # Styles (glassmorphism, responsive)
│   ├── js/
│   │   └── app.js          # Frontend logic — fetch APIs, render, form handling
│   └── assets/             # Images / icons (optional)
├── package.json            # Dependencies
├── .gitignore              # node_modules, .env
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### 1. Clone & Install

```bash
git clone https://github.com/kalai-alagan/STUDENT-REGISTRATION-WEBAPP.git
cd STUDENT-REGISTRATION-WEBAPP
npm install
```

If `package.json` is missing, initialize:

```bash
npm init -y
npm install express cors
```

### 2. Run

```bash
# Production
node server.js

# Development (with nodemon)
npm install -g nodemon
nodemon server.js
```

Server starts at `http://localhost:3000` — log shows `🚀 Vanguard Server active at http://localhost:3000`

### 3. Open in Browser

Visit `http://localhost:3000` to view the dashboard.

---

## 🔌 API Reference

Base URL: `http://localhost:3000`

### `GET /api/stats`
Returns aggregated statistics.

**Response `200`:**
```json
{
  "totalStudents": 2,
  "todayPresent": 1,
  "feePaid": 1,
  "feeUnpaid": 1
}
```

### `GET /api/notices`
Returns all notices.

**Response `200`:**
```json
[
  {
    "id": 1,
    "title": "Annual Sports Day",
    "content": "Annual Sports Day will be held on May 15th.",
    "date": "2026-04-25",
    "type": "event",
    "priority": "high"
  },
  {
    "id": 2,
    "title": "System Update",
    "content": "Vanguard Suite v2.0 is now live.",
    "date": "2026-04-24",
    "type": "academic",
    "priority": "medium"
  }
]
```

### Frontend Route
#### `GET *`
Serves `public/index.html` for all non-API routes (SPA support).

---

## 🎨 Frontend Usage

1. **View Stats:** Top cards show total students, attendance, and fee status.
2. **Browse Students:** List rendered from in-memory store (or future API).
3. **Add Student:** Fill form (name, roll, class, email, phone) and submit — handled via `public/js/app.js`.
4. **Check Notices:** Scroll to notices section — data fetched from `/api/notices`.

> To add full CRUD (Create/Update/Delete), extend `server.js`:
> ```js
> app.post('/api/students', (req, res) => { students.push(req.body); res.json(req.body); });
> app.delete('/api/students/:id', (req, res) => { ... });
> ```

---

## 🌐 Deployment

### Render / Railway / Cyclic
- **Build Command:** `npm install`
- **Start Command:** `node server.js`
- Set `PORT` env var (defaults to `3000`)

### Vercel (Serverless)
- Requires `vercel.json` to route Express — or deploy frontend to Vercel and backend to Render.

### Static Only (GitHub Pages)
- Deploy `public/` folder contents to GitHub Pages — API features will need a separate backend host.

---

## 🔮 Roadmap

- [ ] Full CRUD for students, attendance, and fees
- [ ] MongoDB + Mongoose persistence (replace in-memory arrays)
- [ ] Authentication (JWT) for admin / teacher roles
- [ ] CSV import/export for student lists
- [ ] Search, filter, and pagination
- [ ] Attendance chart and fee analytics

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/new-feature`
3. Commit: `git commit -m "feat: new feature"`
4. Push: `git push origin feature/new-feature`
5. Open a Pull Request

---

## 📄 License

MIT License

---

## 👤 Author

**Kalai Alagan**
- GitHub: [@kalai-alagan](https://github.com/kalai-alagan)
- Email: kalaialagan174@gmail.com

---

> Vanguard Student Suite v2.0 — Streamline student management with a fast, modern, and extensible web app.
