pipeline {
    agent {
        docker { 
            image 'docker pull cypress/browsers:node-22.12.0-chrome-131.0.6778.139-1-ff-133.0.3-edge-131.0.2903.99-1' 
            args '-u root --network rockshaver_skynet'
            }
    }

    stages {

        stage('API') {
            steps {
                dir('api') {
                    sh 'npm install'
                    sh 'npx cypress install --force'
                    sh 'npx cypress run'
                }
            }
        }

        stage('Mobile') {
            steps {
                dir('mobile') {
                    sh 'npm install'
                    sh 'npx cypress install --force'
                    sh 'npx cypress run'
                }
            }
        }

        stage('Web') {
            steps {
                dir('mobile') {
                    sh 'npm install'
                    sh 'npx cypress install --force'
                    sh 'npx cypress run --browser chrome'
                }
            }
        }

    }
}
