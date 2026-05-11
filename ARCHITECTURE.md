# 🔄 How Everything Works Together

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    GREEN ENTERPRISE WEBSITE                  │
│                         (Frontend)                           │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │   Home     │  │  Services  │  │  Equipment │           │
│  └────────────┘  └────────────┘  └────────────┘           │
│                                                              │
│  ┌──────────────────────────────────────────────┐          │
│  │         CONTACT FORM                         │          │
│  │  Name: [____________]                        │          │
│  │  Email: [____________]                       │          │
│  │  Phone: [____________]                       │          │
│  │  Service: [Rental ▼]                        │          │
│  │  Message: [____________]                     │          │
│  │  [Send Message] ← User clicks here           │          │
│  └──────────────────────────────────────────────┘          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP POST Request
                         │ (JSON data)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER                            │
│                   (Node.js + Express)                        │
│                  http://localhost:3000                       │
│                                                              │
│  ┌──────────────────────────────────────┐                  │
│  │   API ROUTES                         │                  │
│  │                                      │                  │
│  │   POST /api/inquiries    ← Receives form data          │
│  │   GET  /api/inquiries    ← Get all inquiries           │
│  │   GET  /api/equipment    ← Get equipment list          │
│  └──────────────┬───────────────────────┘                  │
│                 │                                            │
│                 ├──────────────────┬──────────────────┐    │
│                 ▼                  ▼                  ▼    │
│      ┌─────────────────┐  ┌──────────────┐  ┌──────────┐ │
│      │   VALIDATION    │  │   DATABASE   │  │  EMAIL   │ │
│      │                 │  │              │  │          │ │
│      │ • Check name   │  │  SQLite DB   │  │ Nodemailer│ │
│      │ • Check email  │  │              │  │          │ │
│      │ • Validate     │  │ Save inquiry │  │ Send alert│ │
│      └─────────────────┘  └──────────────┘  └──────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                         │
                         │ Saves to database
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    SQLITE DATABASE                           │
│                  greenenterprise.db                          │
│                                                              │
│  ┌──────────────────────────────────────────┐              │
│  │  inquiries table                         │              │
│  ├────┬─────────┬──────────┬───────┬────────┤              │
│  │ ID │  Name   │  Email   │ Phone │Service │              │
│  ├────┼─────────┼──────────┼───────┼────────┤              │
│  │ 1  │John Doe │john@...  │+233.. │Rental  │              │
│  │ 2  │Jane... │jane@...  │+233.. │Sales   │              │
│  └────┴─────────┴──────────┴───────┴────────┘              │
│                                                              │
│  ┌──────────────────────────────────────────┐              │
│  │  equipment table                         │              │
│  ├────┬──────┬────────┬────────┬────────────┤              │
│  │ ID │Brand │ Model  │ Power  │Availability│              │
│  ├────┼──────┼────────┼────────┼────────────┤              │
│  │ 1  │Sany  │ SY250  │140 kW  │Available   │              │
│  │ 2  │Hyundai│HX250L │138 kW  │Available   │              │
│  │ 3  │XCMG  │XE250D  │135 kW  │Available   │              │
│  └────┴──────┴────────┴────────┴────────────┘              │
└─────────────────────────────────────────────────────────────┘
                         │
                         │ Admin views data
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   ADMIN DASHBOARD                            │
│              http://localhost:3000/admin                     │
│                                                              │
│  ┌──────────────────────────────────────────┐              │
│  │  📊 STATISTICS                           │              │
│  │  Total Inquiries: 15                     │              │
│  │  New Inquiries: 8                        │              │
│  │  Total Equipment: 3                      │              │
│  └──────────────────────────────────────────┘              │
│                                                              │
│  ┌──────────────────────────────────────────┐              │
│  │  📋 INQUIRIES LIST                       │              │
│  │  #1  John Doe   Rental   2026-01-24     │              │
│  │  #2  Jane Smith Sales    2026-01-24     │              │
│  │  [View] [Delete]                         │              │
│  └──────────────────────────────────────────┘              │
│                                                              │
│  ┌──────────────────────────────────────────┐              │
│  │  🚜 EQUIPMENT INVENTORY                  │              │
│  │  Sany SY250    - Available              │              │
│  │  Hyundai HX250L - Available              │              │
│  │  XCMG XE250D   - Available              │              │
│  └──────────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────────┘
```

## 📧 Email Flow (Optional)

```
Customer submits form
         │
         ▼
Backend receives data
         │
         ▼
Nodemailer sends email ──────────────┐
         │                            │
         ▼                            ▼
Data saved to database    ┌─────────────────────┐
         │                │   YOUR EMAIL        │
         ▼                │  ┌───────────────┐  │
