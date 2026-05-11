# 📧 SIMPLE EMAIL BACKEND - SETUP GUIDE

**The easiest way to receive contact form submissions via Gmail!**

---

## 🎯 What You Get

A super simple backend that:
- ✅ Receives contact form data
- ✅ Sends beautiful HTML emails to your Gmail
- ✅ **No database needed!**
- ✅ **No admin panel needed!**
- ✅ Just emails straight to your inbox!

---

## 🚀 QUICK SETUP (5 Minutes)

### ✅ STEP 1: Get Gmail App Password (2 minutes)

1. **Go to**: https://myaccount.google.com/security
2. **Find**: "2-Step Verification" and enable it (if not already on)
3. **Go back** to Security page
4. **Click**: "App passwords" (under "Signing in to Google")
5. **Select**: 
   - App: **Mail**
   - Device: **Windows Computer** (or Other)
6. **Click**: Generate
7. **Copy** the 16-character password that appears
   - Example: `abcd efgh ijkl mnop`

### ✅ STEP 2: Configure Backend (1 minute)

1. **Open**: `backend-simple/.env` file
2. **Edit** the following lines:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

**Replace with:**
- Your actual Gmail address
- Your 16-character app password (NO SPACES!)

**Example:**
```env
GMAIL_USER=john@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

3. **Save** the file

### ✅ STEP 3: Install & Start (2 minutes)

1. **Go to**: `backend-simple` folder
2. **Double-click**: `install.bat` (installs dependencies)
3. **Wait** for installation to complete
4. **Double-click**: `start-email-server.bat` (starts server)

You should see:
```
🚀 ========================================
📧 GREEN ENTERPRISE EMAIL BACKEND
========================================
✅ Server running on: http://localhost:3000
✅ Contact endpoint: POST /api/contact
📧 Emails will be sent to: your-email@gmail.com
========================================
```

---

## 🧪 TEST IT NOW!

1. **Keep the server running** (the black window open)
2. **Open** your website (`index.html`)
3. **Fill out** the contact form:
   - Name: Test Customer
   - Email: test@example.com
   - Phone: +233 123 456 789
   - Service: Equipment Rental
   - Message: This is a test inquiry
4. **Click** "Send Message"
5. **Check your Gmail inbox!** 📧

You should receive a beautiful email with all the details!

---

## 📧 What the Email Looks Like

```
Subject: 🔔 New Equipment Rental Inquiry from Test Customer

┌──────────────────────────────────────┐
│   🏗️ Green Enterprise                │
│   New Customer Inquiry               │
└──────────────────────────────────────┘

📋 Inquiry Details
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: Test Customer
Email: test@example.com
Phone: +233 123 456 789
Service: Equipment Rental

💬 Message:
This is a test inquiry

[📞 Call Test Customer] [✉️ Reply via Email]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Received on Friday, January 24, 2026 at 12:54 PM
```

---

## 💡 HOW TO USE

### Daily Workflow:

1. **Morning**: Start the backend server
   - Double-click `start-email-server.bat`

2. **During the day**: 
   - Customers fill out your website form
   - You receive emails instantly in Gmail
   - Reply directly from Gmail!

3. **End of day**: 
   - Close the server (or leave it running)

### Gmail Tips:

✅ **Create a filter** to organize inquiries:
- Gmail Settings → Filters and Blocked Addresses
- Create filter with "Green Enterprise" in subject
- Apply label "Customer Inquiries"
- Star automatically

✅ **Enable mobile notifications**:
- Gmail app → Settings → Notifications
- Never miss an inquiry!

✅ **Quick replies**:
- Click "Reply" in the email
- Customer's email is already in the "To" field
- Start typing your response!

---

## 🆚 Two Backend Options

You now have **2 backend options**. Choose the one that fits your needs:

### Option 1: Simple Email Backend (RECOMMENDED)
📁 Folder: `backend-simple`
- ✅ Super easy setup
- ✅ All inquiries go to Gmail
- ✅ No database
- ✅ No admin panel
- ✅ **Best for**: Getting started quickly
- 📧 **Endpoint**: `/api/contact`

### Option 2: Full Backend
📁 Folder: `backend`
- ✅ SQLite database
- ✅ Admin dashboard to view inquiries
- ✅ Email notifications (optional)
- ✅ More features
- ✅ **Best for**: Scaling up later
- 📧 **Endpoint**: `/api/inquiries`

**Current Setup**: Your website is using **backend-simple** (email only)

---

## 📁 Project Structure

```
green enterprises website/
│
├── 📄 index.html (your website)
├── 📄 script.js (uses /api/contact endpoint)
│
├── 📁 backend-simple/        ← YOU ARE HERE
│   ├── email-server.js       ← Simple email server
│   ├── .env                  ← Your Gmail credentials
│   ├── install.bat           ← Double-click to install
│   ├── start-email-server.bat ← Double-click to start
│   └── README.md             ← Documentation
│
└── 📁 backend/               ← Alternative (full version)
    └── (database, admin panel, etc.)
```

---

## ⚡ Commands Reference

```powershell
# Install dependencies (do once)
cd backend-simple
npm install

# Start server (do every time)
npm start

# Stop server
Press Ctrl + C
```

---

## 🔧 Troubleshooting

### ❌ "Authentication failed"
**Solution**: 
- Make sure you're using an **App Password**, not your regular Gmail password
- Remove all spaces from the app password in `.env`
- Make sure 2-Step Verification is enabled

### ❌ "Error sending email"
**Solution**:
- Check your `.env` file
- Verify `GMAIL_USER` is your correct email
- Verify `GMAIL_APP_PASSWORD` has no spaces

### ❌ Don't receive emails
**Solution**:
- Check Gmail spam/junk folder
- Verify email sent successfully in server console
- Try sending a test email to yourself

### ❌ "Port 3000 already in use"
**Solution**:
Edit `.env` file:
```env
PORT=3001
```

### ❌ Server won't start
**Solution**:
- Make sure you ran `install.bat` first
- Check if Node.js is installed
- Try running `npm install` manually

---

## 🎉 SUCCESS CHECKLIST

- [ ] Created Gmail App Password
- [ ] Updated `.env` file with credentials
- [ ] Ran `install.bat` successfully
- [ ] Started server with `start-email-server.bat`
- [ ] Server shows "running" message
- [ ] Submitted test form on website
- [ ] Received test email in Gmail inbox
- [ ] ✅ **Everything working!**

---

## 🌟 Next Steps

1. **Test thoroughly** - Send several test inquiries
2. **Organize Gmail** - Create filters and labels
3. **Enable mobile** - Get notifications on your phone
4. **Share your website** - Start receiving real inquiries!
5. **Reply promptly** - Good customer service wins business!

---

## 💰 Cost

**COMPLETELY FREE!** ✨
- Gmail: FREE ✅
- Backend: FREE ✅
- No database costs: FREE ✅
- **Total: $0.00**

---

## 📞 Your Workflow

```
Customer visits website
        ↓
Fills out contact form
        ↓
Clicks "Send Message"
        ↓
Backend validates data
        ↓
Beautiful email sent to your Gmail
        ↓
📱 You get notification on phone
        ↓
✉️ You reply directly from Gmail
        ↓
🎉 You win the customer!
```

---

## 🎊 YOU'RE ALL SET!

Your contact form now sends beautiful emails directly to your Gmail!

**To start receiving inquiries:**
1. Make sure server is running
2. Share your website URL
3. Check your Gmail regularly

**That's it!** Super simple, super effective! 🚀

---

**Created**: January 24, 2026
**Status**: ✅ Ready to use!
**Support**: Read `backend-simple/README.md` for more details
