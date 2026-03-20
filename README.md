# JanHit Connect: AI-Driven Smart Civic Governance Platform

**"Intelligent Governance for a Smarter Future."**  
JanHitConnect transforms civic reporting into an AI-optimized resolution ecosystem, ensuring every citizen's voice is heard, analyzed, and addressed with data-driven precision.

---

## 👥 Roles and Dashboards

| Role | Responsibility | Login Credentials | Redirect Path |
| :--- | :--- | :--- | :--- |
| **User (Citizen)** | File complaints & view predictions | Sign up with any email | `/user` |
| **Admin (Nagar Sevak)** | Localized ward management | **Email:** sarthak@gmail.com <br> **Pass:** sarthak123 | `/admin` |
| **SuperAdmin (Admn)** | Global oversight & analytics | **Email:** superadmin@gmail.com <br> **Pass:** superadmin | `/superadmin` |

---

## 🛠️ Advanced Features

### 🧠 AI Intelligence Layer
- **Severity Detection:** AI identifies "High/Medium/Low" based on language.
- **Priority Scoring:** 1-10 ranking for emergency prioritization.
- **Department Routing:** Automatic classification into Water, Road, Electricity, etc.
- **Predictive Analytics:** Forecasting city-level resources (Power/Water).

---

## 🔄 System & Data Flow

### 📋 Smart Complaint Processing
1. **Citizen Submission:** User files a raw description.
2. **AI Analysis:** AI Backend (Gemini 2.0 Flash) analyzes for Severity, Priority, and Department.
3. **Storage:** Enriched data is saved into MySQL.
4. **Officer Visibility:** Nagar Sevak only sees complaints relevant to their ward.
5. **Resolution:** Nagar Sevak resolves issues, updating real-time status for the citizen.

### 📈 Resource Forecasting
1. **Input:** Population, Season, and Growth data.
2. **Back-end AI:** ML models predict the resource load for the coming period.
3. **Government Planning:** SuperAdmins use this to allocate civic resources efficiently.

---

## 🚀 Getting Started

### 1. Backend Server
```bash
cd backend
python app.py
```

### 2. Frontend Development
```bash
cd frontend
npm run dev
```

### 3. Database setup
Import the provided MySQL SQL file into your local server. Configured at `janhit_connect`.
---
*Project Developed for Hackathons and Advanced Civic Management Scenarios.*