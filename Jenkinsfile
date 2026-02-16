pipeline {
    agent {
        docker { image 'cypress/browsers:latest' }
    }
    stages {
        stage('Testes de Backend') {
            steps {
                dir('api'){
                    sh 'npm install'
                    sh 'npx cypress install --force'
                    sh 'npx cypress run'
                }
            }
        }

        stage('Testes no Frontend(Mobile)'){
            dir('mobile'){
                sh 'echo teste'
            }
        }
    }   stage('Testes no Frontend(Web)'){
            dir('web'){
                sh 'echo teste'
            }
        }
}