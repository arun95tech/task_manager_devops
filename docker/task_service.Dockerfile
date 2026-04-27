# Use official Python image
FROM python:3.14-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements file first
COPY task_service/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy task service code into container
COPY task_service/ .

# Expose Django port
EXPOSE 8001

# Run Django server on port 8001
CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]