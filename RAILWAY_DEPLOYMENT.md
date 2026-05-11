# 🚂 RAILWAY DEPLOYMENT GUIDE

## ✅ Great Choice! Railway is Perfect for Your Backend!

Railway offers:
- ✅ **Auto-deployment** from GitHub
- ✅ **$5/month free credit** 
- ✅ **Easy setup**
- ✅ **Always running** (not serverless)
- ✅ **Simple environment variables**

---

## 🚀 RAILWAY SETUP (10 Minutes)

### **Step 1: Deploy Your Backend to Railway**

1. **Go to:** https://railway.app
2. **Sign in** with GitHub
3. **Click:** "New Project"
4. **Select:** "Deploy from GitHub repo"
5. **Choose:** `Green-Enterprise-web` repository
6. **Select service:** `backend-simple` folder

**Wait 2-3 minutes for deployment...**

---

### **Step 2: Configure Environment Variables**

**In Railway dashboard:**

1. **Click** your deployed service
2. **Go to** "Variables" tab
3. **Add these variables:**

```
GMAIL_USER = greenenterprise.work@gmail.com
GMAIL_APP_PASSWORD = your-gmail-app-password-here
PORT = 3000
```

**Important:** 
- Replace `your-gmail-app-password-here` with your actual Gmail App Password
- **NOT** your regular password!
- Get App Password from: https://myaccount.google.com/security

4. **Click** "Add" for each variable
5. Railway will **auto-restart** your service

---

### **Step 3: Get Your Railway URL**

**In Railway dashboard:**

1. Click **"Settings"** tab
2. Scroll to **"Domains"**
3. Click **"Generate Domain"**
4. Copy your URL (looks like: `https://green-enterprise-backend.up.railway.app`)

**This is your backend URL!** 🎉

---

### **Step 4: Update Frontend to Use Railway Backend**

**Edit `script.js` in your project:**

**Find line 120:**
```javascript
const response = await fetch('http://localhost:3000/api/contact', {
```

**Change to:**
```javascript
const response = await fetch('https://your-project.up.railway.app/api/contact', {
```

**Replace `your-project.up.railway.app` with your actual Railway URL!**

---

### **Step 5: Push to GitHub**

```bash
git add script.js
git commit -m "Update API endpoint to use Railway backend"
git push
```

**Railway will auto-deploy!** ✅

**If you have Vercel:** Frontend auto-deploys too! ✅

---

## 🔄 AUTO-DEPLOYMENT WORKFLOW

**Once everything is set up:**

```
1. You edit backend code
   ↓
2. git push to GitHub
   ↓
3. Railway detects changes
   ↓
4. Auto-rebuilds backend (2-3 min)
   ↓
5. Backend is live! 🚀
```

**You just push to GitHub - Railway handles the rest!**

---

## ⚙️ RAILWAY CONFIGURATION

### **Root Directory Setup**

**If Railway asks for root directory:**

**Option A: Backend-Simple (Email only)**
```
Root Directory: backend-simple
Build Command: npm install
Start Command: npm start
```

