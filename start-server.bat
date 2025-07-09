@echo off
echo Starting TEAM TOXIIC Website Development Server...
echo.
echo Opening website at http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

REM Try to start with Python 3
python -m http.server 8000

REM If Python 3 is not available, try Python 2
if %errorlevel% neq 0 (
    echo Python 3 not found, trying Python 2...
    python -m SimpleHTTPServer 8000
)

REM If neither work, show error message
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python and try again
    echo.
    pause
)
