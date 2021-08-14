pipeline {
  agent any
  stages {
    stage('Docker build') {
      agent {
        node {
          label 'docker'
        }

      }
      steps {
        sh '''docker build -t rkrohk/videostream:${BUILD_NUMBER} .
docker images
'''
      }
    }

  }
}