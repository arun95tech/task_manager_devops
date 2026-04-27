pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'arun95tech'

        USER_SERVICE_IMAGE = "${DOCKERHUB_USERNAME}/user-service:latest"
        TASK_SERVICE_IMAGE = "${DOCKERHUB_USERNAME}/task-service:latest"
        FRONTEND_IMAGE = "${DOCKERHUB_USERNAME}/frontend-service:latest"
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
                echo 'Showing project folder structure...'
                bat 'dir'
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

        stage('Docker Compose Config Check') {
            steps {
                echo 'Checking Docker Compose file...'
                bat 'docker compose config'
            }
        }

        stage('DockerHub Login') {
            steps {
                echo 'Logging in to DockerHub...'

                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKERHUB_USER',
                    passwordVariable: 'DOCKERHUB_PASS'
                )]) {
                    bat 'docker logout'
                    bat 'powershell -Command "$env:DOCKERHUB_PASS | docker login -u $env:DOCKERHUB_USER --password-stdin"'
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                echo 'Pushing User Service image...'
                bat 'docker push %USER_SERVICE_IMAGE%'

                echo 'Pushing Task Service image...'
                bat 'docker push %TASK_SERVICE_IMAGE%'

                echo 'Pushing Frontend image...'
                bat 'docker push %FRONTEND_IMAGE%'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully. Docker images pushed to DockerHub.'
        }

        failure {
            echo 'Pipeline failed. Check Jenkins console output.'
        }
    }
}