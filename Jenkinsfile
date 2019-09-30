pipeline {
    agent {
        // docker {
        //     image 'node:8.16-onbuild'
        // }
        dockerfile {
            filename './docker-agent/Dockerfile'
        }
    }
    stages {
        stage('scm checkout') {
            steps {
                git(
                    url: 'https://bitbucket.adesso-group.com/scm/tr/react-techradar-mobile-team.git',
                    credentialsId: 'tech-radar-cred',
                    branch: "master"
                )
            }
        }

        stage('linting') {
            steps {
                sh 'npm lint'
                echo 'linting app code'
            }
        }

        stage('build react app') {
            steps {
                sh 'npm install'
                echo 'dependencies installed'
                sh 'npm audit fix'
                sh 'npm run build'
                echo 'react app built'
            }
        }

        stage('testing') {
            steps {
                echo 'testing app'
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

        stage('start app docker') {
            steps {
<<<<<<< HEAD
                sh 'docker stop react-app'
                sh 'docker rm react-app'
                sh 'docker run -p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock -v /usr/bin/docker:/usr/bin/docker-d --name=react-app react-app'
=======
                // sh 'docker stop react-app'
                // sh 'docker rm react-app'
                sh 'docker run -p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock -d --name=react-app react-app'
>>>>>>> 80cf1a1b41b6c9602b03dd401ef97c1d6b744a21
            }
        }
    }
    // post {
    //     always {
    //         archiveArtifacts artifacts: 'build/**'
    //     }
    // }
}