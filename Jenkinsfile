pipeline {
  agent any
  stages {
    stage('Docker build') {
      agent any
      steps {
        sh '''docker build -t rkrohk/videostream:${BUILD_NUMBER} .
docker images
'''
      }
    }

  }
}