#!/bin/bash

# ======================
# Deployment variables
# ======================
REMOTE_USER="ubuntu"                  # Remote server username
REMOTE_HOST="3.7.251.62"              # Remote server IP
REMOTE_APP_NAME="mts-frontend"        # Docker container name
LOCAL_IMAGE_NAME="mts-frontend:latest" # Local Docker image tag
REMOTE_IMAGE_NAME="mts-frontend:latest" # Remote Docker image tag
REMOTE_PORT=80                         # Port to expose on the server
PEM_KEY="./web-server.pem"             # Path to your PEM key file

# SSH options
SSH_OPTS="-i $PEM_KEY -o StrictHostKeyChecking=no"

# ======================
# Deployment steps
# ======================

echo "🚀 Starting React app deployment to $REMOTE_HOST..."

# Step 1: Build Docker image locally
echo "🐳 Building Docker image locally..."
docker build -t $LOCAL_IMAGE_NAME .

# Step 2: Save and send image to remote server
echo "📦 Sending image to remote server..."
docker save $LOCAL_IMAGE_NAME | ssh $SSH_OPTS $REMOTE_USER@$REMOTE_HOST "docker load"

# Step 3: Stop and remove existing container (if any)
echo "🛑 Stopping existing container (if any)..."
ssh $SSH_OPTS $REMOTE_USER@$REMOTE_HOST "docker rm -f $REMOTE_APP_NAME || true"

# Step 4: Run new container
echo "🚢 Starting new container..."
ssh $SSH_OPTS $REMOTE_USER@$REMOTE_HOST "docker run -d --name $REMOTE_APP_NAME -p $REMOTE_PORT:80 $REMOTE_IMAGE_NAME"

echo "✅ Deployment complete! App running on http://$REMOTE_HOST/"
