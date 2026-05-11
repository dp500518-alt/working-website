# 📧 Green Enterprise - Email Backend (Simple)

**Super simple backend that sends contact form data directly to your Gmail!**

---

## 🎯 What This Does

When someone fills out your contact form:
1. ✅ Data is validated
2. ✅ Beautiful HTML email sent to your Gmail
3. ✅ Success message shown to customer
4. ✅ **That's it! No database, no complexity!**

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies

Double-click **`install.bat`** OR run:

```powershell
npm install
```

### Step 2: Configure Gmail

#### A. Get Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** (left sidebar)
3. Enable **2-Step Verification** (if not already enabled)
4. Go back to Security
5. Click **App passwords** (under "Signing in to Google")
6. Select **Mail** and **Windows Computer**
7. Click **Generate**
8. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)

#### B. Edit .env File

Open the **`.env`** file in this folder and update:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

**Important:** Remove spaces from the app password!

### Step 3: Start Server

Double-click **`start-email-server.bat`** OR run:

```powershell
npm start
```

You should see:
```
🚀 ========================================
📧 GREEN ENTERPRISE EMAIL BACKEND
========================================
✅ Server running on: http://localhost:3000
✅ Contact endpoint: POST /api/contact
✅ Health check: http://localhost:3000/api/health
📧 Emails will be sent to: your-email@gmail.com
========================================
```

## 🌐 Update Frontend

Update your `script.js` contact form to use this endpoint:

```javascript
// Change this line (around line 122 in script.js):
const response = await fetch('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
});
```

## 📧 Email Example

When someone submits the form, you'll receive a beautiful email like this:

```
Subject: 🔔 New Equipment Rental Inquiry from John Doe

From: John Doe
Email: john@example.com
Phone: +233 123 456 789
Service: Equipment Rental

Message:
I need to rent a Sany excavator for 2 weeks for a construction 
project in Accra.

[Call John Doe] [Reply via Email]
```

## ✨ Features

- ✅ **Super Simple** - Just 1 file, no database
- ✅ **Beautiful Emails** - Professional HTML formatting
- ✅ **Reply-To Set** - Click reply to email customer directly
- ✅ **Phone Links** - Click to call customer
- ✅ **Validation** - Email and required fields checked
- ✅ **Error Handling** - Friendly error messages
- ✅ **Free** - 100% free to run

## 🛠️ API Endpoint

### Send Contact Form

**POST** `/api/contact`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+233 123 456 789",
  "service": "rental",
  "message": "I need an excavator"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!"
}
```

## 🔍 Testing

### 1. Check Server is Running
Visit: http://localhost:3000/api/health

Should return:
```json
{
  "success": true,
  "message": "Green Enterprise Email Backend is running!",
  "timestamp": "2026-01-24T07:24:00.000Z"
}
```

### 2. Test Form Submission
1. Open your website (index.html)
2. Fill out the contact form
3. Submit
4. Check your Gmail inbox!

## ❓ Troubleshooting

### "Error sending email"
- Check Gmail credentials in `.env` file
- Make sure you used App Password (not regular password)
- Remove all spaces from the app password
- Verify 2-Step Verification is enabled

### "Authentication failed"
- You must use an **App Password**, not your regular Gmail password
- Go to Google Account → Security → App Passwords to create one

### "Port 3000 already in use"
Edit `.env` file:
```env
PORT=3001
```

### Don't receive emails?
- Check your Gmail spam/junk folder
- Verify `GMAIL_USER` is correct in `.env`
- Check server console for error messages

## 📊 Comparison: Simple vs Full Backend

| Feature | Simple (Email) | Full Backend |
|---------|----------------|--------------|
| Database | ❌ No | ✅ Yes (SQLite) |
| Admin Dashboard | ❌ No | ✅ Yes |
| Email Notifications | ✅ Yes | ✅ Yes (optional) |
| Setup Complexity | ⭐ Very Easy | ⭐⭐⭐ Medium |
| Files | 6 files | 18 files |
| Best For | Small businesses | Larger businesses |

## 💡 Pro Tips

1. **Check Gmail regularly** - All inquiries go to your email
2. **Set up filters** - Create Gmail filter for "Green Enterprise" to organize
3. **Mobile notifications** - Enable Gmail mobile notifications
4. **Backup emails** - Gmail automatically backs up your inquiries

## 🔒 Security

- ✅ Input validation
- ✅ Email format verification
- ✅ CORS enabled
- ✅ Environment variables for credentials
- ✅ Error handling

## 📱 What You Get via Email

Every inquiry email includes:
- ✉️ Customer name and contact info
- 📞 Clickable phone number (tap to call)
- 📧 Reply-to email address
- 🏗️ Service requested
- 💬 Customer message
- 📅 Timestamp
- 🎨 Beautiful HTML formatting

## 🎉 That's It!

Super simple, super effective! Your contact form now sends beautiful emails directly to your Gmail.

No database, no complexity, just pure simplicity! 🚀

---

**Need the full backend with database and admin panel?**
Use the main `backend` folder instead.
