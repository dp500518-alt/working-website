# 🏗️ Green Enterprise - Complete Website with Backend

## 📁 Project Structure

```
green enterprises website/
├── frontend/
│   ├── index.html              # Main website
│   ├── style.css               # Styling
│   ├── script.js               # Frontend logic (now with API integration)
│   ├── sany-excavator.jpg
│   ├── hyundai-excavator.jpg
│   ├── xcmg-excavator.jpg
│   └── about-image.jpg
│
└── backend/
    ├── database/
    │   ├── init.js             # Database setup
    │   └── greenenterprise.db  # SQLite database (auto-created)
    │
    ├── routes/
    │   ├── inquiries.js        # Contact form API
    │   └── equipment.js        # Equipment management API
    │
    ├── utils/
    │   └── email.js            # Email notifications
    │
    ├── public/
    │   ├── index.html          # Admin dashboard
    │   └── admin.js            # Admin dashboard logic
    │
    ├── server.js               # Main server
    ├── package.json            # Dependencies
    ├── .env                    # Configuration
    ├── install.bat             # Easy installation script
    ├── start-server.bat        # Easy server start script
    ├── QUICK_START.md          # Quick setup guide
    └── README.md               # Full documentation
```

## 🎯 What You Get

### Frontend (Already Working) ✅
- Beautiful modern website
- Responsive design
- Smooth animations
- Contact form
- Equipment showcase
- Mobile-friendly navigation

### Backend (Just Built) 🆕
- **REST API** with Express.js
- **SQLite Database** (no external setup needed)
- **Email Notifications** (optional, can be configured later)
- **Admin Dashboard** to view inquiries
- **Security Features** (rate limiting, CORS, input validation)
- **100% FREE** to run!

## 🚀 How to Get Started

### Option 1: Double-Click Installation (Easy!)

1. Navigate to `backend` folder
2. Double-click `install.bat` to install dependencies
3. Double-click `start-server.bat` to start the server
4. Open `http://localhost:3000/admin` to see admin dashboard
5. Open your website (index.html) and test the contact form!

### Option 2: Command Line

```powershell
cd "c:\green enterprises website\backend"
npm install
npm start
```

## 📊 What the Backend Does

### 1. Contact Form Processing ✉️
- When someone fills out your contact form
- Data is saved to SQLite database
- Email notification sent to you (if configured)
- Success message shown to customer

### 2. Admin Dashboard 📈
- View all customer inquiries in real-time
- See statistics (total inquiries, new inquiries, etc.)
- Manage equipment inventory
- Beautiful modern interface
- Access at: `http://localhost:3000/admin`

### 3. Email Notifications 📧
- Automatic email when someone contacts you
- Beautiful HTML email template
- Includes all customer details
- Direct links to call or email customer
- **Optional** - works without email too!

### 4. Equipment Management 🚜
- Database of all your excavators
- Pre-loaded with Sany, Hyundai, and XCMG models
- Can add/edit/delete equipment via API
- Availability tracking

## 🔧 Configuration

### Email Setup (Optional)

Edit `backend/.env` file:

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=where-to-receive-inquiries@gmail.com
```

**Don't have Gmail app password?** No problem! The backend works fine without email. You'll still see all inquiries in the admin dashboard.

### Port Configuration

Default port is `3000`. To change:

Edit `backend/.env`:
```env
PORT=3001
```

## 🌐 URLs

Once the backend is running:

- **API Health Check**: http://localhost:3000/api/health
- **Admin Dashboard**: http://localhost:3000/admin
- **API Docs**: http://localhost:3000/

## 📱 Testing

### Test Contact Form:
1. Start backend server (`npm start`)
2. Open your website (index.html)
3. Fill out contact form
4. Submit
5. Check admin dashboard to see the inquiry!

### Test Admin Dashboard:
1. Go to http://localhost:3000/admin
2. You should see statistics and inquiry list
3. Click on tabs to view inquiries and equipment

## 🎨 Features

### Security ✅
- Rate limiting (prevents spam)
- CORS protection
- Input validation
- SQL injection protection
- Secure headers with Helmet.js

### Performance ✅
- Fast SQLite database
- Efficient API endpoints
- Optimized for low resource usage
- Works on any computer

### User Experience ✅
- Beautiful error messages
- Loading states
- Success confirmations
- Real-time updates
- Mobile-responsive admin panel

## 📚 API Endpoints

### Contact Form
```javascript
POST /api/inquiries
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+233 XXX XXX XXX",
  "service": "rental",
  "message": "I need an excavator"
}
```

### Get All Inquiries
```javascript
GET /api/inquiries
```

### Get Equipment List
```javascript
GET /api/equipment
```

## 🚢 Deployment (Future)

When ready to deploy:

### Free Options:
1. **Render.com** - Best for SQLite (FREE)
2. **Railway.app** - $5/month free credit
3. **Vercel** - Need to switch to Postgres (FREE)

### Your Own Server:
- Just copy the backend folder
- Run `npm install`
- Run `npm start`
- Configure firewall/port forwarding

## 💡 Tips

1. **Keep Backend Running**: The backend must be running for the contact form to work
2. **Check Browser Console**: Press F12 to see any errors
3. **Test API First**: Visit http://localhost:3000/api/health to confirm server is running
4. **Email Optional**: You can configure email later - not required for testing

## ❓ Troubleshooting

### "Cannot find module"
Run `npm install` in the backend folder

### "Port already in use"
Change PORT in .env file to a different number

### "Scripts disabled"
Run PowerShell as Administrator:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Form doesn't submit
1. Check backend is running
2. Open browser console (F12)
3. Verify error message
4. Check http://localhost:3000/api/health

## 🎉 You're Done!

Your Green Enterprise website now has:
- ✅ Beautiful frontend
- ✅ Working backend API
- ✅ Database storage
- ✅ Admin dashboard
- ✅ Email notifications (optional)
- ✅ Professional contact form
- ✅ **100% FREE!**

## 📞 Next Steps

1. **Test everything** - Submit test inquiries
2. **Configure email** - Add your Gmail credentials
3. **Customize** - Update colors, text, etc.
4. **Deploy** - When ready, deploy to a hosting service
5. **Monitor** - Check admin dashboard regularly

## 🌟 What Makes This Special

- **No Monthly Costs** - 100% free to run locally
- **No External Database** - SQLite is built-in
- **Professional Grade** - Enterprise-level features
- **Easy to Use** - Double-click to start
- **Fully Integrated** - Frontend + Backend working together
- **Scalable** - Can handle thousands of inquiries

Enjoy your new backend system! 🚀
