# How to Update Your Website on GitHub

## 📋 Every Time You Make Changes to Your Website:

Follow these 3 simple commands in order:

### 1️⃣ Add your changes
```bash
git add .
```

### 2️⃣ Commit with a message
```bash
git commit -m "Describe what you changed"
```

### 3️⃣ Push to GitHub
```bash
git push
```

---

## 💡 **Examples:**

### Example 1: Changed phone number
```bash
git add .
git commit -m "Updated contact phone number"
git push
```

### Example 2: Added new excavator
```bash
git add .
git commit -m "Added new Caterpillar excavator to equipment"
git push
```

### Example 3: Fixed typo
```bash
git add .
git commit -m "Fixed spelling errors"
git push
```

---

## 📝 **Quick Copy-Paste (Generic Update):**

If you don't want to write a custom message, just copy and paste these three lines:

```bash
git add .
git commit -m "Updated website content"
git push
```

---

## ⚠️ **Important Notes:**

1. **Changes are NOT automatic** - You must run these commands every time
2. **Always run all 3 commands** in order (add → commit → push)
3. If using GitHub Pages, your website updates in 1-2 minutes after pushing
4. You can check your changes at: https://github.com/dp500518-alt/Green-Enterprise-web

---

## 🔍 **Useful Commands:**

### Check what files you changed:
```bash
git status
```

### See your commit history:
```bash
git log --oneline
```

### See what changes you made:
```bash
git diff
```

---

## 🆘 **Common Issues:**

### Problem: "Nothing to commit"
**Solution:** You haven't made any changes, or you already pushed them.

### Problem: "Push rejected" 
**Solution:** Someone else made changes. Run this first:
```bash
git pull
```
Then try pushing again.

---

**Remember:** Git is like saving your work - you have to do it manually each time! 💾
