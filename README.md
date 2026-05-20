# Task Management System - DevOps Project

This project is a microservices-based Task Management System created for a DevOps coursework project. It includes a React frontend, two Django backend services, Docker containerization, Jenkins CI/CD, AWS ECR image storage, and AWS EC2 deployment using Docker Compose.

------

## Project Overview

The system contains three main application services:

- Frontend: React application for login, registration, and task management
- User Service: Django REST API for user registration, login, and health check
- Task Service: Django REST API for task create, read, update, delete, and health check

------

## Final DevOps Pipeline

The final deployment pipeline uses AWS EC2, AWS ECR, Jenkins, Docker, and Docker Compose.

Developer
   |
GitHub Repository
   |
GitHub Webhook
   |
Jenkins CI/CD Server on AWS EC2
   |
Build Docker Images
   |
Push Images to AWS ECR
   |
EC2 Pulls Latest Images
   |
Docker Compose Starts Containers
   |
Application Runs on AWS Elastic IP

When code is pushed to the `main` branch, GitHub webhook automatically triggers Jenkins. Jenkins builds the latest Docker images, pushes them to AWS ECR, pulls them on EC2, and restarts the containers using Docker Compose.

------

## Services and Ports

| Service | Port | URL |
|---|---:|---|
| Frontend | 80 on AWS / 3000 local | `http://13.134.167.75/` or `http://localhost:3000/` |
| User Service | 8000 | `http://13.134.167.75:8000/api/health/` |
| Task Service | 8001 | `http://13.134.167.75:8001/api/health/` |
| Jenkins | 8080 | `http://13.134.167.75:8080/` |
| Jenkins Pipeline Job | 8080 | `http://13.134.167.75:8080/job/task-management-system-pipeline/` |

------

## Main Features

- User registration
- User login
- Task creation
- Task list view
- Task status update
- Task delete
- Frontend connected with backend APIs
- Dockerized frontend and backend services
- Jenkins automated CI/CD pipeline
- AWS ECR image registry
- AWS EC2 deployment
- GitHub webhook automation

------

## Team Responsibilities

| Team Member | Responsibility |
|---|---|
| Talha | Project management and documentation |
| Harvinder | User Service |
| Omer | Task Service |
| Jasvinder | Frontend |
| Arun | DevOps, Docker, Jenkins, AWS EC2, AWS ECR, deployment |
| Manav | Testing and test evidence |

------

## Run Locally With Docker Compose

From the project root:

```bash
docker compose up --build
```

Local URLs:

```text
Frontend: http://localhost:3000/
User Service: http://localhost:8000/api/health/
Task Service: http://localhost:8001/api/health/
```

Stop containers:

```bash
docker compose down
```

------

## Run on AWS EC2

SSH into the EC2 instance:

```bash
ssh -i your-key.pem ubuntu@13.134.167.75
```

Run the AWS deployment compose file:

```bash
docker compose -f docker-compose.aws.yml pull
docker compose -f docker-compose.aws.yml up -d
```

Check running containers:

```bash
docker ps
```

------

## Testing Evidence

Testing documentation is stored in:

- `tests/api_tests/health-api-test-notes.md`
- `tests/reports/test-report.md`

The project includes evidence for:

- Frontend public access
- User Service health API
- Task Service health API
- Docker container deployment
- Jenkins pipeline execution
- GitHub webhook automation
- AWS EC2 deployment

------

## Documentation

Additional project documentation:

- `docs/project-flow.md`
- `docs/project_progres.md`

------

## Final Result

The application is deployed on AWS EC2 using Docker Compose. Jenkins automatically deploys the latest version when code is pushed to the `main` branch.
