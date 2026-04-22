
# docker/dockerfiles/frontend.Dockerfile

# Nginx serves our frontend HTML/CSS/JS files
FROM nginx:alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy our frontend files into nginx serving folder
COPY frontend/ /usr/share/nginx/html/

# Frontend runs on port 80 (standard web port)
EXPOSE 80

# Nginx starts automatically — no CMD needed