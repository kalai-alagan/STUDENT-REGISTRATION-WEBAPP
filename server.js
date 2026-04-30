const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- Data Store ---
let students = [
  { id: 1, name: 'Aanya Sharma', roll: 'CS101', class: '10-A', email: 'aanya@school.com', phone: '9876543210', avatar: 'AS', status: 'active' },
  { id: 2, name: 'Rohan Mehta',  roll: 'CS102', class: '10-A', email: 'rohan@school.com', phone: '9876543211', avatar: 'RM', status: 'active' },
];

let attendance = [
  { id: 1, studentId: 1, date: '2026-04-28', status: 'present', subject: 'Mathematics' },
];

let notices = [
  { id: 1, title: 'Annual Sports Day', content: 'Annual Sports Day will be held on May 15th.', date: '2026-04-25', type: 'event', priority: 'high' },
  { id: 2, title: 'System Update', content: 'Vanguard Suite v2.0 is now live.', date: '2026-04-24', type: 'academic', priority: 'medium' },
];

let fees = [
  { id: 1, studentId: 1, amount: 15000, paid: 15000, due: 0, status: 'paid' },
  { id: 2, studentId: 2, amount: 15000, paid: 7500,  due: 7500, status: 'partial' },
];

// --- API Routes ---
app.get('/api/stats', (req, res) => {
  res.json({ 
    totalStudents: students.length, 
    todayPresent: attendance.filter(a => a.status === 'present').length,
    feePaid: fees.filter(f => f.status === 'paid').length,
    feeUnpaid: fees.filter(f => f.status !== 'paid').length
  });
});

app.get('/api/notices', (req, res) => res.json(notices));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Vanguard Server active at http://localhost:${PORT}`));
