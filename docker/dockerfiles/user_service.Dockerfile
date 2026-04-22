
# docker/dockerfiles/user_service.Dockerfile

# Base image - python 3.11 slim version 
FROM python:3.11-slim

# Stops Python making unnecessary files inside container
ENV PYTHONDONTWRITEBYTECODE=1

# Makes logs show immediately (important for debugging)
ENV PYTHONUNBUFFERED=1

# All commands run from /app inside the container
WORKDIR /app

# Install OS level packages that Django needs
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        gcc \
        python3-dev \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (Docker caches this layer)
COPY user_service/requirements.txt .

# Install Python packages
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy all user_service code into container
COPY user_service/ .

# User service runs on port 8000
EXPOSE 8000

# Command to start Django when container starts
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]