# Health API Test Notes

This document records basic health API testing for the deployed Task Management System on AWS EC2.

------

## Test Environment

| Item | Details |
|---|---|
| Cloud Provider | AWS |
| Server | EC2 Ubuntu |
| Public Address | `13.134.167.75` |
| Testing Type | Manual API and browser testing |

------

## Test 1: User Service Health API

### Request

```http
GET http://13.134.167.75:8000/api/health/
```

### Expected Response

```json
{
  "status": "ok",
  "service": "user_service"
}
```

### Result

Passed

------

## Test 2: Task Service Health API

### Request

```http
GET http://13.134.167.75:8001/api/health/
```

### Expected Response

```json
{
  "status": "ok",
  "service": "task_service"
}
```

### Result

Passed

------

## Test 3: Frontend Access

### URL

```text
http://13.134.167.75/
```

### Expected Result

Task Management System page opens successfully.

### Result

Passed

------

## Test 4: Jenkins Pipeline Job

### URL

```text
http://13.134.167.75:8080/job/task-management-system-pipeline/
```

### Expected Result

Jenkins pipeline job opens successfully and shows the CI/CD build history.

### Result

Passed
