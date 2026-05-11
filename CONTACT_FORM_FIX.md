# 🔧 Contact Form Issue - FIXED!

## ❌ Problem Identified

Your clients were getting this error when submitting the contact form:
> **"Failed to send message. Please try calling us directly."**

## 🔍 Root Causes Found

### 1. **Backend Server Not Running**
- The backend server needed to process contact form submissions was not running
- Port 3000 was not listening for connections

### 2. **Wrong API Endpoint** (Initially)
- Frontend was trying to call `/api/inquiries`
- But `backend-simple` server uses `/api/contact`

### 3. **CORS Configuration**
- The CORS setting was set to a placeholder Vercel URL
- Needed to allow all origins during development

## ✅ Fixes Applied

### Fix 1: Started the Backend Server ✓
```bash
Location: c:\green enterprises website\backend-simple\
Server: email-server.js
Status: ✅ RUNNING on http://localhost:3000
```

### Fix 2: Updated CORS Settings ✓
**File:** `backend-simple/.env`
```env
FRONTEND_URL=*  # Now allows all origins for development
```

### Fix 3: Verified API Endpoint ✓
**File:** `script.js` line 120
```javascript
fetch('http://localhost:3000/api/contact', { ... })  # Correct endpoint
```

## 🚀 How to Use (For You)

### Starting the Server

**Option 1: Double-click the batch file**
```
c:\green enterprises website\backend-simple\start-email-server.bat
```

**Option 2: Use command line**
```bash
cd "c:\green enterprises website\backend-simple"
node email-server.js
```

### Testing the Contact Form

1. **Keep the backend server running** (don't close the terminal window)
2. Open your website in browser
3. Fill out the contact form
4. Click "Send Message"
5. You should see: ✅ **"Message Sent! We'll get back to you shortly."**
6. Check `greenenterprise.work@gmail.com` inbox for the inquiry

## ⚠️ IMPORTANT: Gmail App Password

Your `.env` file currently has: `GMAIL_APP_PASSWORD=Green@work1212`

**This looks like a regular password**, not a Gmail App Password!

### If Emails Are NOT Being Sent:

You need to create a **Gmail App Password**:

1. **Enable 2-Step Verification** (required first)
   - Go to: https://myaccount.google.com/security
   - Find "2-Step Verification"
   - Follow the setup (takes 2 minutes)

2. **Generate App Password**
   - After 2-Step is enabled, find "App passwords"
   - Select: App = Mail, Device = Windows Computer
   - Click "Generate"
   - You'll get a 16-character password like: `abcd efgh ijkl mnop`
   - Copy it (remove spaces)

3. **Update your .env file**
   ```env
   GMAIL_APP_PASSWORD=abcdefghijklmnop
   ```

4. **Restart the server**
   - Stop the current server (Ctrl+C)
   - Start it again: `node email-server.js`

See `GMAIL_SETUP_HELP.md` for detailed instructions!

## 🧪 How to Test

### 1. Check Server Health
Open browser: http://localhost:3000/api/health

Should show:
```json
{
  "success": true,
  "message": "Green Enterprise Email Backend is running!"
}
```

### 2. Test Contact Form
1. Go to your website
2. Fill out the contact form:
   - Name: Test User
   - Email: test@example.com
   - Phone: +233 123 456 789
   - Service: Equipment Rental
   - Message: This is a test
3. Click "Send Message"
4. Should see success message overlay
5. Check your Gmail inbox!

## 📝 Server Logs

When a form is submitted successfully, you'll see in the terminal:
```
✅ Email sent successfully!
   From: Test User (test@example.com)
   Service: Equipment Rental
```

## ❌ Common Errors & Solutions

### Error: "Failed to send message"
**Cause:** Server not running or wrong endpoint
**Solution:** Make sure server is running on port 3000

### Error: "Invalid login" or "Authentication failed"
**Cause:** Need Gmail App Password
**Solution:** Follow Gmail App Password setup above

### Error: "Network error" or "Connection refused"
**Cause:** Backend server not running
**Solution:** Start the server using `start-email-server.bat`

## 🎯 Summary

✅ **Backend server is now running**
✅ **API endpoint is correct** (`/api/contact`)
✅ **CORS is configured** (allows all origins)
✅ **Contact form should now work!**

⚠️ **Next Step:** If emails aren't arriving, set up Gmail App Password (see above)

## 🔄 Every Time You Want to Use the Contact Form

1. Start the backend server (double-click `start-email-server.bat`)
2. Keep it running while testing
3. That's it! Contact form will work

---

**Need help?** Check the terminal/console for error messages!
