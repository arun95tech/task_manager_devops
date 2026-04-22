pipeline {

    agent any

    environment {
        PROJECT_NAME        = "task_manager"
        DOCKER_COMPOSE_FILE = "docker/docker-compose.yml"
    }

    triggers {
        pollSCM('* * * * *')
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
                echo 'Code checkout complete'
            }
        }

        stage('Build Docker Images') {
            steps {
                bat "docker compose -f %DOCKER_COMPOSE_FILE% build"
                echo 'Docker images built successfully'
            }
        }

        stage('Run Tests') {
            steps {
                bat "docker compose -f %DOCKER_COMPOSE_FILE% run --rm user_service python manage.py test"
                bat "docker compose -f %DOCKER_COMPOSE_FILE% run --rm task_service python manage.py test"
                echo 'All tests passed'
            }
        }

        stage('Deploy') {
            steps {
                bat "docker compose -f %DOCKER_COMPOSE_FILE% down"
                bat "docker compose -f %DOCKER_COMPOSE_FILE% up -d"
                echo 'All services deployed successfully'
            }
        }
    }

    post {
        success {
            echo '✅ PIPELINE SUCCESS — Application is live!'
        }
        failure {
            echo '❌ PIPELINE FAILED — Check logs above!'
        }
        always {
            cleanWs()
        }
    }
}