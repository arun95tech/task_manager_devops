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

## Final AWS Deployment Choice

The final AWS deployment strategy for this project is:

Developer
↓
GitHub Repository
↓
Jenkins CI/CD Server on AWS EC2
↓
Docker Build
↓
AWS Elastic Container Registry
↓
EC2 pulls latest Docker images from ECR
↓
Docker Compose starts containers
↓
Application becomes accessible using EC2 public IP

------

## Reason for Choosing EC2 + ECR

AWS ECR is selected as the container image registry because it integrates directly with AWS services and provides a more AWS-native deployment approach than DockerHub.

EC2 with Docker Compose is selected for deployment because the project has multiple microservices and Docker Compose can run all services together in a simple and cost-controlled way.

EKS was considered as a future production option, but it was not selected for the main live deployment because it can create higher ongoing costs and requires more advanced cluster management.

------

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