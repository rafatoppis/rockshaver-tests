pipeline {
    agent {
        docker { 
            image 'cypress/browsers:node-22.12.0-chrome-131.0.6778.139-1-ff-133.0.3-edge-131.0.2903.99-1' 
            args '-u root --network rockshaver_skynet'
            }
    }

    stages {

        stage('API') {
            steps {
                dir('api') {
                    sh 'npm install'
                    sh 'npx cypress install --force'
                    sh 'npx cypress run --record --key 9a72b787-e454-4522-be46-728073fb0650'
                }
            }
        }

        stage('Mobile') {
            steps {
                dir('mobile') {
                    sh 'npm install'
                    sh 'npx cypress install --force'
                    sh 'npx cypress run --record --key a6691050-97b6-4650-9b56-fbac8d480bf2'
                }
            }
        }

        stage('Web') {
            steps {
                dir('web') {
                    sh 'npm install'
                    sh 'npx cypress install --force'
                    sh 'npx cypress run --browser chrome --record --key d1373bed-3211-42a1-95bc-98cdde703457'
                }
            }
        }

    }
}
