# Health API Test Notes

This document records basic health API testing for the User Service and Task Service.

------

## Test 1: User Service Health API

### Request


GET http://127.0.0.1:8000/api/health/ 

### Response

{
  "service": "user_service",
  "status": "running"
}

### Test 2: Task Service Health API

### request

GET http://127.0.0.1:8001/api/health/

### Response

{
  "service": "task_service",
  "status": "running"
}

### Test Frontend

### url

http://localhost:3000/

### Response

Task Management System page opens successfully.