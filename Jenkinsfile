pipeline {
    agent any

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

        stage('Build User Service Docker Image') {
            steps {
                echo 'Building User Service Docker image...'
                bat 'docker build -f docker/user_service.Dockerfile -t user-service:latest .'
            }
        }

        stage('Build Task Service Docker Image') {
            steps {
                echo 'Building Task Service Docker image...'
                bat 'docker build -f docker/task_service.Dockerfile -t task-service:latest .'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                echo 'Building Frontend Docker image...'
                bat 'docker build -f docker/frontend.Dockerfile -t frontend-service:latest .'
            }
        }

        stage('Docker Compose Check') {
            steps {
                echo 'Checking Docker Compose configuration...'
                bat 'docker compose config'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }

        failure {
            echo 'Pipeline failed. Check the Jenkins console output.'
        }
    }
}