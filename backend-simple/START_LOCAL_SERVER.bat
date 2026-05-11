@echo off
echo ========================================
echo   GREEN ENTERPRISE BACKEND SERVER
echo   Starting Local Backend...
echo ========================================
echo.

cd /d "%~dp0"

echo [1/2] Checking dependencies...
if not exist "node_modules" (
    echo Installing dependencies... Please wait!
    npm install
    echo.
)

echo [2/2] Starting server...
echo.
echo *** KEEP THIS WINDOW OPEN ***
echo The backend must stay running for forms to work!
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

npm start

pause
