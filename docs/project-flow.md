# Task Management System - Project Flow

## Initial Pipeline Plan

Developer
   |
GitHub Repo
   |
Jenkins CI Server
   |
Docker Build
   |
Docker Image Registry
   |
Kubernetes Cluster on AWS EKS
   |
Microservices Running as Pods and Services

This was the first DevOps idea for the project. EKS was considered for a more production-style Kubernetes deployment, but it was later moved to future scope because it adds more cost and complexity for this project.

------

## Final DevOps Pipeline Used

The final AWS deployment strategy for this project is:

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
AWS Elastic Container Registry
   |
EC2 pulls latest Docker images from ECR
   |
Docker Compose starts containers
   |
Application becomes accessible using AWS Elastic IP

When code is pushed to the `main` branch, the GitHub webhook automatically triggers Jenkins. Jenkins checks out the latest code, builds Docker images for all services, pushes the images to AWS ECR, pulls the latest images on EC2, and starts the containers using Docker Compose.

------

## Reason for Final Change

AWS ECR is selected as the container image registry because it integrates directly with AWS services and provides a more AWS-native deployment approach than DockerHub.

EC2 with Docker Compose is selected for deployment because the project has multiple microservices and Docker Compose can run all services together in a simple and cost-controlled way.

EKS/Kubernetes was kept as a future production option, but it was not used for the final live deployment because it can create higher ongoing costs and requires more advanced cluster management.

------

## Team Roles

- Talha: Project Manager and Documentation
- Harvinder: User Service
- Omer: Task Service
- Jasvinder: Frontend
- Arun: DevOps Engineer
- Manav: Testing

## Services

### Project Management and Documentation

Responsible person: Talha

Responsibility:
- Manage project planning and team coordination
- Maintain project documentation
- Document the project flow and progress updates
- Track completed work from each team member
- Merge completed team work into `main`
- Keep the project structure and documentation ready for tutor review
- Support final presentation preparation and evidence organization

### User Service

Responsible person: Harvinder

Responsibility:
- Design and maintain the User Service
- Create user-related API endpoints
- Manage user registration and login functionality
- Handle user authentication validation
- Maintain User Service models, serializers, views, and URLs
- Make sure the User Service connects correctly with the frontend

### Task Service

Responsible person: Omer

Responsibility:
- Design and maintain the Task Service
- Create task-related API endpoints
- Manage task create, read, update, and delete functionality
- Maintain Task Service models, serializers, views, and URLs
- Validate task data such as title, status, assigned user, and due date
- Make sure the Task Service connects correctly with the frontend

### Frontend

Responsible person: Jasvinder

Responsibility:
- Design and maintain the React frontend
- Create user interface screens for login, registration, and task management
- Connect frontend forms and buttons with backend API endpoints
- Display task data clearly to the user
- Handle frontend messages, loading states, and user interactions
- Make sure the frontend is usable from the deployed AWS application

### DevOps

Responsible person: Arun

Responsibility:
- Manage Docker setup for all services
- Maintain Dockerfiles and Docker Compose configuration
- Configure Jenkins CI/CD pipeline
- Connect GitHub webhook with Jenkins
- Manage AWS EC2 deployment environment
- Configure AWS ECR image registry workflow
- Build, push, pull, and run Docker images during deployment
- Maintain automatic deployment after code is pushed to `main`
- Fix deployment issues related to containers, ports, CORS, and migrations

### Testing

Responsible person: Manav

Responsibility:
- Prepare testing plan and testing documents
- Test frontend access after deployment
- Test User Service API endpoints
- Test Task Service API endpoints
- Record health API testing evidence
- Record final deployment testing evidence
- Verify GitHub webhook and Jenkins automation
- Report bugs and confirm fixes after deployment

------

## Final Running Services

- Frontend: `http://13.134.167.75/`
- User Service: `http://13.134.167.75:8000/api/health/`
- Task Service: `http://13.134.167.75:8001/api/health/`
- Jenkins: `http://13.134.167.75:8080/`
- Jenkins Pipeline Job: `http://13.134.167.75:8080/job/task-management-system-pipeline/`
