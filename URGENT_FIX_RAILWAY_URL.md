# 🚨 URGENT FIX NEEDED - UPDATE RAILWAY URL

## ❌ Problem Found!

Your Vercel site is trying to connect to `localhost` which doesn't exist in production!

**Error:** "Failed to send message. Please try calling us directly."

---

## ✅ SOLUTION - 3 Steps to Fix

### Step 1: Get Your Railway Backend URL

1. **Go to:** https://railway.app/dashboard
2. **Click:** Your backend service
3. **Go to:** Settings tab
4. **Scroll to:** "Domains" section
5. **Copy the URL** (looks like):
   ```
   https://green-enterprise-backend.up.railway.app
   ```
   OR
   ```
   https://web-production-XXXX.up.railway.app
   ```

### Step 2: Update script.js

**Open:** `script.js` file

**Find line 122** (it currently says):
```javascript
const response = await fetch('https://YOUR_RAILWAY_URL.up.railway.app/api/contact', {
```

**Replace `YOUR_RAILWAY_URL.up.railway.app` with your actual Railway URL:**

**Example - if your Railway URL is:**
```
https://green-enterprise-backend.up.railway.app
```

**Then line 122 should be:**
```javascript
const response = await fetch('https://green-enterprise-backend.up.railway.app/api/contact', {
```

### Step 3: Push to GitHub

```bash
git add script.js
git commit -m "Fix: Update to Railway backend URL"
git push
```

**Vercel will auto-deploy in 30 seconds!**

---

## 🧪 Test After Fix

1. **Wait 30 seconds** for Vercel to deploy
2. **Refresh your Vercel website**
3. **Fill out contact form**
4. **Submit**
5. **Should work now!** ✅

---

## 📝 How to Find Your Railway URL

**Option A: Railway Dashboard**
- Dashboard → Your Service → Settings → Domains → Copy URL

**Option B: Railway Service Page**
- Click your service → Look for the URL at the top

**Option C: Check Deployments**
- Your service → Deployments → Latest deployment → Domain shown

---

## ⚠️ IMPORTANT

**Your Railway URL might look like:**
- `https://green-enterprise-backend.up.railway.app`
- `https://web-production-1a2b.up.railway.app`
- `https://backend-production.up.railway.app`

**It will always:**
- Start with `https://`
- End with `.up.railway.app`
- Be assigned by Railway (you can't choose it unless you add custom domain)

---

## 💡 Quick Test

**Before pushing, test your Railway backend:**

Open browser and go to:
```
https://your-railway-url.up.railway.app/api/health
```

**Should show:**
```json
{
  "success": true,
  "message": "Green Enterprise Email Backend is running!"
}
```

**If this works ✅ = Your Railway URL is correct!**

**Then update script.js with that exact URL!**

---

## 🎯 Summary

**Problem:** script.js uses `localhost`
**Solution:** Change to Railway URL
**Steps:**
1. Get Railway URL from dashboard
2. Update script.js line 122
3. Push to GitHub
4. Wait 30 seconds
5. Test!

---

**After you tell me your Railway URL, I can update the code for you!**

**Or you can edit script.js line 122 yourself right now!**
