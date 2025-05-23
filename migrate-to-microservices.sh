# PowerShell script for Windows
# Create project directories
New-Item -ItemType Directory -Force -Path "microservices/api-gateway/src"
New-Item -ItemType Directory -Force -Path "microservices/auth-service/src"
New-Item -ItemType Directory -Force -Path "microservices/user-service/src"
New-Item -ItemType Directory -Force -Path "microservices/ride-service/src"
New-Item -ItemType Directory -Force -Path "microservices/car-service/src"

# Copy common files
Copy-Item ".env" "microservices/api-gateway/" -ErrorAction SilentlyContinue
Copy-Item ".env" "microservices/auth-service/" -ErrorAction SilentlyContinue
Copy-Item ".env" "microservices/user-service/" -ErrorAction SilentlyContinue
Copy-Item ".env" "microservices/ride-service/" -ErrorAction SilentlyContinue
Copy-Item ".env" "microservices/car-service/" -ErrorAction SilentlyContinue

# Copy auth modules
if (Test-Path "src/modules/auths") {
    Copy-Item "src/modules/auths/*" "microservices/auth-service/src/" -Recurse -Force
}

# Copy user modules
if (Test-Path "src/modules/users") {
    Copy-Item "src/modules/users/*" "microservices/user-service/src/" -Recurse -Force
}

# Copy ride modules
if (Test-Path "src/modules/rides") {
    Copy-Item "src/modules/rides/*" "microservices/ride-service/src/" -Recurse -Force
}

# Copy cars modules
if (Test-Path "src/modules/cars") {
    Copy-Item "src/modules/cars/*" "microservices/car-service/src/" -Recurse -Force
}

# Copy shared modules to api-gateway
if (Test-Path "src/shared") {
    Copy-Item "src/shared" "microservices/api-gateway/src/" -Recurse -Force
}

# Create docker-compose file in root directory
if (Test-Path "docker-compose.yml") {
    Copy-Item "docker-compose.yml" "microservices/"
}

Write-Host "Migration completed. Please check the microservices directory." -ForegroundColor Green