Success response         │  │ New Inquiry!  │  │
to frontend              │  │               │  │
                        │  │ From: John Doe│  │
                        │  │ Phone: +233.. │  │
                        │  │ Service:Rental│  │
                        │  └───────────────┘  │
                        └─────────────────────┘
```

## 🔐 Data Flow Example

### 1. Customer Fills Form
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+233 123 456 789",
  "service": "rental",
  "message": "Need excavator for 2 weeks"
}
```

### 2. Frontend Sends to API
```javascript
fetch('http://localhost:3000/api/inquiries', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

### 3. Backend Validates & Processes
```javascript
✓ Validate email format
✓ Check required fields
✓ Sanitize input
✓ Save to database
✓ Send email notification
✓ Return success response
```

### 4. Response Sent Back
```json
{
  "success": true,
  "message": "Inquiry submitted successfully!",
  "inquiryId": 15
}
```

### 5. Frontend Shows Success
```
┌──────────────────────┐
│         ✓            │
│   Message Sent!      │
│ We'll get back to    │
│    you shortly.      │
└──────────────────────┘
```

## 🎯 Request/Response Cycle

```
1. USER ACTION
   ↓
2. JavaScript catches form submit
   ↓
3. Create JSON data
   ↓
4. Send HTTP POST request
   ↓
5. Express server receives request
   ↓
6. Validate input data
   ↓
7. Save to SQLite database
   ↓
8. Send email (if configured)
   ↓
9. Return JSON response
   ↓
10. Frontend receives response
    ↓
11. Show success/error message
    ↓
12. Reset form
```

## 📁 File Interactions

```
index.html
    ↓ loads
script.js
    ↓ makes API call to
server.js (Express)
    ↓ uses
routes/inquiries.js
    ↓ saves to
database/init.js (SQLite)
    ↓ email sent via
utils/email.js (Nodemailer)
    ↓ data viewable in
public/index.html (Admin Dashboard)
    ↓ which uses
public/admin.js
```

## 🌐 Ports & URLs

```
Frontend (index.html)
└── Can run on any port (e.g., Live Server on 5500)
    
Backend Server
└── http://localhost:3000
    ├── /api/health          (GET - Health check)
    ├── /api/inquiries       (GET - View all inquiries)
    ├── /api/inquiries       (POST - Submit new inquiry)
    ├── /api/equipment       (GET - View equipment)
    └── /admin               (GET - Admin dashboard)
```

## 🔄 Development Workflow

```
                    ┌──────────────┐
                    │  Edit Code   │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │ Save Changes │
                    └──────┬───────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐      ┌──────▼───────┐   ┌─────▼────┐
   │Frontend │      │   Backend    │   │ Database │
   │ Refresh │      │npm run dev   │   │Auto-save │
   │ Browser │      │(auto-restart)│   │          │
   └────┬────┘      └──────┬───────┘   └─────┬────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                    ┌──────▼───────┐
                    │ Test Changes │
                    └──────────────┘
```

## 💾 Database Schema

```sql
-- inquiries table
CREATE TABLE inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- equipment table
CREATE TABLE equipment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    operating_weight TEXT,
    engine_power TEXT,
    bucket_capacity TEXT,
    description TEXT,
    availability TEXT DEFAULT 'available',
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 Technology Stack

```
┌─────────────────────────────────────┐
│         FRONTEND                     │
│                                     │
│  • HTML5                            │
│  • CSS3 (Modern Glassmorphism)      │
│  • Vanilla JavaScript               │
│  • Font: Inter & Outfit             │
└─────────────────────────────────────┘
           ▼ API Calls
┌─────────────────────────────────────┐
│         BACKEND                      │
│                                     │
│  • Node.js (Runtime)                │
│  • Express.js (Web Framework)       │
│  • Helmet (Security)                │
│  • CORS (Cross-Origin)              │
│  • Express Validator (Validation)   │
│  • Rate Limiter (Protection)        │
└─────────────────────────────────────┘
           ▼ Stores in
┌─────────────────────────────────────┐
│         DATABASE                     │
│                                     │
│  • SQLite (better-sqlite3)          │
│  • File-based (no server needed)    │
│  • Fast & Lightweight               │
└─────────────────────────────────────┘
           ▼ Sends via
┌─────────────────────────────────────┐
│         EMAIL                        │
│                                     │
│  • Nodemailer (SMTP Client)         │
│  • Gmail SMTP (Free)                │
│  • HTML Email Templates             │
└─────────────────────────────────────┘
```

---

This visual guide helps you understand exactly how your Green Enterprise website and backend work together! 🚀
