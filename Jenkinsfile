pipeline {
    agent {
        // docker {
        //     image 'node:8.16-onbuild'
        // }
        dockerfile {
            filename './docker-agent/Dockerfile'
        }
    }
    environment {
    //     CI = 'true'
        CHROME_BIN = '/bin/google-chrome'
    }
    stages {
        stage('NPM config') {
            steps {
                sh 'npm install'
                echo 'dependencies installed'
            }
        }
        // stage('scm checkout') {
        //     steps {
        //         git(
        //             url: 'https://github.com/adessoAG/tech-radar.git',
        //             credentialsId: '97893e53-8b02-438f-b91c-a91146a19ebd',
        //             branch: "master"
        //         )
        //     }
        // }

        stage('linting') {
            steps {
                echo 'linting app code'
                sh 'npm run lint'
            }
        }

        stage('build react app') {
            steps {
                // sh 'npm install'
                // echo 'dependencies installed'
                sh 'npm audit fix'
                sh 'npm run build'
                echo 'react app built'
            }
        }

        stage('unit tests') {
            steps {
                echo 'testing app'
                sh 'CI=true npm test'
            }
        }

        stage('e2e tests') {
            steps {
                echo 'e2e testing app'
                // sh 'node_modules/.bin/cypress run'
            }
        }

        stage('build docker') {
            steps {
                sh 'docker build -t react-app:${BUILD_NUMBER} .'
                echo 'docker container built'
            }
        }

        // stage('deploy') {
        //     steps {
        //         sh ''
        //         sh 'docker-compose up'
        //         echo 'app deployed'
        //     }
        // }

        // stage('start app docker') {
        //     steps {
        //         sh 'docker stop react-app'
        //         sh 'docker rm react-app'
        //         sh 'docker run -p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock -d --name=react-app react-app'
        //     }
        // }
    }
    // post {
    //     always {
    //         archiveArtifacts artifacts: 'build/**'
    //     }
    // }
}