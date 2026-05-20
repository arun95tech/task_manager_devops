# Test Report - Task Management System

The purpose of this testing is to confirm that the Task Management System services are running correctly after deployment on AWS EC2.

The project uses:

- GitHub for source code
- Jenkins on AWS EC2 for CI/CD
- Docker for containerization
- AWS ECR for Docker image storage
- AWS EC2 for deployment
- Docker Compose for running containers
- GitHub webhook for automatic Jenkins trigger

------

## Deployment Workflow Tested

Developer
   |
GitHub Repository
   |
GitHub Webhook
   |
Jenkins CI/CD Server on AWS EC2
   |
Docker Build
   |
AWS Elastic Container Registry
   |
EC2 pulls latest Docker images from ECR
   |
Docker Compose starts containers
   |
Application accessible using AWS Elastic IP

------

## Services Tested

| Service | Port | URL | Result |
|---|---:|---|---|
| Frontend | 80 | `http://13.134.167.75/` | Passed |
| User Service | 8000 | `http://13.134.167.75:8000/api/health/` | Passed |
| Task Service | 8001 | `http://13.134.167.75:8001/api/health/` | Passed |
| Jenkins Pipeline | 8080 | `http://13.134.167.75:8080/job/task-management-system-pipeline/` | Passed |

------

## Test Environment

| Item | Details |
|---|---|
| Cloud Provider | AWS |
| Server | EC2 Ubuntu |
| CI/CD Tool | Jenkins |
| Image Registry | AWS ECR |
| Container Tool | Docker |
| Deployment Tool | Docker Compose |
| Browser | Chrome |
| Testing Type | Manual testing |

------

## Test Summary

| Test Area | Result |
|---|---|
| Jenkins pipeline execution | Passed |
| GitHub webhook automatic trigger | Passed |
| Docker image build | Passed |
| Push images to AWS ECR | Passed |
| Pull images on EC2 | Passed |
| Docker Compose deployment | Passed |
| Frontend public access | Passed |
| User Service health API | Passed |
| Task Service health API | Passed |

------

## Issues Found and Fixed

| Issue | Service | Fix |
|---|---|---|
| Django DisallowedHost error | User Service and Task Service | `ALLOWED_HOSTS` updated for EC2 deployment |
| Old container name conflict | Docker Compose deployment | Jenkinsfile updated to remove old containers before deployment |
| Frontend API connection issue | Frontend and backend services | CORS enabled for API calls |

------

## Final Result

The Task Management System deployment was tested successfully.

The frontend is accessible using the AWS Elastic IP.

Both backend health endpoints return successful responses.

The Jenkins pipeline job is available and GitHub webhook automation was tested successfully.
