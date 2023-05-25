$URL = "http://localhost"
$PORT = 8000

# Start-Process "heroku" "local --port ${PORT}"
START-Process "nodemon.cmd" "./bin/www"
Start-Sleep -Seconds 1
START-Process chrome.exe "${URL}:${PORT}/" -WindowStyle Maximized
