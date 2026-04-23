@echo off
echo Starting KrishiMitra Backend...
start cmd /k "cd /d %~dp0 && call .venv\Scripts\activate.bat && python Scripts\app.py"

echo Starting KrishiMitra Frontend...
start cmd /k "cd /d %~dp0Frontend && npm run dev"

echo KrishiMitra Application Stack is launching in separate windows!
