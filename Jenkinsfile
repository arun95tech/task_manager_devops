pipeline {
    agent any

    environment {
        AWS_REGION = 'eu-west-2'
        AWS_ACCOUNT_ID = '982479882677'
        ECR_REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

        USER_SERVICE_IMAGE = "${ECR_REGISTRY}/user-service:latest"
        TASK_SERVICE_IMAGE = "${ECR_REGISTRY}/task-service:latest"
        FRONTEND_IMAGE = "${ECR_REGISTRY}/frontend-service:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('Show Project Files') {
            steps {
                echo 'Showing project files...'
                bat 'dir'
            }
        }

        stage('Check AWS CLI') {
            steps {
                echo 'Checking AWS CLI installation...'
                bat '"C:\\Program Files\\Amazon\\AWSCLIV2\\aws.exe" --version'
            }
        }

        stage('Build User Service Image') {
            steps {
                echo 'Building User Service Docker image...'
                bat 'docker build -f docker/user_service.Dockerfile -t %USER_SERVICE_IMAGE% .'
            }
        }

        stage('Build Task Service Image') {
            steps {
                echo 'Building Task Service Docker image...'
                bat 'docker build -f docker/task_service.Dockerfile -t %TASK_SERVICE_IMAGE% .'
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo 'Building Frontend Docker image...'
                bat 'docker build -f docker/frontend.Dockerfile -t %FRONTEND_IMAGE% .'
            }
        }

        stage('AWS ECR Login') {
            steps {
                echo 'Logging in to AWS ECR...'

                withCredentials([usernamePassword(
                    credentialsId: 'aws-credentials',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    bat '"C:\\Program Files\\Amazon\\AWSCLIV2\\aws.exe" configure set aws_access_key_id %AWS_ACCESS_KEY_ID%'
                    bat '"C:\\Program Files\\Amazon\\AWSCLIV2\\aws.exe" configure set aws_secret_access_key %AWS_SECRET_ACCESS_KEY%'
                    bat '"C:\\Program Files\\Amazon\\AWSCLIV2\\aws.exe" configure set default.region %AWS_REGION%'
                    bat '"C:\\Program Files\\Amazon\\AWSCLIV2\\aws.exe" ecr get-login-password --region %AWS_REGION% | docker login --username AWS --password-stdin %ECR_REGISTRY%'
                }
            }
        }

        stage('Push Images to ECR') {
            steps {
                echo 'Pushing images to AWS ECR...'
                bat 'docker push %USER_SERVICE_IMAGE%'
                bat 'docker push %TASK_SERVICE_IMAGE%'
                bat 'docker push %FRONTEND_IMAGE%'
            }
        }

        stage('Docker Compose AWS Config Check') {
            steps {
                echo 'Checking AWS Docker Compose file...'
                bat 'docker compose -f docker-compose.aws.yml config'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully. Images pushed to AWS ECR.'
        }

        failure {
            echo 'Pipeline failed. Check Jenkins console output.'
        }
    }
}