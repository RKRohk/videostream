pipeline {
  agent any
  stages {
    stage('') {
      steps {
        sh '''docker build -t rkrohk/videostream:${BUILD_NUMBER} .
docker images
'''
      }
    }

  }
}