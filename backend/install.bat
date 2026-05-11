@echo off
echo ========================================
echo   Green Enterprise Backend Setup
echo ========================================
echo.
echo Installing dependencies...
echo.

npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! Dependencies installed.
    echo ========================================
    echo.
    echo To start the server, run:
    echo   npm start
    echo.
    echo Or run: start-server.bat
    echo.
) else (
    echo.
    echo ========================================
    echo ERROR: Installation failed!
    echo ========================================
    echo.
    echo Please read QUICK_START.md for help.
    echo.
)

pause
