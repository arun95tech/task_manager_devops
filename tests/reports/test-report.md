# Test Report - Task Management System

The purpose of this testing is to confirm that the Task Management System services are running correctly after deployment.

The project uses:

- GitHub for source code
- Jenkins on AWS EC2 for CI/CD
- Docker for containerization
- AWS ECR for Docker image storage
- AWS EC2 for deployment
- Docker Compose for running containers

------

## Deployment Workflow Tested

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
Application accessible using EC2 public IP

------

## Services Tested

| Frontend          | 80        | http://EC2_PUBLIC_IP/                 | Passed |
| User Service      | 8000      | http://EC2_PUBLIC_IP:8000/api/health/ | Passed |
| Task Service      | 8001      | http://EC2_PUBLIC_IP:8001/api/health/ | Passed |

------

## Test Environment

| Item              | Details        |
| Cloud Provider    | AWS            |
| Server            | EC2 Ubuntu     |
| CI/CD Tool        | Jenkins        |
| Image Registry    | AWS ECR        |
| Container Tool    | Docker         |
| Deployment Tool   | Docker Compose |
| Browser           | Chrome         |
| Testing Type      | Manual testing |

------

## Test Summary

| Test Area                  | Result |
| Jenkins pipeline execution | Passed |
| Docker image build         | Passed |
| Push images to AWS ECR     | Passed |
| Pull images on EC2         | Passed |
| Docker Compose deployment  | Passed |
| Frontend public access     | Passed |
| User Service health API    | Passed |
| Task Service health API    | Passed |

------

## Issues Found

| Issue                       | Service                       | Fix                                                            |
| Django DisallowedHost error | User Service and Task Service | ALLOWED_HOSTS updated for EC2 deployment                       |
| Old container name conflict | Docker Compose deployment     | Jenkinsfile updated to remove old containers before deployment |

------

## Final Result

The Task Management System deployment was tested successfully.

The frontend was accessible using the EC2 public IP.

Both backend health endpoints were tested successfully.
