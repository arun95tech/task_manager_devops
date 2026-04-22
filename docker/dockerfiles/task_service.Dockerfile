
# docker/dockerfiles/task_service.Dockerfile

# Base image — Python 3.11 slim version
FROM python:3.11-slim

# Stops Python making unnecessary files inside container
ENV PYTHONDONTWRITEBYTECODE=1

# Makes logs show immediately
ENV PYTHONUNBUFFERED=1

# All commands run from /app inside container
WORKDIR /app

# Install OS level packages that Django needs
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        gcc \
        python3-dev \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (Docker caches this layer)
COPY task_service/requirements.txt .

# Install Python packages
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy all task_service code into container
COPY task_service/ .

# Task service runs on port 8001
# Different from user_service (8000) to avoid conflict
EXPOSE 8001

# Command to start Django when container starts
CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]