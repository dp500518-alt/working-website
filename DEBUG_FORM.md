# 🔍 FORM NOT WORKING - DEBUGGING GUIDE

Server is live but form doesn't work? Let's find the problem!

---

## 🧪 STEP-BY-STEP DEBUGGING

### ✅ TEST 1: Check Server is Really Running

**Open browser and go to:**
```
http://localhost:3000/api/health
```

**Should show:**
```json
{
  "success": true,
  "message": "Green Enterprise Email Backend is running!",
  "timestamp": "2026-01-24..."
}
```

**Result:**
- ✅ If it works = Server is running
- ❌ If it doesn't load = Server is NOT really running

---

### ✅ TEST 2: Check Browser Console for Errors

**Critical Step!**

1. **Open your website** (index.html)
2. **Press F12** (opens Developer Tools)
3. **Click "Console" tab**
4. **Fill out the form and click "Send Message"**
5. **Look for RED error messages**

**Common errors you might see:**

#### Error: "Failed to fetch" or "net::ERR_CONNECTION_REFUSED"
**Problem:** Server is not running or wrong port
**Fix:** 
- Make sure server is running
- Check server window shows: "Server running on: http://localhost:3000"

#### Error: "CORS policy" or "Access-Control-Allow-Origin"
**Problem:** Website and server on different origins
**Fix:** 
- Open your HTML file through a web server (Live Server extension)
- Or start website with: `npx serve`

#### Error: "Authentication failed" (in server console, not browser)
**Problem:** Gmail rejected your password
**Fix:** 
- Read `GMAIL_SETUP_HELP.md`
- Get Gmail App Password
- Update `.env` file

---

### ✅ TEST 3: Check Server Console for Errors

**Look at the server window (black window with server running)**

**What do you see after clicking "Send Message"?**

#### Good Signs (✅):
```
✅ Email sent successfully!
   From: Test User (test@example.com)
   Service: Equipment Rental
```

#### Bad Signs (❌):
```
❌ Error sending email: Invalid login
❌ Error sending email: Authentication failed
❌ Error: EAUTH
❌ 535-5.7.8 Username and Password not accepted
```

**If you see authentication errors:**
- Your Gmail password doesn't work
- You NEED a Gmail App Password
- Read `GMAIL_SETUP_HELP.md`

---

### ✅ TEST 4: Test API Directly

**Bypass the website and test the API directly:**

**Option A: Use Browser**
1. Open: http://localhost:3000/api/contact (will show error, that's OK)
2. Verify server responds

**Option B: Use PowerShell**
```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    phone = "+233 123 456 789"
    service = "rental"
    message = "This is a test"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/api/contact -Method POST -Body $body -ContentType "application/json"
```

**Should return:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!"
}
```

---

### ✅ TEST 5: Check Form is Submitting

**In browser console (F12), when you click "Send Message":**

**Look for:**
```
✅ Form submitted successfully: {success: true, ...}
```

**Or:**
```
❌ Error submitting form: ...
```

---

## 🎯 MOST COMMON ISSUES & FIXES

### Issue 1: Gmail Authentication Failed ⚠️ **MOST COMMON!**

**Symptoms:**
- Form says "Message Sent!" but you don't receive email
- Server console shows: "Error sending email: Invalid login"
- Server console shows: "535-5.7.8 Username and Password not accepted"

**Why:**
- Gmail doesn't allow regular passwords for third-party apps
- You're using: `Green@work1212` (won't work!)
- You need: Gmail App Password (16-character code)

**Fix:**
1. Go to: https://myaccount.google.com/security
2. Enable "2-Step Verification"
3. Create "App Password" for Mail
4. Copy the 16-character password (e.g., `abcdefghijklmnop`)
5. Edit `backend-simple/.env`:
   ```
   GMAIL_APP_PASSWORD=abcdefghijklmnop
   ```
   (Remove spaces!)
6. Restart server
7. Test again

**Full guide:** Read `GMAIL_SETUP_HELP.md`

---

### Issue 2: CORS Error

**Symptoms:**
- Browser console shows: "CORS policy: No 'Access-Control-Allow-Origin'"
- Form doesn't submit at all

**Why:**
- Opening HTML file directly (file://)
- Server only allows specific origins

**Fix:**
**Option A: Use Live Server (Easiest)**
1. Install "Live Server" extension in VS Code
2. Right-click index.html
3. Click "Open with Live Server"
4. Website opens at http://127.0.0.1:5500
5. Try form again

**Option B: Use serve**
```cmd
npx serve
```
Then open the URL it shows

---

### Issue 3: Server Not Really Running

**Symptoms:**
- http://localhost:3000/api/health doesn't load
- Browser console: "Failed to fetch"

**Why:**
- Server crashed
- Running on wrong port
- Node.js not installed

**Fix:**
1. Check server window is still open
2. Look for errors in server window
3. Restart server: `npm start`
4. Check port is 3000

---

### Issue 4: Wrong Endpoint

**Symptoms:**
- 404 error in browser console
- Server receives request but sends 404

**Check:**
- Form uses: `/api/contact` ✅
- NOT: `/api/inquiries` (that's for full backend)

**Your script.js line 120 should be:**
```javascript
const response = await fetch('http://localhost:3000/api/contact', {
```

---

## 🛠️ QUICK DIAGNOSTIC COMMANDS

**Run these to check everything:**

### 1. Check if server is running:
```
http://localhost:3000/api/health
```

### 2. Check server logs:
Look at the black server window for errors

### 3. Check browser console:
Press F12, look for errors in red

### 4. Check .env file:
```
GMAIL_USER=greenenterprise.work@gmail.com
GMAIL_APP_PASSWORD=Green@work1212
```

**⚠️ If password is still "Green@work1212", it WON'T work!**
**You need Gmail App Password!**

---

## 📋 DEBUGGING CHECKLIST

Check each item:

- [ ] Server is running (http://localhost:3000/api/health works)
- [ ] Server console shows no errors
- [ ] Browser console (F12) shows no errors
- [ ] Website opened through web server (not file://)
- [ ] Gmail App Password configured (not regular password)
- [ ] `.env` file has correct email
- [ ] Server restarted after changing `.env`
- [ ] Form endpoint is `/api/contact`

---

## 🎯 MOST LIKELY PROBLEM

**90% chance it's one of these:**

1. **Gmail Authentication** (need App Password)
   - Server running ✅
   - Form submits ✅
   - But email not sent ❌
   - Server shows authentication error ❌

2. **CORS Issue** (need web server)
   - Server running ✅
   - Form doesn't submit ❌
   - Browser console shows CORS error ❌

3. **Server not really running**
   - http://localhost:3000/api/health doesn't work ❌

---

## 🚀 WHAT TO DO RIGHT NOW

1. **Check browser console:**
   - Open website (index.html)
   - Press F12
   - Click "Console" tab
   - Submit form
   - **Tell me what errors you see (if any)**

2. **Check server console:**
   - Look at the black server window
   - Submit form from website
   - **Tell me what messages you see**

3. **Most likely fix needed:**
   - Gmail App Password setup
   - Read `GMAIL_SETUP_HELP.md`
   - Takes 5 minutes
   - Fixes 90% of issues

---

## 📞 NEED MORE HELP?

**Tell me:**
1. What errors do you see in browser console (F12)?
2. What errors do you see in server console (black window)?
3. Does http://localhost:3000/api/health work?
4. How are you opening the website? (file:// or http://)?

Then I can give you the exact fix!

---

**Most likely: You need Gmail App Password!**
**Read: GMAIL_SETUP_HELP.md**
