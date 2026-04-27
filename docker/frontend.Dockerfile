# Step 1: Build React app
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source code
COPY frontend/ .

# Build frontend for production
RUN npm run build

# Step 2: Serve build with Nginx
FROM nginx:alpine

# Copy React build output to Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose Nginx port
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]