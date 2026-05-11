# 🚀 Quick Start Guide - Green Enterprise Backend

## ⚠️ Important: PowerShell Script Execution

If you get an error about "running scripts is disabled", run this command in PowerShell **as Administrator**:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then close and reopen your terminal.

## 📦 Step 1: Install Dependencies

Open PowerShell or Command Prompt in the `backend` folder and run:

```powershell
cd "c:\green enterprises website\backend"
npm install
```

This will install all required packages (Express, SQLite, Nodemailer, etc.)

## ⚙️ Step 2: Configure Email (Optional)

Edit the `.env` file in the `backend` folder:

```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=your-business-email@gmail.com
```

**To get a Gmail App Password:**
1. Go to Google Account → Security
2. Enable 2-Factor Authentication
3. Go to "App passwords"
4. Generate password for "Mail"
5. Copy that password to `.env` file

**Note:** Email is optional! The backend works without it - you just won't get email notifications.

## 🚀 Step 3: Start the Backend Server

```powershell
npm start
```

You should see:
```
🚀 ========================================
🏗️  GREEN ENTERPRISE BACKEND SERVER
========================================
✅ Server running on: http://localhost:3000
✅ API endpoint: http://localhost:3000/api
✅ Admin panel: http://localhost:3000/admin
✅ Environment: development
========================================
```

## 🌐 Step 4: Open Your Website

1. Open your frontend website (index.html) in a browser
   - You can use Live Server extension in VS Code
   - Or simply double-click `index.html`

2. The website will now connect to the backend automatically!

## 🎯 Test It Out

1. **Fill out the contact form** on your website
2. Check the backend terminal - you should see the inquiry logged
3. Open the **Admin Dashboard**: http://localhost:3000/admin
4. You should see your inquiry listed there!

## 📊 Admin Dashboard

Access at: **http://localhost:3000/admin**

Features:
- View all customer inquiries
- See inquiry statistics
- Manage equipment inventory
- Beautiful modern UI

## 🔍 Verify API is Working

Open your browser and go to: **http://localhost:3000/api/health**

You should see:
```json
{
  "success": true,
  "message": "Green Enterprise API is running!",
  "timestamp": "2026-01-24T07:13:55.000Z",
  "version": "1.0.0"
}
```

## 📝 Available API Endpoints

- `GET /api/health` - Check API status
- `POST /api/inquiries` - Submit contact form
- `GET /api/inquiries` - View all inquiries
- `GET /api/equipment` - View all equipment

## ⚡ During Development

Use this command for auto-restart when you make changes:

```powershell
npm run dev
```

(This requires `nodemon` which is installed automatically)

## 🛑 Stop the Server

Press `Ctrl + C` in the terminal

## 🐛 Troubleshooting

### Error: "Cannot find module"
```powershell
npm install
```

### Error: "Port 3000 is already in use"
Change the PORT in the `.env` file to 3001 or another number

### Error: "CORS error in browser"
Make sure the backend server is running on port 3000

### Form submission doesn't work
1. Check backend is running: http://localhost:3000/api/health
2. Check browser console for errors (F12)
3. Make sure your frontend is accessing the correct URL

## ✅ Success Checklist

- [x] Backend files created
- [ ] Dependencies installed (`npm install`)
- [ ] Server starts successfully (`npm start`)
- [ ] API health check works
- [ ] Admin dashboard opens
- [ ] Contact form submits successfully
- [ ] Inquiries appear in admin dashboard

## 📚 Next Steps

1. **Customize email template** in `backend/utils/email.js`
2. **Add your logo** to admin dashboard
3. **Deploy to production** (see README.md for hosting options)
4. **Add authentication** for admin dashboard (future enhancement)

## 🎉 You're All Set!

Your Green Enterprise website now has a fully functional backend! 🏗️

Need help? Check the main `README.md` file in the backend folder.
