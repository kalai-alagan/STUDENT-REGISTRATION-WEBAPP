// Vanguard Core Application Logic
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

const API_BASE = 'http://localhost:3000/api';

// --- MOCK DATA FOR GITHUB PAGES / STATIC HOSTING ---
const MOCK_DATA = {
    students: [
        { id: 1, name: 'Aanya Sharma', roll: 'CS101', class: '10-A', status: 'active' },
        { id: 2, name: 'Rohan Mehta',  roll: 'CS102', class: '10-A', status: 'active' },
        { id: 3, name: 'Priya Nair',   roll: 'CS103', class: '10-B', status: 'active' },
        { id: 4, name: 'Dev Patel',    roll: 'CS104', class: '10-B', status: 'inactive' }
    ],
    attendance: [
        { studentId: 1, name: 'Aanya Sharma', date: '2026-04-28', subject: 'Mathematics', status: 'present' },
        { studentId: 2, name: 'Rohan Mehta', date: '2026-04-28', subject: 'Mathematics', status: 'absent' },
        { studentId: 3, name: 'Priya Nair', date: '2026-04-28', subject: 'Mathematics', status: 'late' }
    ],
    marks: [
        { studentId: 1, subject: 'Mathematics', marks: 88, grade: 'A' },
        { studentId: 1, subject: 'Science', marks: 92, grade: 'A+' },
        { studentId: 2, subject: 'Mathematics', marks: 74, grade: 'B' }
    ],
    fees: [
        { studentId: 1, amount: 15000, paid: 15000, due: 0, status: 'paid' },
        { studentId: 2, amount: 15000, paid: 7500, due: 7500, status: 'partial' },
        { studentId: 4, amount: 15000, paid: 0, due: 15000, status: 'unpaid' }
    ],
    messages: [
        { id: 1, from: 'Admin', text: 'Welcome to Vanguard Network.', self: false }
    ]
};

async function initApp() {
    updateTime();
    setInterval(updateTime, 60000);
    
    setupNavigation();
    
    // Initial Load
    await fetchDashboardStats();
    await fetchNotices();
    loadSectionData('dashboard');
}

function updateTime() {
    const now = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    document.getElementById('view-subtitle').textContent = now.toLocaleDateString('en-US', options);
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.view-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetViewId = link.getAttribute('data-view');
            
            // Update active state on nav
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Update title
            document.getElementById('view-title').textContent = link.querySelector('.label').textContent;
            
            // Toggle sections
            sections.forEach(sec => {
                sec.classList.remove('active');
                sec.classList.add('hidden');
            });
            const targetSection = document.getElementById(`view-${targetViewId}`);
            if(targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.classList.add('active');
            }
            
            // Load corresponding data
            loadSectionData(targetViewId);
        });
    });
}

function loadSectionData(view) {
    // This allows fallback to mock data easily
    switch(view) {
        case 'students': renderStudents(); break;
        case 'attendance': renderAttendance(); break;
        case 'performance': renderMarks(); break;
        case 'finance': renderFees(); break;
        case 'communications': renderChat(); break;
    }
}

async function fetchDashboardStats() {
    try {
        const response = await fetch(`${API_BASE}/stats`);
        if(!response.ok) throw new Error('Network');
        const stats = await response.json();
        
        animateValue('stat-total-students', 0, stats.totalStudents, 1500);
        document.getElementById('stat-attendance').textContent = `${Math.round((stats.todayPresent / stats.totalStudents) * 100)}%`;
        document.getElementById('stat-fees').textContent = `${Math.round((stats.feePaid / (stats.feePaid + stats.feeUnpaid)) * 100)}%`;
    } catch (err) {
        // Fallback for static hosting
        animateValue('stat-total-students', 0, 1248, 1500);
        document.getElementById('stat-attendance').textContent = '94%';
        document.getElementById('stat-fees').textContent = '78%';
    }
}

function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

async function fetchNotices() {
    const container = document.getElementById('notices-list');
    try {
        const response = await fetch(`${API_BASE}/notices`);
        if(!response.ok) throw new Error('Network');
        const notices = await response.json();
        renderNotices(container, notices);
    } catch (err) {
        renderNotices(container, [
            { title: 'System initialized', content: 'Welcome to Vanguard. Running in static mode.', priority: 'medium', date: new Date().toLocaleDateString() },
            { title: 'Local Demo', content: 'You are currently viewing local mock data.', priority: 'low', date: new Date().toLocaleDateString() }
        ]);
    }
}

function renderNotices(container, notices) {
    container.innerHTML = notices.slice(0, 3).map(notice => `
        <div class="alert-item animate-in">
            <div class="alert-marker ${notice.priority}"></div>
            <div class="alert-content">
                <p class="alert-title">${notice.title}</p>
                <p class="alert-text">${notice.content}</p>
            </div>
            <span class="alert-time">${notice.date}</span>
        </div>
    `).join('');
}

// --- Render Functions for other tabs ---
function renderStudents() {
    const tbody = document.querySelector('#students-table tbody');
    tbody.innerHTML = MOCK_DATA.students.map(s => `
        <tr>
            <td>${s.name}</td>
            <td>${s.roll}</td>
            <td>${s.class}</td>
            <td><span class="status-badge status-${s.status}">${s.status}</span></td>
            <td><button class="text-btn">View</button></td>
        </tr>
    `).join('');
}

function renderAttendance() {
    const tbody = document.querySelector('#attendance-table tbody');
    tbody.innerHTML = MOCK_DATA.attendance.map(a => `
        <tr>
            <td>${a.name}</td>
            <td>${a.date}</td>
            <td>${a.subject}</td>
            <td><span class="status-badge status-${a.status}">${a.status}</span></td>
        </tr>
    `).join('');
}

function renderMarks() {
    const tbody = document.querySelector('#marks-table tbody');
    tbody.innerHTML = MOCK_DATA.marks.map(m => `
        <tr>
            <td>${m.studentId}</td>
            <td>${m.subject}</td>
            <td>${m.marks}</td>
            <td><strong>${m.grade}</strong></td>
        </tr>
    `).join('');
}

function renderFees() {
    const tbody = document.querySelector('#fees-table tbody');
    tbody.innerHTML = MOCK_DATA.fees.map(f => `
        <tr>
            <td>${f.studentId}</td>
            <td>$${f.amount}</td>
            <td>$${f.paid}</td>
            <td>$${f.due}</td>
            <td><span class="status-badge status-${f.status}">${f.status}</span></td>
        </tr>
    `).join('');
}

function renderChat() {
    const messages = document.getElementById('chat-messages');
    messages.innerHTML = MOCK_DATA.messages.map(m => `
        <div class="chat-message ${m.self ? 'self' : ''}">
            <strong>${m.from || 'You'}</strong><br>
            ${m.text}
        </div>
    `).join('');
}

// Mobile sidebar toggle (utility)
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}
