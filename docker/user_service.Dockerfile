# Use official Python image
FROM python:3.14-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements file first
COPY user_service/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy user service code into container
COPY user_service/ .

# Expose Django port
EXPOSE 8000

# Run Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]