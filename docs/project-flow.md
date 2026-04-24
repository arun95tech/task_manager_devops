# Task Management System - Project Flow

## DevOps Pipeline

Developer
   ↓
GitHub Repo
   ↓
Jenkins CI Server
   ↓
Docker Build
   ↓
Docker Image Registry: DockerHub or AWS ECR
   ↓
Kubernetes Cluster: AWS EKS
   ↓
Microservices Running: Pods + Services

## Team Roles

- Talha → Project Manager
- Harvinder → User Service
- Omer → Task Service
- Jasvinder → Frontend
- Arun → DevOps
- Manav → Testing

## Services

### User Service
Responsible person: Harvinder

Basic features:
- Register user
- Login user
- View user profile

### Task Service
Responsible person: Omer

Basic features:
- Create task
- View task
- Update task
- Delete task

### Frontend
Responsible person: Jasvinder

Basic features:
- Simple React UI
- Connect with backend APIs

### DevOps
Responsible person: Arun

Basic features:
- Docker setup
- Jenkins pipeline
- Kubernetes deployment
- AWS EKS deployment

### Testing
Responsible person: Manav

Basic features:
- Postman API testing
- Basic test cases
- Bug reporting