@echo off
echo ========================================
echo   QUICK FIX: Start Backend Server
echo ========================================
echo.
echo Problem: Backend server is not running
echo Solution: Follow these steps
echo.
echo ========================================
echo   STEP 1: Fix PowerShell Scripts
echo ========================================
echo.
echo Option A: Quick Fix (Recommended)
echo 1. Right-click on PowerShell
echo 2. Select "Run as Administrator"
echo 3. Run this command:
echo    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
echo 4. Type Y and press Enter
echo 5. Close PowerShell
echo.
echo Option B: Use Command Prompt Instead
echo 1. Press Windows Key + R
echo 2. Type: cmd
echo 3. Press Enter
echo 4. Navigate to this folder
echo 5. Run: npm install
echo 6. Run: npm start
echo.
echo ========================================
echo   STEP 2: Install Dependencies
echo ========================================
echo.
echo Run this command in the backend-simple folder:
echo    npm install
echo.
echo ========================================
echo   STEP 3: Start Server
echo ========================================
echo.
echo Run this command:
echo    npm start
echo.
echo You should see:
echo    "Server running on: http://localhost:3000"
echo.
echo ========================================
echo   STEP 4: Keep Server Running
echo ========================================
echo.
echo DO NOT CLOSE the window!
echo The server must stay running for forms to work.
echo.
echo ========================================
echo   COMMON ISSUES
echo ========================================
echo.
echo Issue 1: "Scripts are disabled"
echo Fix: Run PowerShell as Admin, run:
echo      Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
echo.
echo Issue 2: "Authentication failed" 
echo Fix: Read GMAIL_SETUP_HELP.md
echo      You need App Password from Gmail
echo.
echo Issue 3: "Port 3000 already in use"
echo Fix: Close other programs using port 3000
echo      Or change PORT in .env file
echo.
echo ========================================
echo   CONTACT FORM WON'T WORK UNTIL
echo   BACKEND SERVER IS RUNNING!
echo ========================================
echo.
pause
