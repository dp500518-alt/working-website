@echo off
echo ========================================
echo   Green Enterprise Email Backend
echo   Installing Dependencies...
echo ========================================
echo.

npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! Dependencies installed.
    echo ========================================
    echo.
    echo NEXT STEP: Configure your Gmail
    echo.
    echo 1. Open .env file in this folder
    echo 2. Add your Gmail address
    echo 3. Add your Gmail App Password
    echo 4. Save the file
    echo.
    echo Then run: start-email-server.bat
    echo.
) else (
    echo.
    echo ========================================
    echo ERROR: Installation failed!
    echo ========================================
    echo.
    echo Make sure Node.js is installed.
    echo.
)

pause
