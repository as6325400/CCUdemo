$URL = "http://localhost"
$PORT = 3000

Start-Process "heroku" "local --port ${PORT}"
Start-Sleep -Seconds 1
START-Process chrome.exe "${URL}:${PORT}/" -WindowStyle Maximized
