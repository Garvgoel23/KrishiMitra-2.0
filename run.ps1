Write-Host "Starting KrishiMitra Backend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$PSScriptRoot'; .\`.venv\Scripts\Activate.ps1; python Scripts\app.py`""

Write-Host "Starting KrishiMitra Frontend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$PSScriptRoot\Frontend'; npm run dev`""

Write-Host "KrishiMitra Application Stack is launching in separate windows!" -ForegroundColor Yellow
