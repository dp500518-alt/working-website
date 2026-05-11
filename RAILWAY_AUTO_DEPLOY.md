# 🚂 RAILWAY AUTO-DEPLOYMENT - QUICK GUIDE

## ✅ You're Using Railway - Perfect!

Railway auto-deploys from GitHub automatically! Here's what you need to know:

---

## 🔄 HOW IT WORKS

**Simple workflow:**

```
1. You push code to GitHub
   ↓
2. Railway detects the push
   ↓
3. Automatically rebuilds backend
   ↓
4. Deploys to live (2-3 minutes)
   ↓
5. Backend is updated! 🚀
```

**YES! Changes auto-deploy to Railway!** ✅

---

## ⚙️ WHAT YOU NEED TO SET UP (One-time)

### **1. Environment Variables in Railway**

**Make sure these are set in Railway dashboard:**

**Go to:** Railway Dashboard → Your Service → Variables

**Add:**
```
GMAIL_USER = greenenterprise.work@gmail.com
GMAIL_APP_PASSWORD = your-gmail-app-password
PORT = 3000
```

**Important:** 
- Use Gmail **App Password** (16-character code)
- **NOT** your regular password `Green@work1212`
- Get it from: https://myaccount.google.com/security

---

### **2. Railway Domain**

**Get your backend URL:**

1. Railway Dashboard → Your Service
2. Click "Settings" tab
3. Scroll to "Domains"
4. Click "Generate Domain"
5. Copy the URL (e.g., `https://green-enterprise.up.railway.app`)

---

### **3. Update Frontend**

**Edit `script.js` line 120:**

**Change from:**
```javascript
const response = await fetch('http://localhost:3000/api/contact', {
```

**Change to:**
```javascript
const response = await fetch('https://YOUR-RAILWAY-URL.up.railway.app/api/contact', {
```

**This connects your website to Railway backend!**

---

## 📤 PUSH CHANGES TO RAILWAY

**Every time you update code:**

```bash
# 1. Make your changes
# 2. Commit
git add .
git commit -m "Your update message"

# 3. Push to GitHub
git push

# 4. Railway auto-deploys! (Wait 2-3 min)
```

**That's it!** No manual deployment needed! 🎉

---

## ✅ AUTO-DEPLOYMENT CHECKLIST

**Make sure:**

- [x] Code pushed to GitHub ✅
- [ ] Railway connected to your GitHub repo
- [ ] Environment variables set in Railway dashboard
- [ ] Railway domain generated
- [ ] `script.js` updated with Railway URL
- [ ] Changes pushed to GitHub

**Once setup:** Every push auto-deploys! 🚀

---

## 🧪 TEST YOUR DEPLOYMENT

**After pushing to GitHub:**

**1. Check Railway Deploy Status:**
- Go to Railway Dashboard
- Click your service
- See deployment progress

**2. Test Backend Health:**
```
https://your-railway-url.up.railway.app/api/health
```

Should return:
```json
{
  "success": true,
  "message": "Green Enterprise Email Backend is running!"
}
```

**3. Test Contact Form:**
- Submit form on your website
- Check Railway logs for "Email sent successfully!"
- Check Gmail inbox

---

## 🔍 CHECK RAILWAY LOGS

**To see what's happening:**

1. Railway Dashboard → Your Service
2. Click "View Logs"
3. Watch real-time logs

**Look for:**
- ✅ "Server running on port 3000"
- ✅ "Email sent successfully!"
- ❌ Any error messages

---

## ⚠️ COMMON ISSUES

### **Issue: "Authentication failed" in logs**

**Problem:** Gmail password not working

**Fix:**
1. Get Gmail App Password (not regular password!)
2. Update Railway variable: `GMAIL_APP_PASSWORD`
3. Service auto-restarts

---

### **Issue: Form doesn't submit**

**Checklist:**
- [ ] Railway backend is running (check health endpoint)
- [ ] `script.js` has correct Railway URL
- [ ] No CORS errors in browser console (F12)
- [ ] Frontend pushed to GitHub/deployed

---

### **Issue: Railway says "Deployment failed"**

**Check:**
- Railway build logs
- Make sure `package.json` is in the right folder
- Environment variables are set

---

## 💰 RAILWAY FREE TIER

**You have:**
- $5/month credit (FREE)
- ~500 hours runtime
- Enough for your backend!

**Monitor usage:**
- Railway Dashboard → Billing
- Check remaining credit

---

## 🎯 COMPLETE SETUP

**For full auto-deployment:**

**Backend (Railway):**
- [x] Code on GitHub ✅
- [ ] Deployed to Railway
- [ ] Environment variables set
- [ ] Domain generated
- [✅] Auto-deploys on push ✅

**Frontend (Vercel/Other):**
- [ ] Updated with Railway URL
- [ ] Deployed
- [ ] Auto-deploys on push

---

## 💡 PRO TIP

**You can deploy both `backend-simple` and `backend` on Railway:**

**Option 1: Simple Email Backend**
- Root: `backend-simple`
- Command: `npm start`
- Lighter, faster

**Option 2: Full Backend**
- Root: `backend`
- Command: `npm start`
- Database + Admin panel

**Choose based on your needs!**

---

## ✅ CURRENT STATUS

**GitHub:** ✅ Code pushed (commit 3ccdba4)

**Railway:** 
- Check: https://railway.app/dashboard
- Should show your deployed service
- Auto-deploys enabled if connected to GitHub

**Next:**
1. Set environment variables in Railway
2. Generate domain
3. Update frontend URL
4. Push to GitHub
5. Everything auto-deploys! 🎉

---

## 📚 MORE INFO

**Full guide:** Read `RAILWAY_DEPLOYMENT.md`

**Quick reference:**
- Railway Dashboard: https://railway.app/dashboard
- Environment variables: Dashboard → Variables
- Logs: Dashboard → View Logs
- Domain: Dashboard → Settings → Domains

---

## 🎊 SUMMARY

**Question:** "Will my changes auto-deploy to Railway?"

**Answer:** 
- ✅ **YES!** After initial setup
- 🔄 **Every GitHub push** triggers auto-deployment
- ⏱️ **Takes 2-3 minutes** to deploy
- 🔧 **One-time setup** needed (environment variables)
- 🚀 **Then automatic forever!**

---

**Your Railway backend is ready for auto-deployment!** 🚂🚀

**Just push to GitHub and Railway handles the rest!**
