#!/bin/bash

# ======================
# Deployment variables
# ======================
REMOTE_USER="ubuntu"                         # Remote server username
REMOTE_HOST="43.205.83.216"                  # Elastic IP (permanent)
REMOTE_APP_NAME="mts-frontend"               # Docker container name
IMAGE_NAME="mts-frontend:latest"             # Image name (same local & remote)
REMOTE_PORT=9000                             # Port to expose inside container
PEM_KEY="./web-server.pem"                   # Path to your PEM key file

# SSH options
SSH_OPTS="-i $PEM_KEY -o StrictHostKeyChecking=no"

# ======================
# Deployment steps
# ======================

echo "🚀 Starting optimized deployment to $REMOTE_HOST..."

# Step 1: Build image locally
echo "🐳 Building Docker image locally..."
docker build -t $IMAGE_NAME .

# Step 2: Stop container + remove old image on remote
echo "🧹 Cleaning old containers and images on remote..."
ssh $SSH_OPTS $REMOTE_USER@$REMOTE_HOST "
  docker stop $REMOTE_APP_NAME >/dev/null 2>&1 || true
  docker rm $REMOTE_APP_NAME >/dev/null 2>&1 || true
  docker image rm $IMAGE_NAME >/dev/null 2>&1 || true
"

# Step 3: Transfer image efficiently
echo "📦 Sending new image to remote server..."
docker save $IMAGE_NAME | gzip | ssh $SSH_OPTS $REMOTE_USER@$REMOTE_HOST "gunzip | docker load"

# Step 4: Run new container
echo "🚢 Starting fresh container..."
ssh $SSH_OPTS $REMOTE_USER@$REMOTE_HOST "
  docker run -d \
    --name $REMOTE_APP_NAME \
    --network traefik-net \
    -p 9000:9000 \
    $IMAGE_NAME
"

# Step 5: Optional — remove dangling images on remote
echo "🧼 Removing unused Docker images (optional cleanup)..."
ssh $SSH_OPTS $REMOTE_USER@$REMOTE_HOST "docker image prune -f >/dev/null 2>&1"

echo "✅ Deployment complete!"
echo "🌐 App is live at https://mytownservice.in/"