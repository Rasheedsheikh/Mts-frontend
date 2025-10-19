# Minimal single-stage Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package.json and lockfile
COPY package*.json ./

# Install dependencies
RUN npm install --production
RUN npm install -g serve

# Copy app source
COPY . .

# Build React app
RUN npm run build

# Expose frontend port
EXPOSE 9000

# Start server using "serve" and read from env
CMD ["serve", "-s", "build", "-l", "9000"]