**Option B: Full Backend (Database + Admin)**
```
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

---

## 🛠️ TROUBLESHOOTING

### **Issue 1: Build Fails**

**Check Railway logs:**
1. Go to Railway dashboard
2. Click your service
3. Click "Deployments"
4. Click latest deployment
5. Check build logs

**Common fixes:**
- Make sure `package.json` is in root directory of service
- Check Node.js version (Railway uses latest by default)

---

### **Issue 2: Service Crashes After Deploy**

**Check Runtime logs:**
1. Railway dashboard → Your service
2. Click "View Logs"
3. Look for errors

**Common causes:**
- Missing environment variables
- Gmail authentication failed (need App Password!)
- Port configuration issue

**Fix:**
- Add all required environment variables
- Use Gmail App Password, not regular password
- Set PORT=3000 in variables

---

### **Issue 3: Authentication Failed**

**Server logs show: "Invalid login" or "EAUTH"**

**Fix:**
1. Go to: https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Create App Password for "Mail"
4. Copy 16-character password
5. Update Railway variable: `GMAIL_APP_PASSWORD`
6. Remove all spaces from password!
7. Service will auto-restart

---

### **Issue 4: Can't Access Backend**

**Test your Railway URL:**
```
https://your-project.up.railway.app/api/health
```

**Should return:**
```json
{
  "success": true,
  "message": "Green Enterprise Email Backend is running!"
}
```

**If it doesn't work:**
- Check service is running in Railway dashboard
- Check environment variables are set
- Check logs for errors

---

## 💰 RAILWAY PRICING

**Free Tier:**
- $5/month credit (FREE)
- ~500 hours of runtime
- Enough for hobby projects

**If you need more:**
- Pay-as-you-go after free credit
- Usually ~$5-10/month for simple backend

**Your backend should stay in free tier!** ✅

---

## 🔒 SECURITY CHECKLIST

**Before deploying:**

- [x] `.env` files in `.gitignore` ✅ (already done)
- [ ] Environment variables set in Railway dashboard
- [ ] Using Gmail App Password (NOT regular password)
- [ ] Frontend updated with Railway URL
- [ ] CORS settings allow your frontend domain

---

## 📝 RAILWAY DEPLOYMENT CHECKLIST

**Complete setup:**

- [ ] Railway account created with GitHub
- [ ] Backend deployed from GitHub repo
- [ ] Environment variables configured:
  - [ ] `GMAIL_USER`
  - [ ] `GMAIL_APP_PASSWORD`
  - [ ] `PORT`
- [ ] Domain generated in Railway
- [ ] Railway URL copied
- [ ] `script.js` updated with Railway URL
- [ ] Changes pushed to GitHub
- [ ] Frontend auto-deployed (if on Vercel)
- [ ] Test: Form submission works
- [ ] Test: Email received in Gmail

---

## 🧪 TESTING YOUR RAILWAY DEPLOYMENT

### **Test 1: Backend Health Check**
```
https://your-project.up.railway.app/api/health
```
Should show success message ✅

### **Test 2: Contact Form**
1. Open your website
2. Fill out contact form
3. Submit
4. Should see "Message Sent!" ✅
5. Check your Gmail inbox ✅

### **Test 3: Check Railway Logs**
1. Railway dashboard
2. Click your service
3. "View Logs"
4. Should see: "✅ Email sent successfully!" ✅

---

## 🔄 UPDATE WORKFLOW (After Setup)

**To update your backend:**

```bash
# 1. Edit code locally
# 2. Test locally
npm start

# 3. Push to GitHub
git add .
git commit -m "Update backend"
git push

# 4. Railway auto-deploys!
# Wait 2-3 minutes

# 5. Test live backend
# Visit: https://your-project.up.railway.app/api/health
```

**That's it!** No manual deployment needed! 🎉

---

## 🆚 RAILWAY vs OTHER PLATFORMS

| Feature | Railway | Render | Vercel |
|---------|---------|--------|--------|
| **Backend Support** | ✅ Perfect | ✅ Perfect | ❌ Serverless only |
| **Auto-Deploy** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Free Tier** | ✅ $5 credit | ✅ Yes | ✅ Yes (limited) |
| **Easy Setup** | ✅ Very Easy | ✅ Easy | ⚠️ Complex |
| **Node.js Server** | ✅ Yes | ✅ Yes | ❌ Not ideal |

**Railway is perfect for your backend!** ✅

---

## 🎯 COMPLETE DEPLOYMENT SETUP

### **Current Status:**

**GitHub:** ✅ Code pushed
- Repository: https://github.com/dp500518-alt/Green-Enterprise-web
- Auto-sync: Working

**Railway (Backend):**
- [ ] Deploy backend-simple folder
- [ ] Set environment variables
- [ ] Generate domain
- [ ] Get backend URL

**Frontend:**
- [ ] Update script.js with Railway URL
- [ ] Push to GitHub
- [ ] Deploy to Vercel (optional)

---

## 📞 QUICK REFERENCE

**Railway Dashboard:** https://railway.app/dashboard

**Your Backend URL:** 
```
https://your-project.up.railway.app
```

**API Endpoints:**
- Health: `/api/health`
- Contact: `/api/contact`

**Environment Variables Needed:**
- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`
- `PORT`

---

## 💡 PRO TIPS

1. **Keep Railway logs open** during first deployment
2. **Test health endpoint** before updating frontend
3. **Use App Password** - regular password won't work!
4. **Generate domain** - Railway doesn't auto-generate
5. **Monitor free credit** - Check Railway dashboard

---

## 🎊 NEXT STEPS

**To complete your deployment:**

1. **Deploy to Railway** (if not done yet)
2. **Set environment variables** (Gmail credentials)
3. **Generate domain** (get your URL)
4. **Update script.js** (use Railway URL)
5. **Push to GitHub** (auto-deploys everything)
6. **Test your form** (should work live!)

---

## ✅ SUCCESS INDICATORS

**You'll know it's working when:**

- ✅ Railway shows "Active" status
- ✅ `https://your-project.up.railway.app/api/health` works
- ✅ Contact form submits successfully
- ✅ Email arrives in greenenterprise.work@gmail.com
- ✅ Railway logs show "Email sent successfully!"

---

**Railway is perfect for your backend!** 🚂

**Your backend will auto-deploy on every GitHub push!** 🚀

**Need help? Check Railway logs for error messages!**
