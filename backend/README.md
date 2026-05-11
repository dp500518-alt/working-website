# 🏗️ Green Enterprise Backend API

Complete backend system for the Green Enterprise excavator rental and sales website.

## 🚀 Features

- ✅ RESTful API with Express.js
- ✅ SQLite database (no external hosting needed)
- ✅ Email notifications for new inquiries
- ✅ Admin dashboard to manage inquiries and equipment
- ✅ CORS enabled for frontend integration
- ✅ Rate limiting for security
- ✅ Input validation
- ✅ Beautiful HTML email templates

## 📦 Installation

### 1. Install Dependencies

```powershell
cd backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update with your details:

```powershell
copy .env.example .env
```

Edit `.env` file:
```
PORT=3000
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=your-business-email@gmail.com
```

**Important:** For Gmail, you need to create an "App Password":
1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password for "Mail"
4. Use that password in EMAIL_PASS

### 3. Start the Server

```powershell
npm start
```

Or for development with auto-reload:
```powershell
npm run dev
```

## 🌐 API Endpoints

### Health Check
- **GET** `/api/health` - Check if API is running

### Inquiries
- **POST** `/api/inquiries` - Submit new inquiry
- **GET** `/api/inquiries` - Get all inquiries
- **GET** `/api/inquiries/:id` - Get single inquiry
- **PATCH** `/api/inquiries/:id/status` - Update inquiry status
- **DELETE** `/api/inquiries/:id` - Delete inquiry

### Equipment
- **GET** `/api/equipment` - Get all equipment
- **GET** `/api/equipment/:id` - Get single equipment
- **POST** `/api/equipment` - Add new equipment
- **PATCH** `/api/equipment/:id` - Update equipment
- **DELETE** `/api/equipment/:id` - Delete equipment

## 📝 Example API Calls

### Submit Contact Form

```javascript
fetch('http://localhost:3000/api/inquiries', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+233 123 456 789',
        service: 'rental',
        message: 'I need to rent a Sany excavator'
    })
})
.then(res => res.json())
.then(data => console.log(data));
```

### Get All Equipment

```javascript
fetch('http://localhost:3000/api/equipment')
    .then(res => res.json())
    .then(data => console.log(data.equipment));
```

## 🎨 Admin Dashboard

Access the admin dashboard at: **http://localhost:3000/admin**

Features:
- View all customer inquiries
- Manage equipment inventory
- Real-time statistics
- Beautiful glassmorphism UI

## 📧 Email Notifications

When a customer submits an inquiry:
1. Data is saved to database
2. Beautiful HTML email sent to your business email
3. Includes customer details and quick action buttons

## 🗄️ Database

SQLite database is automatically created at `backend/database/greenenterprise.db`

Tables:
- **inquiries** - Customer contact form submissions
- **equipment** - Excavator inventory
- **admin_users** - Admin login credentials (future use)

## 🔒 Security Features

- Helmet.js for security headers
- CORS protection
- Rate limiting (100 requests per 15 minutes)
- Input validation with express-validator
- SQL injection protection with parameterized queries

## 📱 Integration with Frontend

Update your frontend `script.js` contact form handler:

```javascript
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    try {
        const response = await fetch('http://localhost:3000/api/inquiries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Show success message
            alert('Message sent successfully!');
            contactForm.reset();
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send message. Please try again.');
    }
});
```

## 🚢 Deployment

### Free Hosting Options:

1. **Render.com** (Recommended)
   - Free tier available
   - Auto-deploy from GitHub
   - SQLite database supported

2. **Railway.app**
   - $5/month free credit
   - Easy deployment

3. **Vercel** (with Vercel Postgres)
   - Free tier
   - Need to switch from SQLite to Postgres

## 📂 Project Structure

```
backend/
├── database/
│   ├── init.js              # Database setup
│   └── greenenterprise.db   # SQLite database (auto-created)
├── routes/
│   ├── inquiries.js         # Inquiry endpoints
│   └── equipment.js         # Equipment endpoints
├── utils/
│   └── email.js             # Email service
├── public/
│   ├── index.html           # Admin dashboard
│   └── admin.js             # Admin dashboard logic
├── server.js                # Main server file
├── package.json             # Dependencies
├── .env.example             # Environment template
└── README.md                # This file
```

## 🛠️ Tech Stack

- **Node.js** - Runtime
- **Express.js** - Web framework
- **SQLite** - Database
- **Nodemailer** - Email service
- **Helmet** - Security
- **CORS** - Cross-origin requests
- **Express Validator** - Input validation

## 📞 Support

For any issues or questions, contact Green Enterprise support.

## 📄 License

MIT License - Free to use and modify
