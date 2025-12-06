Website Under construction.........

Hosted in vercel

Run locally in windows

# Run first time if not there

- Invoke-WebRequest -Uri "https://nodejs.org/dist/v25.2.1/node-v25.2.1-x64.msi" -OutFile "$env:TEMP\node-v25.2.1-x64.msi"
- Start-Process -FilePath "$env:TEMP\node-v25.2.1-x64.msi" -Wait
- $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
- npm install
- npm run dev
